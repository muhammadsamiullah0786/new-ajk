import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getTokenFromRequest } from '@/lib/auth'
import { updateLeadStatusSchema } from '@/lib/validations'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await getTokenFromRequest(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const lead = await prisma.lead.findUnique({ where: { id: params.id } })
  if (!lead) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(lead)
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await getTokenFromRequest(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const result = updateLeadStatusSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const lead = await prisma.lead.update({
      where: { id: params.id },
      data: { status: result.data.status },
    })

    return NextResponse.json(lead)
  } catch (err: any) {
    if (err?.code === 'P2025') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    console.error('[PATCH /api/admin/leads/[id]]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
