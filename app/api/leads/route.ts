import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { leadSchema } from '@/lib/validations'
import { sendNewLeadNotification } from '@/lib/email'
import { classifyError, errorResponse } from '@/lib/api-errors'

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

    // 2. Send notification email — failure does NOT affect the success
    // status (the lead is already in the database), but the response carries
    // an `emailWarning` field with the same diagnostic classification used
    // elsewhere so callers and operators can see when notifications stop
    // working without having to dig through runtime logs.
    let emailWarning: { code: string; prismaCode?: string; detail?: string; message: string } | undefined
    try {
      const emailId = await sendNewLeadNotification(lead)
      console.info('[POST /api/leads] Email notification sent', {
        emailId,
        leadId: lead.id,
        supportEmail: process.env.SUPPORT_EMAIL,
      })
    } catch (emailErr) {
      const classified = classifyError(emailErr)
      const e = emailErr as { name?: string; message?: string } | null
      console.error('[POST /api/leads] Email notification failed (lead saved):', {
        leadId: lead.id,
        supportEmail: process.env.SUPPORT_EMAIL ?? 'support@ajk-insurance.com',
        code: classified.code,
        name: e?.name,
        message: e?.message,
      })
      emailWarning = {
        code: classified.code,
        prismaCode: classified.prismaCode,
        detail: classified.detail,
        message: classified.message,
      }
    }

    return NextResponse.json(
      { id: lead.id, ...(emailWarning ? { emailWarning } : {}) },
      { status: 201 },
    )
  } catch (err) {
    return errorResponse('POST /api/leads', err)
  }
}
