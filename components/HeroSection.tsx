'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, CheckCircle2, Users, Star, ArrowRight } from 'lucide-react'

const TRUST_STATS = [
  { value: '1M+',   label: 'Leads Delivered'      },
  { value: '50+',   label: 'Active Advertisers'   },
  { value: '8',     label: 'Insurance Verticals'  },
  { value: '24 hr', label: 'Campaign Launch'       },
]

const TRUST_POINTS = [
  'Performance-Driven Lead Generation',
  'Exclusive & Shared Lead Options',
  'Real-Time Delivery & CRM Integration',
]

const child = (delay: number) => ({
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } },
})

export default function HeroSection() {
  // Only run entry animation on the client after mount.
  // This prevents the hero text from being invisible during SSR / first paint.
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const initial = mounted ? 'hidden' : 'visible'

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'rgba(1,8,16,0.01)' }}   /* transparent â€” aurora shows through */
      aria-label="Hero — AJK Insurance Lead Generation"
    >      {/* ── Ambient glow blobs ── */}
      <div
        className="absolute top-10 right-[6%] w-[520px] h-[520px] rounded-full pointer-events-none anim-blob"
        style={{ background: 'radial-gradient(circle, rgba(0,204,238,0.042) 0%, transparent 68%)', filter: 'blur(70px)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-24 left-[3%] w-[380px] h-[380px] rounded-full pointer-events-none anim-blob-alt"
        style={{ background: 'radial-gradient(circle, rgba(0,80,200,0.052) 0%, transparent 65%)', filter: 'blur(60px)' }}
        aria-hidden="true"
      />      {/* â”€â”€ Light beam sweep â€” single slow pass â”€â”€ */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/3 -left-10 w-[3px] h-[60%] rotate-[20deg] origin-top animate-beam opacity-[0.07]"
          style={{ background: 'linear-gradient(to bottom, transparent, #00CCEE, transparent)' }}
        />
        <div
          className="absolute top-1/4 left-[30%] w-[2px] h-[50%] rotate-[20deg] origin-top animate-beam opacity-[0.05]"
          style={{ background: 'linear-gradient(to bottom, transparent, #4488FF, transparent)', animationDelay: '3s' }}
        />
      </div>

      {/* â”€â”€ Glowing horizontal top rule â”€â”€ */}
      <div
        className="absolute top-20 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(0,204,238,0.12) 40%, rgba(0,204,238,0.12) 60%, transparent 90%)' }}
        aria-hidden="true"
      />

      {/* â”€â”€ Main content â”€â”€ */}
      <div className="section-container relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">

          {/* Left — text block */}
          <motion.div
            initial={initial}
            animate="visible"
            className="max-w-xl"
          >
            {/* Badge */}
            <motion.div variants={child(0)} className="mb-7">
              <span className="badge-cyan">
                <Shield size={11} />
                Insurance Lead Generation Partner
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={child(0.08)}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-black text-white leading-[1.07] tracking-tight"
            >
              Scale Your{' '}
              <span className="text-gradient-cyan">Insurance Customer</span>{' '}
              Acquisition
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={child(0.16)}
              className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed"
            >
              AJK delivers{' '}
              <span className="text-slate-200 font-medium">high-intent insurance leads</span>{' '}
              for advertisers, agencies, aggregators, and buyers — with optimised campaigns,
              scalable delivery, and performance reporting across all key verticals.
            </motion.p>

            {/* Trust checklist */}
            <motion.ul variants={child(0.24)} className="mt-7 space-y-2.5">
              {TRUST_POINTS.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 size={15} className="text-cyan-400 flex-shrink-0" />
                  {p}
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div variants={child(0.32)} className="mt-10 flex flex-wrap gap-4">
              <Link href="/apply" className="btn-primary">
                Request Lead Pricing
                <ArrowRight size={15} />
              </Link>
              <Link href="/services" className="btn-outline">
                Explore Lead Types
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — visual card */}
          <motion.div
            initial={mounted ? { opacity: 0, x: 44 } : { opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-[420px]">

              {/* Main glass card */}
              <div
                className="relative rounded-2xl p-8"
                style={{
                  background: 'linear-gradient(145deg, rgba(10,24,44,0.90), rgba(6,16,30,0.95))',
                  border: '1px solid rgba(0,204,238,0.14)',
                  boxShadow: '0 20px 80px rgba(0,0,0,0.55), 0 0 40px rgba(0,204,238,0.08)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                {/* Card header */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#00CCEE,#0066CC)', boxShadow: '0 0 18px rgba(0,204,238,0.45)' }}
                  >
                    <Shield size={22} className="text-[#010810]" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-base">AJK Lead Generation</div>
                    <div className="text-slate-400 text-xs">Performance Marketing Partner</div>
                  </div>
                </div>

                {/* Vertical bars */}
                <div className="space-y-4">
                  {[
                    { label: 'Medicare Leads',       pct: 95 },
                    { label: 'ACA / Health Leads',   pct: 88 },
                    { label: 'Final Expense Leads',  pct: 92 },
                  ].map(({ label, pct }) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-300">{label}</span>
                        <span className="text-cyan-400 font-semibold">{pct}%</span>
                      </div>
                      <div
                        className="h-1.5 rounded-full overflow-hidden"
                        style={{ background: 'rgba(0,204,238,0.08)' }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1.3, delay: 0.7, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ background: 'linear-gradient(90deg, #00CCEE, #0066CC)' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stat row */}
                <div className="mt-7 grid grid-cols-2 gap-3">
                  {[{ v: '1M+', l: 'Leads Sent' }, { v: '50+', l: 'Advertisers' }].map(({ v, l }) => (
                    <div
                      key={l}
                      className="rounded-xl p-4 text-center"
                      style={{ background: 'rgba(0,204,238,0.04)', border: '1px solid rgba(0,204,238,0.10)' }}
                    >
                      <div className="text-cyan-400 font-black text-2xl">{v}</div>
                      <div className="text-slate-500 text-[11px] mt-0.5">{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating top-right badge */}
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-5 -right-5 rounded-xl px-4 py-2.5"
                style={{ background: 'linear-gradient(135deg, #00CCEE, #0066CC)', boxShadow: '0 0 24px rgba(0,204,238,0.50)' }}
              >
                <div className="flex items-center gap-2">
                  <Star size={13} className="text-[#010810]" />
                  <span className="text-[#010810] text-xs font-black">Performance Campaigns</span>
                </div>
              </motion.div>

              {/* Floating bottom-left badge */}
              <motion.div
                animate={{ y: [0, 9, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute -bottom-5 -left-5 rounded-xl px-4 py-2.5"
                style={{
                  background: 'rgba(10,24,44,0.95)',
                  border: '1px solid rgba(0,204,238,0.18)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="flex items-center gap-2">
                  <Users size={13} className="text-cyan-400" />
                  <span className="text-white text-xs font-semibold">1M+ Leads Delivered</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.85, ease: 'easeOut' }}
          className="mt-16 lg:mt-20 pt-10"
          style={{ borderTop: '1px solid rgba(0,204,238,0.10)' }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {TRUST_STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-gradient-cyan">{value}</div>
                <div className="text-xs text-slate-500 mt-1.5 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(2,12,27,0.85))' }}
        aria-hidden="true"
      />
    </section>
  )
}