'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { testimonials } from '@/data/testimonials'
import { staggerContainer, scaleIn, viewportOnce, fadeInUp } from '@/lib/animations'
import SectionHeader from '@/components/SectionHeader'

export default function Testimonials() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: 'rgba(1,8,16,0.85)' }}
      aria-label="Partner testimonials"
    >
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.18), transparent)' }} aria-hidden="true" />

      <div className="section-container relative z-10">
        <SectionHeader
          badge="Partner Success"
          title="Trusted by Insurance Growth Teams"
          subtitle="Real advertisers. Real results. Hear from agencies, buyers, and growth teams who partner with AJK for qualified lead delivery."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.article
              key={t.id}
              variants={scaleIn}
              whileHover={{ y: -5, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
              onMouseMove={(e) => {
                const el = e.currentTarget as HTMLElement
                const r  = el.getBoundingClientRect()
                el.style.backgroundImage = `radial-gradient(240px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(0,204,238,0.07) 0%, transparent 62%), linear-gradient(145deg, rgba(10,24,42,0.85) 0%, rgba(6,18,36,0.92) 100%)`
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.backgroundImage = ''
              }}
              className="glow-card p-6 flex flex-col"
              aria-label={`Testimonial from ${t.name}`}
            >
              {/* Stars + quote icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-cyan-400 fill-cyan-400" aria-hidden="true" />
                  ))}
                </div>
                <Quote size={20} className="text-cyan-500/20" aria-hidden="true" />
              </div>

              <blockquote className="text-slate-400 text-sm leading-relaxed flex-1 mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 text-cyan-400 text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0,204,238,0.10)', border: '1px solid rgba(0,204,238,0.16)' }}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-slate-500 text-xs">{t.location}</div>
                  </div>
                </div>
                <span className="badge-cyan text-[9px] !px-2.5 !py-1">{t.service}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
          className="text-center text-slate-600 text-xs mt-10"
        >
          Testimonials represent real advertiser and partner experiences.
        </motion.p>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.12), transparent)' }} aria-hidden="true" />
    </section>
  )
}


