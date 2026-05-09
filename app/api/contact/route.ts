import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations'
import { sendContactNotification } from '@/lib/email'
import { errorResponse } from '@/lib/api-errors'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = contactSchema.safeParse(body)

    const ip =
      req.headers.get('x-forwarded-for') ??
      req.headers.get('x-real-ip') ??
      'unknown'

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      // Build a single human-readable summary so the top-level `error` field
      // is actionable on its own (the `issues` map is also returned for the
      // frontend to attach inline messages to specific inputs).
      const summary = Object.entries(fieldErrors)
        .map(([field, msgs]) => msgs?.[0] ?? `${field} is invalid`)
        .filter(Boolean)
        .join('; ')
      console.warn('[POST /api/contact] Validation failed', { ip, issues: fieldErrors })
      return NextResponse.json(
        {
          error: summary || 'Validation failed. Please check the form fields and try again.',
          issues: fieldErrors,
        },
        { status: 400 },
      )
    }

    const { honeypot, formStartAt, submittedAt } = result.data
    if (honeypot?.trim()) {
      console.warn('[POST /api/contact] Bot detected via honeypot', { ip })
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
    }

    let durationMs: number | undefined
    if (formStartAt) {
      const start = Date.parse(formStartAt)
      if (!Number.isNaN(start)) {
        durationMs = Date.now() - start
        if (durationMs < 650) {
          console.warn('[POST /api/contact] Bot detected via fast submission', {
            ip,
            durationMs,
          })
          return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
        }
      }
    }

    try {
      await sendContactNotification(result.data)
    } catch (emailErr) {
      // Surface the actual Resend / config error to the caller via the same
      // diagnostic classifier the outer catch uses, instead of collapsing every
      // email failure into a generic message.
      return errorResponse('POST /api/contact email', emailErr)
    }

    console.info('[POST /api/contact] Contact email sent', {
      ip,
      email: result.data.email,
      subject: result.data.subject,
      submittedAt,
      durationMs,
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    return errorResponse('POST /api/contact', err)
  }
}
