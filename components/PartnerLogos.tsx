'use client'

import { motion } from 'framer-motion'
import { partners } from '@/data/partners'
import { staggerContainer, fadeInUp, viewportOnce } from '@/lib/animations'
import SectionHeader from '@/components/SectionHeader'

export default function PartnerLogos() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: 'rgba(1,8,16,0.80)' }}
      aria-label="Advertiser ecosystem"
    >
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.18), transparent)' }} aria-hidden="true" />

      <div className="section-container relative z-10">
        <SectionHeader
          badge="Advertiser Ecosystem"
          title="Supporting Insurance Advertisers Across Key Verticals"
          subtitle="We work with agencies, aggregators, carriers, and performance marketing teams across all major insurance verticals."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-14 flex flex-wrap justify-center gap-4"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.id}
              variants={fadeInUp}
              className="glow-card p-5 flex flex-col items-center text-center gap-3 cursor-default w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(0,204,238,0.08)', border: '1px solid rgba(0,204,238,0.14)' }}
              >
                <span className="text-cyan-400 font-black text-sm leading-tight">
                  {partner.shortName.split(' ').map((w: string) => w[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div>
                <div className="text-white font-bold text-sm leading-tight">{partner.shortName}</div>
                <div className="text-slate-500 text-xs mt-0.5">{partner.description}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
          className="text-center text-slate-600 text-sm mt-10"
        >
          Serving insurance growth teams from independent agencies to national carriers and aggregators.
        </motion.p>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.12), transparent)' }} aria-hidden="true" />
    </section>
  )
}

