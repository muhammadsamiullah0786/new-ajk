import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { leadSchema } from '@/lib/validations'
import { sendNewLeadNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = leadSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: result.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    // 1. Save lead to database first — always
    const lead = await prisma.lead.create({
      data: {
        ...result.data,
        sourcePage: result.data.sourcePage ?? 'apply',
      },
    })

    // 2. Send notification email — failure does NOT affect the response
    try {
      const emailId = await sendNewLeadNotification(lead)
      console.info('[POST /api/leads] Email notification sent', {
        emailId,
        leadId: lead.id,
        supportEmail: process.env.SUPPORT_EMAIL,
      })
    } catch (emailErr) {
      console.error('[POST /api/leads] Email notification failed (lead saved):', {
        error: emailErr,
        leadId: lead.id,
        supportEmail: process.env.SUPPORT_EMAIL ?? 'support@ajk-insurance.com',
      })
    }

    return NextResponse.json({ id: lead.id }, { status: 201 })
  } catch (err) {
    console.error('[POST /api/leads]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
