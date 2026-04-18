import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations'
import { sendContactNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = contactSchema.safeParse(body)

    const ip =
      req.headers.get('x-forwarded-for') ??
      req.headers.get('x-real-ip') ??
      'unknown'

    if (!result.success) {
      console.warn('[POST /api/contact] Validation failed', {
        ip,
        issues: result.error.flatten().fieldErrors,
      })
      return NextResponse.json(
        { error: 'Validation failed', issues: result.error.flatten().fieldErrors },
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

    await sendContactNotification(result.data)

    console.info('[POST /api/contact] Contact email sent', {
      ip,
      email: result.data.email,
      subject: result.data.subject,
      submittedAt,
      durationMs,
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('[POST /api/contact] send failed', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
