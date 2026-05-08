import { NextResponse } from 'next/server'

/**
 * Diagnostic error codes returned to API callers so production failures can be
 * triaged from outside (UI banner, curl, runtime logs) instead of every error
 * collapsing into an opaque "Internal server error" string.
 *
 * The codes intentionally do not leak DB schemas, queries, or secrets — only
 * the *category* of failure.
 */
export type ApiErrorCode =
  | 'DB_NOT_CONFIGURED'   // DATABASE_URL env var not set on this deployment
  | 'DB_UNAVAILABLE'      // DATABASE_URL is set but Prisma cannot connect
  | 'DB_SCHEMA'           // Prisma client schema does not match the database
  | 'CONFIG_ERROR'        // Required non-DB env var is missing
  | 'EMAIL_FAILED'        // Email provider rejected the message
  | 'INTERNAL_ERROR'      // Anything else

interface Classified {
  code: ApiErrorCode
  status: number
  message: string
  /**
   * Underlying Prisma error code (P1000, P1001, P1003, …) when one is
   * available. Returned to the client so paused-DB vs wrong-password vs
   * missing-DB can be distinguished without runtime log access.
   */
  prismaCode?: string
  /**
   * Short, sanitized excerpt of the underlying error message for cases where
   * the regex/code lookup misses. Always truncated and never includes the
   * raw connection string.
   */
  detail?: string
}

/**
 * Pick the most informative line out of a multi-line Prisma error. Prisma
 * wraps the actual reason inside boilerplate like:
 *
 *     Invalid `prisma.adminUser.findUnique()` invocation:
 *
 *     Can't reach database server at `host:port`
 *
 *     Please make sure your database server is running at `host:port`.
 *
 * We want the "Can't reach…" line, not the wrapper. Skip empty lines and
 * lines that are just Prisma framing.
 */
function firstLine(message: string, max = 240): string {
  const lines = message
    .split('\n')
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .filter(s => !/^Invalid .*invocation:?$/i.test(s))
    .filter(s => !/^at\s/i.test(s)) // skip stack frames if any leak in
  const line = lines[0] ?? ''
  return line.length > max ? line.slice(0, max) + '…' : line
}

/**
 * Map Prisma's documented connection-time error codes to a one-liner about
 * what the user needs to do. Source: prisma.io/docs/orm/reference/error-reference
 */
const PRISMA_HINTS: Record<string, string> = {
  P1000: 'Authentication failed. The username/password in DATABASE_URL is wrong - copy a fresh connection string from the database provider and update Vercel.',
  P1001: 'Database server cannot be reached. The host is up at TCP level but Postgres did not respond - the database may be paused, restarting, or the connection string points at an old project ref.',
  P1002: 'Database server timed out. May be paused or under heavy load.',
  P1003: 'Database does not exist at this URL. The connection string is valid but the database name / project reference is wrong.',
  P1010: 'User access denied to this database. Check the role/permissions on the connection string.',
  P1011: 'TLS connection error.',
  P1013: 'DATABASE_URL is malformed.',
  P1017: 'Database server closed the connection. Often means the project was paused mid-handshake or the pooler kicked the connection.',
}

/** Extract a Pxxxx error code from a Prisma error message if present. */
function extractPrismaCode(message: string): string | undefined {
  const m = message.match(/\b(P\d{4})\b/)
  return m?.[1]
}

/**
 * Inspect a thrown error and map it to a stable diagnostic code + safe
 * client-facing message. Prisma errors use distinctive constructor names
 * (`PrismaClientInitializationError`, `PrismaClientKnownRequestError`, etc.).
 */
