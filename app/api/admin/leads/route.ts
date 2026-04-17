import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getTokenFromRequest } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const admin = await getTokenFromRequest(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = new URL(req.url)
    const statusFilter = searchParams.get('status')

    const leads = await prisma.lead.findMany({
      where: statusFilter ? { status: statusFilter as any } : undefined,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        fullName: true,
        companyName: true,
        workEmail: true,
        phoneNumber: true,
        leadTypeNeeded: true,
        businessType: true,
        status: true,
        sourcePage: true,
        createdAt: true,
      },
    })

    return NextResponse.json(leads)
  } catch (err) {
    console.error('[GET /api/admin/leads]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
