import { Resend } from 'resend'

interface ResendErrorLike {
  message?: string
  name?: string
  statusCode?: number
}

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? ''
const EMAIL_FROM = process.env.EMAIL_FROM?.trim() || 'onboarding@resend.dev'
const SUPPORT_EMAIL_ENV = process.env.SUPPORT_EMAIL?.trim()
const SUPPORT_EMAIL_DEFAULT = 'support@ajk-insurance.com'
const SUPPORT_EMAIL = SUPPORT_EMAIL_DEFAULT

if (!RESEND_API_KEY) {
  console.warn('[email] RESEND_API_KEY is not set. Resend email delivery will fail.')
}
if (!EMAIL_FROM || !EMAIL_FROM.includes('@')) {
  console.error('[email] EMAIL_FROM is invalid or not set. Using default.')
}
if (!SUPPORT_EMAIL_ENV) {
  console.warn(`[email] SUPPORT_EMAIL is not set. Using enforced recipient ${SUPPORT_EMAIL_DEFAULT}.`)
} else if (SUPPORT_EMAIL_ENV.toLowerCase() !== SUPPORT_EMAIL_DEFAULT) {
  console.warn(
    `[email] SUPPORT_EMAIL is set to ${SUPPORT_EMAIL_ENV}, but email delivery is enforced to ${SUPPORT_EMAIL_DEFAULT}.`,
  )
}

const resend = new Resend(RESEND_API_KEY)

async function sendEmailOrThrow(payload: Parameters<typeof resend.emails.send>[0]): Promise<string> {
  const { data, error } = await resend.emails.send(payload)

  if (error) {
    const resendError = error as ResendErrorLike
    const details = [
      resendError.statusCode ? `status ${resendError.statusCode}` : null,
      resendError.name ?? null,
      resendError.message ?? null,
    ]
      .filter(Boolean)
      .join(' - ')

    throw new Error(`Resend send failed${details ? `: ${details}` : ''}`)
  }

  if (!data?.id) {
    throw new Error('Resend send failed: missing email id in success response')
  }

  return data.id
}

export interface NewLeadEmailData {
  id: string
  fullName: string
  companyName: string
  workEmail: string
  phoneNumber: string
  businessType?: string | null
  leadTypeNeeded: string
  targetGeography?: string | null
  monthlyVolumeNeeded?: string | null
  budgetRange?: string | null
  notesOrCampaignGoals?: string | null
  sourcePage: string
}

