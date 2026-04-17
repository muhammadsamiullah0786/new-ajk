import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import { type NextRequest } from 'next/server'

export const COOKIE_NAME = 'admin_token'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET
  if (!secret) throw new Error('ADMIN_JWT_SECRET env variable is not set')
  return new TextEncoder().encode(secret)
}

export interface AdminPayload extends JWTPayload {
  sub: string
  email: string
}

export async function signToken(payload: { id: string; email: string }): Promise<string> {
  return new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.id)
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret())
}

export async function verifyToken(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return payload as AdminPayload
  } catch {
    return null
  }
}

export function buildAuthCookie(token: string): string {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  return `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`
}

export function buildClearCookie(): string {
  return `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`
}

export async function getTokenFromRequest(req: NextRequest): Promise<AdminPayload | null> {
  const token = req.cookies.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyToken(token)
}
