import type { Metadata } from 'next'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import SectionHeader from '@/components/SectionHeader'
import ServiceCard from '@/components/ServiceCard'
import FeatureCard from '@/components/FeatureCard'
import ProcessSteps from '@/components/ProcessSteps'
import Testimonials from '@/components/Testimonials'
import CTASection from '@/components/CTASection'
import FAQ from '@/components/FAQ'
import { services } from '@/data/services'
import { features } from '@/data/features'
import { ArrowRight, ShieldCheck, Zap, BarChart3, Clock, Lock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AJK — Insurance Lead Generation & Performance Marketing',
  description:
    'AJK delivers high-intent insurance leads for advertisers, agencies, aggregators, and buyers. Scalable lead generation, real-time delivery, and campaign optimisation across all key insurance verticals.',
}

export default function HomePage() {
  return (
    <>
      {/* ─── 1. Hero ─── */}
      <HeroSection />

      {/* ─── 2. Why Choose AJK ─── */}
      <section className="section-padding relative" style={{ background: 'rgba(2,12,27,0.90)' }} aria-label="Why choose AJK">
        {/* Top divider */}
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.18), transparent)' }} aria-hidden="true" />
        <div className="section-container">
          <SectionHeader
            badge="Why AJK"
            title="Built for Insurance Advertiser Growth"
            subtitle="We combine vertical expertise, performance campaign management, and reliable lead delivery to help insurance brands and agencies scale acquisition efficiently."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. Services Preview ─── */}
      <section className="section-padding relative" style={{ background: 'rgba(1,8,16,0.85)' }} aria-label="Insurance lead generation services">
        {/* Top divider */}
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.14), transparent)' }} aria-hidden="true" />
        <div className="section-container">
          <SectionHeader
            badge="Our Solutions"
            title="Lead Generation Across Key Insurance Verticals"
            subtitle="From Medicare and Final Expense to ACA, Auto, and Home — we deliver qualified leads and live transfers for every major insurance vertical."
          />
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {services.map((service) => (
              <div key={service.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <ServiceCard service={service} variant="preview" />
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services" className="btn-outline inline-flex items-center gap-2">
              View All Lead Types
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 4. About Preview ─── */}
      <section className="section-padding relative" style={{ background: 'rgba(2,12,27,0.90)' }} aria-label="About AJK">
        {/* Top divider */}
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.14), transparent)' }} aria-hidden="true" />
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Visual panel */}
            <div className="relative order-2 lg:order-1">
              <div className="glow-card p-10 lg:p-12">
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-5 mb-8">
                  {[
                    { value: '1M+',  label: 'Leads Delivered'    },
                    { value: '50+',  label: 'Active Advertisers' },
                    { value: '8',    label: 'Insurance Verticals' },
                    { value: '24 hr', label: 'Campaign Launch'   },
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
                {/* Trust line */}
                <div className="flex items-center gap-3 rounded-2xl p-4" style={{ background: 'rgba(0,204,238,0.04)', border: '1px solid rgba(0,204,238,0.08)' }}>
                  <ShieldCheck size={24} className="text-cyan-400 flex-shrink-0" aria-hidden="true" />
                  <p className="text-slate-300 text-sm leading-relaxed">
                    AJK is a performance-focused insurance lead generation and advertising partner
                    serving buyers, agencies, and aggregators nationwide.
                  </p>
                </div>
              </div>

              {/* Floating badge */}
              <div
                className="absolute -bottom-4 -right-4 px-5 py-3 rounded-2xl text-sm font-bold text-[#010810]"
                style={{ background: 'linear-gradient(135deg, #00CCEE 0%, #0077CC 100%)', boxShadow: '0 0 22px rgba(0,204,238,0.40)' }}
              >
                Performance-Driven
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <span className="badge-cyan mb-5 inline-flex">About AJK</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight mb-5">
                A Lead Generation Partner Built on{' '}
                <span className="text-gradient-cyan">Performance &amp; Results</span>
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-5">
                AJK is a performance-focused insurance lead generation and advertising partner
                — helping insurance buyers, agencies, and growth teams acquire qualified
                prospects at scale.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                We are not an insurance agency or broker. We are a vendor built for advertisers
                — combining vertical knowledge, campaign strategy, and real-time lead delivery
                to drive measurable acquisition results for our partners.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/about" className="btn-primary inline-flex items-center gap-2">
                  Our Story
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link href="/contact" className="btn-outline inline-flex items-center gap-2">
                  Talk to Our Team
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 5. Trust Bar ─── */}
      <section className="relative py-12" style={{ background: 'rgba(1,8,16,0.92)', borderTop: '1px solid rgba(0,204,238,0.07)', borderBottom: '1px solid rgba(0,204,238,0.07)' }} aria-label="Why advertisers trust AJK">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap,       title: 'Real-Time Delivery',      body: 'Leads pushed instantly to your CRM, dialler, or API endpoint.' },
              { icon: BarChart3, title: 'Transparent Reporting',   body: 'Full visibility into campaign performance and lead quality metrics.' },
              { icon: Clock,     title: '24-Hour Campaign Launch',  body: 'From intake to live campaign in as little as one business day.' },
              { icon: Lock,      title: 'Data Security',           body: 'Your lead data is never shared, sold, or used outside your campaign.' },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex flex-col gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,204,238,0.08)', border: '1px solid rgba(0,204,238,0.15)' }}
                >
                  <Icon size={18} className="text-cyan-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{title}</p>
                  <p className="text-slate-500 text-xs leading-relaxed mt-1">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. Process Steps ─── */}
      <ProcessSteps />

      {/* ─── 7. Testimonials ─── */}
      <Testimonials />

      {/* ─── 8. FAQ ─── */}
      <FAQ />

      {/* ─── 9. CTA Banner ─── */}
      <CTASection />
    </>
  )
}
