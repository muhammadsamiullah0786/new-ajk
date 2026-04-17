import type { Metadata } from 'next'
import { ClockIcon, ShieldCheck, PhoneCall, CheckCircle2 } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import QuoteForm from '@/components/QuoteForm'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'Request Lead Pricing',
  description:
    'Launch your insurance lead generation campaign with AJK. Tell us your vertical, volume goals, and delivery preferences and we will get back to you within 24 hours.',
}

const WHAT_HAPPENS = [
  {
    icon: ClockIcon,
    title: 'Within 24 Hours',
    text: 'An AJK campaign specialist contacts you to discuss your lead generation goals and pricing options.',
  },
  {
    icon: ShieldCheck,
    title: 'Campaign Review',
    text: 'We assess your vertical, targeting needs, volume, and delivery preferences to build a custom proposal.',
  },
  {
    icon: PhoneCall,
    title: 'Campaign Launch',
    text: 'Once aligned, we can have your campaign live within 24 to 48 hours with full delivery and reporting set up.',
  },
]

const TRUST_POINTS = [
  'Campaigns live in as little as 24 hours',
  'Exclusive and shared lead options available',
  'Real-time delivery to your CRM or dialler',
  'Your data is secure and never shared',
]

export default function ApplyPage() {
  return (
    <>
      {/* ── Page Header ── */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: 'rgba(2,12,27,0.85)' }}
        aria-labelledby="apply-heading"
      >
        {/* Top divider */}
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.18), transparent)' }} aria-hidden="true" />
        {/* Radial glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,204,238,0.06) 0%, transparent 70%)' }} aria-hidden="true" />
        <div className="section-container relative z-10">
          <div className="max-w-xl">
            <span className="badge-cyan mb-5 inline-flex">Free Consultation — No Commitment</span>
            <h1
              id="apply-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-5"
            >
              Launch Your{' '}
              <span className="text-gradient-cyan">Lead Campaign</span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              Fill in the form below and an AJK campaign specialist will reach out within 24 hours
              to discuss your vertical, volume goals, and pricing.
            </p>
          </div>
        </div>
      </section>

      {/* ── Form + Side Content ── */}
      <section className="section-padding relative" style={{ background: 'rgba(2,12,27,0.90)' }} aria-label="Campaign inquiry form">
        {/* Top divider */}
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.14), transparent)' }} aria-hidden="true" />
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Form — 3 columns */}
            <div className="lg:col-span-3">
              <div className="glow-card premium-border p-8 sm:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white">Campaign Inquiry Form</h2>
                  <p className="text-slate-400 text-sm mt-1.5">
                    All fields marked <span className="text-cyan-400 font-semibold">*</span> are required.
                  </p>
                </div>
                <QuoteForm />
              </div>
            </div>

            {/* Side content — 2 columns */}
            <div className="lg:col-span-2 space-y-7">

              {/* What happens next */}
              <div className="glow-card p-6">
                <h3 className="text-lg font-bold text-white mb-6">
                  What Happens After You Submit?
                </h3>
                <div className="space-y-5">
                  {WHAT_HAPPENS.map(({ icon: Icon, title, text }) => (
                    <div key={title} className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(0,204,238,0.10)', border: '1px solid rgba(0,204,238,0.18)' }}
                      >
                        <Icon size={18} className="text-cyan-400" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm mb-1">{title}</div>
                        <div className="text-slate-400 text-xs leading-relaxed">{text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust points */}
              <div className="glow-card p-6">
                <h3 className="text-base font-bold text-white mb-4">
                  Why Advertisers Choose AJK
                </h3>
                <ul className="space-y-2.5">
                  {TRUST_POINTS.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 size={15} className="text-cyan-400 flex-shrink-0" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact alternative */}
              <div
                className="rounded-2xl p-6"
                style={{ background: 'rgba(0,204,238,0.06)', border: '1px solid rgba(0,204,238,0.14)' }}
              >
                <h3 className="text-white font-bold text-base mb-2">Prefer to Call?</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Speak directly with a campaign specialist right now.
                </p>
                <a
                  href="tel:+18456628071"
                  className="btn-primary text-sm !px-5 !py-2.5 inline-flex"
                >
                  +1 (845) 662-8071
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTASection
        title="Questions Before You Launch?"
        subtitle="Reach out to our team. We are happy to answer any questions about lead types, campaign setup, or delivery before you submit."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="View Lead Types"
        secondaryHref="/services"
        showPhone
      />
    </>
  )
}
