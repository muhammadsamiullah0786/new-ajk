'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ShieldCheck, Star, Users } from 'lucide-react'

const GlobeThree = dynamic(() => import('@/components/GlobeThree'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border border-cyan-500/20 animate-pulse" />
    </div>
  ),
})

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
}

const fadeRight = {
  hidden:  { opacity: 0, x: 40 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.80, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TRUST = [
  { icon: ShieldCheck, text: 'Performance-focused insurance lead generation partner'    },
  { icon: Users,       text: 'Serving agencies, buyers, aggregators, and advertisers'    },
  { icon: Star,        text: 'Transparent reporting, real-time delivery, CPL optimisation' },
]

const STATS = [
  { value: '1M+',  label: 'Leads Delivered'    },
  { value: '50+',  label: 'Active Advertisers'  },
  { value: '8',    label: 'Insurance Verticals' },
  { value: '24 hr', label: 'Campaign Launch'    },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function AboutHeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#04091C] pt-28 pb-20 lg:pt-32 lg:pb-28"
      aria-labelledby="about-heading"
    >
      {/* Top rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" aria-hidden="true" />

      {/* Ambient glows */}
      <div className="absolute -top-32 -left-48 w-[560px] h-[560px] rounded-full bg-blue-600/5 blur-[110px] pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-24 -right-32 w-[420px] h-[420px] rounded-full bg-cyan-500/4 blur-[90px] pointer-events-none" aria-hidden="true" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(100,160,255,0.6) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: text ─────────────────────────────────────────────────── */}
          <div className="flex flex-col">

            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <span className="inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cyan-400 border border-cyan-500/25 bg-cyan-500/8 px-4 py-1.5 rounded-full mb-6">
                About AJK
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              id="about-heading"
              custom={0.08}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-[3.2rem] font-black text-white leading-[1.1] tracking-tight mb-5"
            >
              Insurance Lead Generation{' '}
              <span className="text-gradient-cyan">&amp; Advertising</span>
              <br />Partner for Growth Teams
            </motion.h1>

            {/* Body copy */}
            <motion.p
              custom={0.16}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-[0.875rem] leading-[1.8] text-slate-400 mb-7 max-w-[420px]"
            >
              AJK is a performance-focused insurance lead generation and advertising partner.
              We help insurance buyers, agencies, and growth teams acquire qualified prospects
              at scale — combining vertical expertise, campaign strategy, and real-time delivery
              to drive measurable acquisition results.
            </motion.p>

            {/* Trust points */}
            <motion.ul
              custom={0.24}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-3 mb-9"
            >
              {TRUST.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-[26px] h-[26px] rounded-full flex items-center justify-center bg-cyan-500/10 border border-cyan-500/20 mt-0.5">
                    <Icon size={12} className="text-cyan-400" />
                  </span>
                  <span className="text-slate-300 text-[0.85rem] leading-relaxed">{text}</span>
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              custom={0.30}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link href="/apply" className="btn-primary">
                Request Lead Pricing
              </Link>
              <Link href="/contact" className="btn-outline">
                Contact Us
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              custom={0.36}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-4 border-t border-white/8 pt-7"
            >
              {STATS.map(({ value, label }, i) => (
                <div
                  key={label}
                  className={`text-center px-2 ${i < STATS.length - 1 ? 'border-r border-white/8' : ''}`}
                >
                  <div className="text-xl sm:text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">{value}</div>
                  <div className="text-slate-500 text-[0.67rem] mt-0.5 leading-tight">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Globe ───────────────────────────────────────────────── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-[480px] aspect-square" aria-hidden="true">

              {/* Globe canvas */}
              <GlobeThree className="absolute inset-0 w-full h-full" />

              {/* Floating badge — Advertiser Ecosystem */}
              <div
                className="absolute top-[12%] left-0 flex items-center gap-2 bg-[#0B1830]/90 backdrop-blur-sm border border-cyan-500/20 rounded-xl px-3 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.35)] animate-float"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(0,220,255,0.8)]" />
                <span className="text-slate-200 text-[0.68rem] font-semibold whitespace-nowrap">8 Insurance Verticals</span>
              </div>

              {/* Floating badge — Performance */}
              <div
                className="absolute bottom-[12%] right-0 flex items-center gap-2 bg-[#0B1830]/90 backdrop-blur-sm border border-cyan-500/20 rounded-xl px-3 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.35)] animate-float-delayed"
              >
                <ShieldCheck size={11} className="text-cyan-400 flex-shrink-0" />
                <span className="text-slate-200 text-[0.68rem] font-semibold whitespace-nowrap">Performance-Driven Delivery</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" aria-hidden="true" />
    </section>
  )
}
