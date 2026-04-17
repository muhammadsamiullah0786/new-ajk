import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

export async function sendNewLeadNotification(lead: NewLeadEmailData): Promise<void> {
  const to = process.env.SUPPORT_EMAIL
  if (!to) throw new Error('SUPPORT_EMAIL env variable is not set')

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
              View Full Lead in Dashboard →
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

  await resend.emails.send({
    from:    process.env.EMAIL_FROM ?? 'AJK Leads <onboarding@resend.dev>',
    to:      [to],
    subject: `New Lead: ${lead.fullName} — ${lead.leadTypeNeeded}`,
    html,
  })
}
