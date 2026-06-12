import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Users, Target, HeartHandshake, Award, CheckCircle2 } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import CTASection from '@/components/CTASection'
import { features } from '@/data/features'
import FeatureCard from '@/components/FeatureCard'
import AboutHeroSection from '@/components/AboutHeroSection'

export const metadata: Metadata = {
  title: 'About AJK',
  description:
    'AJK is a performance-focused insurance lead generation and advertising partner. We help insurance buyers, agencies, aggregators, and growth teams acquire qualified prospects at scale.',
}

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Performance',
    description: 'Every campaign we run is measured against real outcomes — CPL, contact rate, conversion, and quality. Performance is not a promise; it is how we operate.',
  },
  {
    icon: Users,
    title: 'Partner-First',
    description: 'Our success is measured by your results. We align our incentives with your acquisition goals and work as an extension of your growth team.',
  },
  {
    icon: Target,
    title: 'Precision Targeting',
    description: 'We apply advanced geo, demographic, and intent-based targeting to ensure every lead we deliver matches your campaign criteria and buyer profile.',
  },
  {
    icon: HeartHandshake,
    title: 'Long-Term Partnership',
    description: 'We build lasting advertiser relationships. Our team supports your campaigns from launch through continuous optimisation, scaling what works.',
  },
]

const WHY_AJK = [
  'Performance-driven lead generation across 8+ insurance verticals',
  'Real-time lead delivery via API, CRM, or secure portal',
  'Exclusive and shared lead options to match your model',
  'Campaign launch in as little as 24 hours',
  'Transparent CPL, CPA, and quality reporting',
  'Dedicated support for agencies, buyers, and aggregators',
]

export default function AboutPage() {
  return (
    <>
      {/* ── Premium About Hero (globe + content) ── */}
      <AboutHeroSection />

      {/* ── Our Story ── */}
      <section className="section-padding relative" style={{ background: 'rgba(2,12,27,0.90)' }} aria-label="Our story">
        {/* Top divider */}
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.18), transparent)' }} aria-hidden="true" />
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Stats / visual */}
            <div className="glow-card p-8 lg:p-12">
              <div className="grid grid-cols-2 gap-5 mb-8">
                {[
                  { value: '1M+',  label: 'Leads Delivered'    },
                  { value: '50+',  label: 'Active Advertisers' },
                  { value: '8',    label: 'Verticals Covered'  },
                  { value: '100%', label: 'Performance Focus'  },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="rounded-2xl p-5 text-center"
                    style={{ background: 'rgba(0,204,238,0.05)', border: '1px solid rgba(0,204,238,0.10)' }}
                  >
                    <div className="text-gradient-cyan font-black text-2xl sm:text-3xl">{value}</div>
                    <div className="text-slate-400 text-xs mt-1">{label}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-3 rounded-2xl p-5" style={{ background: 'rgba(0,204,238,0.05)', border: '1px solid rgba(0,204,238,0.10)' }}>
                <Award size={22} className="text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-slate-300 text-sm leading-relaxed">
                  AJK is a B2B insurance lead generation and advertising vendor.
                  We serve advertisers, not consumers.
                </p>
              </div>
            </div>

            {/* Text */}
            <div>
              <SectionHeader
                badge="Our Story"
                title="Built Around a Simple Belief"
                subtitle="Insurance advertisers deserve a real performance partner, not just a lead vendor."
                centered={false}
              />
              <div className="mt-6 space-y-4 text-slate-400 text-sm leading-relaxed">
                <p>
                  AJK was founded on one core conviction: that insurance advertisers, agencies,
                  and buyers deserve a lead generation partner that is genuinely invested in their
                  results — not just their spend.
                </p>
                <p>
                  Too many advertisers waste budget on low-intent leads and opaque vendors. We
                  built AJK to operate differently — with transparent reporting, quality-focused
                  delivery, and a team that treats every campaign as a long-term growth partnership.
                </p>
                <p>
                  From Medicare and Final Expense to ACA, Auto, and Commercial lines, we cover
                  the verticals that matter most to insurance growth teams. Our approach combines
                  demand generation expertise, compliance-conscious sourcing, and continuous
                  optimisation to maximise your campaign ROI.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/apply" className="btn-primary inline-flex items-center gap-2">
                  Request Lead Pricing
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Mission & Values ── */}
      <section className="section-padding relative" style={{ background: 'rgba(1,8,16,0.88)' }} aria-label="Our mission and values">
        {/* Top divider */}
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.14), transparent)' }} aria-hidden="true" />
        <div className="section-container">
          <SectionHeader
            badge="Our Values"
            title="The Principles That Guide Every Campaign"
            subtitle="Every lead we deliver, every campaign we launch, and every partnership we build is guided by values we hold ourselves to from day one."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => {
              const Icon = v.icon
              return (
                <div
                  key={v.title}
                  className="glow-card p-6 text-center group hover:-translate-y-1 transition-transform duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-400/30"
                    style={{ background: 'rgba(0,204,238,0.10)', border: '1px solid rgba(0,204,238,0.18)' }}
                  >
                    <Icon size={22} className="text-cyan-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{v.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{v.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Why Clients Choose AJK ── */}
      <section className="section-padding relative" style={{ background: 'rgba(2,12,27,0.90)' }} aria-label="Why clients choose AJK">
        {/* Top divider */}
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.14), transparent)' }} aria-hidden="true" />
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionHeader
                badge="Why AJK"
                title="What Sets Us Apart as a Lead Gen Partner"
                centered={false}
              />
              <ul className="mt-8 space-y-3.5">
                {WHY_AJK.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-slate-300 text-sm">
                    <CheckCircle2 size={18} className="text-cyan-400 flex-shrink-0" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link href="/contact" className="btn-outline inline-flex items-center gap-2">
                  Talk to Our Team
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.slice(0, 4).map((f) => (
                <FeatureCard key={f.id} feature={f} variant="card" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTASection
        title="Ready to Scale Your Insurance Lead Campaigns?"
        subtitle="Talk to our team about your vertical, volume goals, and delivery preferences. We can launch your campaign in as little as 24 hours."
        primaryLabel="Request Lead Pricing"
        secondaryLabel="Contact Us"
      />
    </>
  )
}
