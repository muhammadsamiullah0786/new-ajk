'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations'

interface CTASectionProps {
  title?:          string
  subtitle?:       string
  primaryLabel?:   string
  primaryHref?:    string
  secondaryLabel?: string
  secondaryHref?:  string
  showPhone?:      boolean
}

export default function CTASection({
  title          = 'Ready to Scale Your Insurance Lead Campaigns?',
  subtitle       = 'Talk to our team about your lead generation needs. Campaign launch in as little as 24 hours.',
  primaryLabel   = 'Request Lead Pricing',
  primaryHref    = '/apply',
  secondaryLabel = 'Talk to Our Team',
  secondaryHref  = '/contact',
  showPhone      = true,
}: CTASectionProps) {
  return (
    <section
      className="relative overflow-hidden py-20 lg:py-24"
      style={{ background: 'rgba(1,8,16,0.95)' }}
      aria-label="Call to action"
    >
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.25), transparent)' }} aria-hidden="true" />

      {/* Center glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,150,230,0.14) 0%, transparent 70%)', filter: 'blur(40px)' }}
        aria-hidden="true"
      />
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(0,204,238,0.6) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="mb-5">
            <span className="badge-cyan">Let&apos;s Get Started</span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight"
          >
            {title}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-5 text-base sm:text-lg text-slate-400 leading-relaxed"
          >
            {subtitle}
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link href={primaryHref} className="btn-primary">
                {primaryLabel}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link href={secondaryHref} className="btn-outline">
                {secondaryLabel}
              </Link>
            </motion.div>
          </motion.div>

          {showPhone && (
            <motion.div variants={fadeInUp} className="mt-8 flex justify-center">
              <a
                href="tel:+18456628071"
                className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors duration-200 text-sm group"
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 group-hover:border-cyan-500/40"
                  style={{ background: 'rgba(0,204,238,0.10)', border: '1px solid rgba(0,204,238,0.18)' }}
                >
                  <Phone size={13} className="text-cyan-400" aria-hidden="true" />
                </span>
                Or call us directly:{' '}
                <span className="text-white font-semibold">+1 (845) 662-8071</span>
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.15), transparent)' }} aria-hidden="true" />
    </section>
  )
}

