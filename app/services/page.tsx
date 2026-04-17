import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Heart, Activity, ShieldCheck, FileText, Plane, Car, Home, Briefcase, HardHat } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import ServiceCard from '@/components/ServiceCard'
import CTASection from '@/components/CTASection'
import { services } from '@/data/services'
import { ElementType } from 'react'

// Icon registry for the service category nav (server-side only, never passed as prop)
const SERVICE_ICON_MAP: Record<string, ElementType> = {
  Heart, Activity, ShieldCheck, FileText, Plane, Car, Home, Briefcase, HardHat,
}

export const metadata: Metadata = {
  title: 'Insurance Lead Generation Solutions',
  description:
    'AJK delivers high-intent insurance leads across Medicare, Final Expense, ACA, Auto, Home, Business, Workers\u2019 Comp, and Live Transfers. Scalable campaigns for advertisers, agencies, and aggregators.',
}

export default function ServicesPage() {
  return (
    <>
      {/* ── Page Header ── */}
      <section className="relative pt-36 pb-20 overflow-hidden" style={{ background: 'rgba(2,12,27,0.85)' }} aria-labelledby="services-heading">
        {/* Top divider */}
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.18), transparent)' }} aria-hidden="true" />
        {/* Radial glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,204,238,0.07) 0%, transparent 70%)' }} aria-hidden="true" />
        <div className="section-container relative z-10">
          <div className="max-w-2xl">
            <span className="badge-cyan mb-5 inline-flex">Lead Generation Solutions</span>
            <h1
              id="services-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-5"
            >
              High-Intent Leads for{' '}
              <span className="text-gradient-cyan">Every Vertical</span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8">
              AJK generates and delivers qualified insurance leads across all major verticals —
              with real-time delivery, flexible exclusivity options, and campaign optimisation
              built for advertisers, agencies, and aggregators.
            </p>
            <Link href="/apply" className="btn-primary inline-flex items-center gap-2">
              Request Lead Pricing
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Service Categories nav ── */}
      <nav
        className="sticky top-14 z-30 backdrop-blur-xl border-b"
        style={{ background: 'rgba(2,12,27,0.94)', borderColor: 'rgba(0,204,238,0.08)' }}
        aria-label="Jump to vertical section"
      >
        <div className="section-container">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            {services.map((s) => {
              const Icon = SERVICE_ICON_MAP[s.iconKey]
              return (
                <a
                  key={s.id}
                  href={`#${s.slug}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200 whitespace-nowrap"
                >
                  <Icon size={15} className="flex-shrink-0" aria-hidden="true" />
                  {s.title}
                </a>
              )
            })}
          </div>
        </div>
      </nav>

      {/* ── Services List ── */}
      <section className="section-padding relative" style={{ background: 'rgba(2,12,27,0.90)' }} aria-label="All lead generation verticals">
        {/* Top divider */}
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.14), transparent)' }} aria-hidden="true" />
        <div className="section-container">
          <SectionHeader
            badge="Our Verticals"
            title="Qualified Leads Across All Major Insurance Lines"
            subtitle="Every vertical we operate in comes with dedicated targeting, quality controls, and scalable delivery — built for advertiser performance."
          />

          {/* Full-detail cards */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-7">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} variant="full" />
            ))}
          </div>

        </div>
      </section>

      {/* ── Compare / Custom ── */}
      <section className="section-padding relative" style={{ background: 'rgba(1,8,16,0.88)' }} aria-label="Ready to launch a campaign">
        {/* Top divider */}
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.12), transparent)' }} aria-hidden="true" />
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              badge="Let's Get Started"
              title="Ready to Launch Your Lead Campaign?"
              subtitle="Tell us your vertical, geography, volume goals, and delivery preferences. Our team can have your campaign live in as little as 24 hours."
            />
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/apply" className="btn-primary inline-flex items-center gap-2">
                Request Lead Pricing
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn-outline inline-flex items-center gap-2">
                Talk to Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTASection
        title="Scale Your Insurance Customer Acquisition"
        subtitle="Reach out to our team to discuss lead supply, campaign setup, targeting options, and delivery for your insurance vertical."
      />
    </>
  )
}