export async function sendNewLeadNotification(lead: NewLeadEmailData): Promise<string> {
  const to = SUPPORT_EMAIL

  const rows = [
    ['Full Name',             lead.fullName],
    ['Company Name',          lead.companyName],
    ['Work Email',            lead.workEmail],
    ['Phone Number',          lead.phoneNumber],
    lead.businessType         ? ['Business Type',          lead.businessType]         : null,
    ['Lead Type Needed',      lead.leadTypeNeeded],
    lead.targetGeography      ? ['Target Geography',       lead.targetGeography]      : null,
    lead.monthlyVolumeNeeded  ? ['Monthly Volume Needed',  lead.monthlyVolumeNeeded]  : null,
    lead.budgetRange          ? ['Budget Range',           lead.budgetRange]          : null,
    lead.notesOrCampaignGoals ? ['Notes / Campaign Goals', lead.notesOrCampaignGoals] : null,
    ['Source Page',           lead.sourcePage],
    ['Lead ID',               lead.id],
  ].filter(Boolean) as [string, string][]

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;font-weight:600;color:#94a3b8;white-space:nowrap;vertical-align:top;font-size:13px;">${label}</td>
        <td style="padding:8px 12px;color:#e2e8f0;font-size:13px;">${value}</td>
      </tr>`,
    )
    .join('')

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#020c1b;border:1px solid rgba(0,204,238,0.2);border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">
            <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#00ccee;">AJK Lead Generation</p>
            <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;">New Lead Submission</h1>
            <p style="margin:8px 0 0;font-size:13px;color:#64748b;">A new inquiry has been submitted and saved to the database.</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#0d1829;border-left:1px solid rgba(0,204,238,0.2);border-right:1px solid rgba(0,204,238,0.2);padding:0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${tableRows}
            </table>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="background:#020c1b;border:1px solid rgba(0,204,238,0.2);border-top:none;border-radius:0 0 12px 12px;padding:24px 32px;text-align:center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/admin/leads/${lead.id}"
               style="display:inline-block;background:#00ccee;color:#020c1b;font-weight:700;font-size:14px;padding:12px 28px;border-radius:8px;text-decoration:none;">
              View Full Lead in Dashboard â†’
            </a>
            <p style="margin:16px 0 0;font-size:11px;color:#334155;">
              This is an automated notification. Do not reply to this email.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

  console.info('[email] Sending new lead notification', { to, from: EMAIL_FROM, leadId: lead.id })
  try {
    const emailId = await sendEmailOrThrow({
      from: EMAIL_FROM,
      to: [to],
      subject: `New Lead: ${lead.fullName} â€” ${lead.leadTypeNeeded}`,
      html,
    })
    console.info('[email] New lead notification sent', { to, from: EMAIL_FROM, leadId: lead.id, emailId })
    return emailId
  } catch (error) {
    console.error('[email] Failed to send new lead notification', {
      error: error instanceof Error ? { message: error.message, stack: error.stack } : error,
      to,
      from: EMAIL_FROM,
      leadId: lead.id,
    })
    throw error
  }
}

export interface ContactEmailData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  honeypot?: string
  formStartAt?: string
  submittedAt?: string
}

export async function sendContactNotification(contact: ContactEmailData): Promise<string> {
  const to = SUPPORT_EMAIL

  const submittedAt = contact.submittedAt ? new Date(contact.submittedAt) : new Date()
  const submittedAtText = `${submittedAt.toLocaleString('en-US', { timeZone: 'UTC', hour12: true })} UTC`

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:#020c1b;border:1px solid rgba(0,204,238,0.2);border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">
            <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#00ccee;">AJK Admin Notification</p>
            <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;">New Contact Form Submission</h1>
            <p style="margin:10px 0 0;font-size:14px;color:#94a3b8;line-height:1.65;">A new inquiry arrived through the website contact form. The visitor's email is set as the reply-to address so you can respond directly.</p>
          </td>
        </tr>
        <tr>
          <td style="background:#0d1829;border-left:1px solid rgba(0,204,238,0.2);border-right:1px solid rgba(0,204,238,0.2);padding:0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:14px 18px;font-weight:700;color:#94a3b8;white-space:nowrap;vertical-align:top;font-size:13px;">Name</td>
                <td style="padding:14px 18px;color:#e2e8f0;font-size:13px;">${contact.name}</td>
              </tr>
              <tr>
                <td style="padding:14px 18px;font-weight:700;color:#94a3b8;white-space:nowrap;vertical-align:top;font-size:13px;">Email</td>
                <td style="padding:14px 18px;color:#e2e8f0;font-size:13px;"><a href="mailto:${contact.email}" style="color:#cffafe;text-decoration:none;">${contact.email}</a></td>
              </tr>
              ${contact.phone ? `
              <tr>
                <td style="padding:14px 18px;font-weight:700;color:#94a3b8;white-space:nowrap;vertical-align:top;font-size:13px;">Phone</td>
                <td style="padding:14px 18px;color:#e2e8f0;font-size:13px;">${contact.phone}</td>
              </tr>` : ''}
              <tr>
                <td style="padding:14px 18px;font-weight:700;color:#94a3b8;white-space:nowrap;vertical-align:top;font-size:13px;">Subject</td>
                <td style="padding:14px 18px;color:#e2e8f0;font-size:13px;">${contact.subject}</td>
              </tr>
              <tr>
                <td style="padding:14px 18px;font-weight:700;color:#94a3b8;white-space:nowrap;vertical-align:top;font-size:13px;">Message</td>
                <td style="padding:14px 18px;color:#e2e8f0;font-size:13px;line-height:1.6;">${contact.message.replace(/\n/g, '<br/>')}</td>
              </tr>
              <tr>
                <td style="padding:14px 18px;font-weight:700;color:#94a3b8;white-space:nowrap;vertical-align:top;font-size:13px;">Submitted</td>
                <td style="padding:14px 18px;color:#e2e8f0;font-size:13px;">${submittedAtText}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#020c1b;border:1px solid rgba(0,204,238,0.2);border-top:none;border-radius:0 0 12px 12px;padding:24px 32px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.5;">Reply-to is set to the visitor email. Reply directly from your inbox for the fastest response.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  console.info('[email] Sending contact notification', { to, from: EMAIL_FROM, replyTo: contact.email })
  try {
    const emailId = await sendEmailOrThrow({
      from: EMAIL_FROM,
      to: [to],
      replyTo: contact.email,
      subject: `Contact Form Message: ${contact.subject}`,
      html,
    })
    console.info('[email] Contact notification sent', { to, from: EMAIL_FROM, replyTo: contact.email, emailId })
    return emailId
  } catch (error) {
    console.error('[email] Failed to send contact notification', {
      error: error instanceof Error ? { message: error.message, stack: error.stack } : error,
      to,
      from: EMAIL_FROM,
      replyTo: contact.email,
    })
    throw error
  }
}
