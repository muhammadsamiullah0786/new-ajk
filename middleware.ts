import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, verifyToken } from '@/lib/auth'

export const config = {
  matcher: ['/admin/:path*'],
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Allow the login page through
  if (pathname === '/admin/login') return NextResponse.next()

  const token = req.cookies.get(COOKIE_NAME)?.value
  const payload = token ? await verifyToken(token) : null

  if (!payload) {
    const loginUrl = new URL('/admin/login', req.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}
