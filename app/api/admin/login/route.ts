import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { loginSchema } from '@/lib/validations'
import { signToken, buildAuthCookie } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = loginSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
    }

    const { email, password } = result.data
    const admin = await prisma.adminUser.findUnique({ where: { email } })

    // Constant-time comparison even on missing user to prevent timing attacks
    const hash = admin?.passwordHash ?? '$2a$12$invalidhashfortimingprotection000000000000000000000000'
    const valid = await bcrypt.compare(password, hash)

    if (!admin || !valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = await signToken({ id: admin.id, email: admin.email })

    return NextResponse.json(
      { ok: true },
      { status: 200, headers: { 'Set-Cookie': buildAuthCookie(token) } },
    )
  } catch (err) {
    console.error('[POST /api/admin/login]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
