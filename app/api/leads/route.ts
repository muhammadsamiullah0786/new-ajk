import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { leadSchema } from '@/lib/validations'
import { sendNewLeadNotification, type NewLeadEmailData } from '@/lib/email'
import { classifyError, errorResponse } from '@/lib/api-errors'

/** Small, safe diagnostic object attached to the response for a failed step. */
type StepWarning = { code: string; prismaCode?: string; detail?: string; message: string }

function toWarning(err: unknown): StepWarning {
  const { code, prismaCode, detail, message } = classifyError(err)
  return { code, prismaCode, detail, message }
}

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

    const data = { ...result.data, sourcePage: result.data.sourcePage ?? 'apply' }

    // 1. Persist the lead — BEST EFFORT. The database is deliberately NOT on the
    //    critical path for delivery: a lead must still reach the support inbox
    //    even when the DB is unconfigured or unreachable, exactly like the
    //    contact form (which is email-only). A DB failure is therefore captured
    //    as a warning and the request continues to the email step, instead of
    //    aborting before any notification is sent.
    let lead: NewLeadEmailData
    let dbError: unknown = null
    try {
      lead = await prisma.lead.create({ data })
    } catch (err) {
      dbError = err
      const e = err as { name?: string; message?: string } | null
      console.error('[POST /api/leads] DB save failed — falling back to email-only delivery:', {
        ...toWarning(err),
        name: e?.name,
        message: e?.message,
      })
      // Build the email payload straight from the validated input so the
      // notification can still be sent. Empty id signals "not persisted" to the
      // email template (no dashboard link, prominent warning).
      lead = { id: '', ...data }
    }

    // 2. Send the notification email. This is now the primary delivery path.
    let emailError: unknown = null
    try {
      const emailId = await sendNewLeadNotification(lead)
      console.info('[POST /api/leads] Email notification sent', {
        emailId,
        leadId: lead.id || '(not saved to DB)',
        savedToDb: !dbError,
      })
    } catch (err) {
      emailError = err
      const e = err as { name?: string; message?: string } | null
      console.error('[POST /api/leads] Email notification failed:', {
        leadId: lead.id || '(not saved to DB)',
        savedToDb: !dbError,
        ...toWarning(err),
        name: e?.name,
        message: e?.message,
      })
    }

    // 3. Decide the response.
    //    - Both the DB save AND the email failed → nothing captured the lead, so
    //      return a hard error (surfacing the email failure, the primary path)
    //      and the visitor is told to try again.
    //    - Otherwise the lead was persisted, emailed, or both → success, with a
    //      diagnostic warning for whichever step (if any) failed so operators
    //      can see a degraded state without digging through logs.
    if (dbError && emailError) {
      return errorResponse('POST /api/leads', emailError)
    }

    return NextResponse.json(
      {
        id: lead.id || undefined,
        delivered: { database: !dbError, email: !emailError },
        ...(dbError ? { dbWarning: toWarning(dbError) } : {}),
        ...(emailError ? { emailWarning: toWarning(emailError) } : {}),
      },
      { status: 201 },
    )
  } catch (err) {
    return errorResponse('POST /api/leads', err)
  }
}
