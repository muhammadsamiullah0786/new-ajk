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
}

/**
 * Inspect a thrown error and map it to a stable diagnostic code + safe
 * client-facing message. Prisma errors use distinctive constructor names
 * (`PrismaClientInitializationError`, `PrismaClientKnownRequestError`, etc.).
 */
export function classifyError(err: unknown): Classified {
  const e = err as { name?: string; code?: string; message?: string } | null
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

    return {
      code: 'DB_UNAVAILABLE',
      status: 503,
      message:
        'Database is unreachable.' + hostHint + ' Check the database is running, ' +
        'the credentials are correct, and the host is reachable from Vercel. ' +
        (directUrl ? '' : 'DIRECT_URL is also empty - set it if your provider needs it.'),
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
  const { code, status, message } = classifyError(err)
  const e = err as { name?: string; code?: string; message?: string } | null

  console.error(`[${routeTag}]`, {
    code,
    name: e?.name,
    prismaCode: e?.code,
    message: e?.message,
  })

  return NextResponse.json(
    {
      error: message,
      code,
    },
    { status },
  )
}