export function classifyError(err: unknown): Classified {
  const e = err as { name?: string; code?: string; errorCode?: string; message?: string } | null
  const name = e?.name ?? ''
  const message = e?.message ?? ''

  if (name === 'PrismaClientInitializationError' || message.includes("Can't reach database server")) {
    const dbUrl = process.env.DATABASE_URL?.trim() ?? ''
    const directUrl = process.env.DIRECT_URL?.trim() ?? ''

    if (!dbUrl) {
      return {
        code: 'DB_NOT_CONFIGURED',
        status: 503,
        message:
          'DATABASE_URL is not set on this deployment. Add it under Vercel ' +
          '> Settings > Environment Variables (Production scope) and redeploy.',
      }
    }

    if (message.includes('Environment variable not found') && message.includes('DIRECT_URL')) {
      return {
        code: 'DB_NOT_CONFIGURED',
        status: 503,
        message:
          'DIRECT_URL is not set on this deployment. The Prisma schema requires ' +
          'both DATABASE_URL and DIRECT_URL. Add DIRECT_URL in Vercel and redeploy.',
      }
    }

    // DATABASE_URL is set but Prisma cannot reach the host. Surface the host
    // (no credentials) so the operator can see which DB the runtime is trying
    // to dial.
    let hostHint = ''
    try {
      const u = new URL(dbUrl)
      hostHint = ` (runtime is dialing ${u.hostname}:${u.port || '5432'})`
    } catch {
      hostHint = ' (DATABASE_URL is malformed and could not be parsed)'
    }

    // PrismaClientInitializationError exposes the P-code as `errorCode`, not
    // `code`. Some bundlers/Prisma versions strip it; fall back to scanning the
    // message text for "Pxxxx".
    const prismaCode =
      (e?.errorCode as string | undefined) ??
      (e?.code as string | undefined) ??
      extractPrismaCode(message)
    const hint = prismaCode ? PRISMA_HINTS[prismaCode] : undefined

    return {
      code: 'DB_UNAVAILABLE',
      status: 503,
      prismaCode,
      detail: prismaCode ? undefined : firstLine(message),
      message:
        'Database is unreachable.' + hostHint +
        (prismaCode ? ` Prisma reports ${prismaCode}.` : '') +
        (hint ? ' ' + hint : ' Check the database is running, the credentials are correct, and the host is reachable from Vercel.') +
        (directUrl ? '' : ' DIRECT_URL is also empty - set it if your provider needs it.'),
    }
  }

  if (name.startsWith('PrismaClient')) {
    // KnownRequestError, UnknownRequestError, ValidationError, RustPanic, etc.
    // Most often this means missing tables → schema not migrated.
    return {
      code: 'DB_SCHEMA',
      status: 500,
      message: 'Database query failed. Schema may not be migrated (run prisma migrate deploy).',
    }
  }

  if (
    message.includes('ADMIN_JWT_SECRET') ||
    message.includes('RESEND_API_KEY') ||
    message.includes('environment variable is not set')
  ) {
    return {
      code: 'CONFIG_ERROR',
      status: 500,
      message: 'Server configuration error. A required environment variable is missing.',
    }
  }

  if (message.startsWith('Resend send failed')) {
    return {
      code: 'EMAIL_FAILED',
      status: 502,
      message: 'Email delivery failed.',
    }
  }

  return {
    code: 'INTERNAL_ERROR',
    status: 500,
    message: 'Internal server error',
  }
}

/**
 * Build a JSON error response with a diagnostic code and (optionally) the
 * underlying error name for log correlation. Always logs the full error
 * server-side via `console.error` so the original stack stays in runtime logs.
 */
export function errorResponse(routeTag: string, err: unknown): NextResponse {
  const { code, status, message, prismaCode, detail } = classifyError(err)
  const e = err as { name?: string; code?: string; errorCode?: string; message?: string } | null

  console.error(`[${routeTag}]`, {
    code,
    prismaCode,
    name: e?.name,
    rawErrorCode: e?.errorCode,
    rawCode: e?.code,
    message: e?.message,
  })

  return NextResponse.json(
    {
      error: message,
      code,
      ...(prismaCode ? { prismaCode } : {}),
      ...(detail ? { detail } : {}),
    },
    { status },
  )
}
