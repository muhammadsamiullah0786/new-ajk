'use client'

import { motion } from 'framer-motion'
import { ClipboardList, Send, PhoneCall, BadgeCheck, HelpCircle } from 'lucide-react'
import { ElementType } from 'react'
import { processSteps } from '@/data/process'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations'
import SectionHeader from '@/components/SectionHeader'

const ICON_MAP: Record<string, ElementType> = {
  ClipboardList, Send, PhoneCall, BadgeCheck,
}

export default function ProcessSteps() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: 'rgba(2,12,27,0.90)' }}
      aria-label="How it works"
    >
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.18), transparent)' }} aria-hidden="true" />

      <div className="section-container relative z-10">
        <SectionHeader
          badge="How It Works"
          title="From Campaign Brief to Lead Delivery"
          subtitle="Our streamlined process takes your campaign from brief to live quickly — with performance optimisation built in from day one."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        >
          {/* Connecting line */}
          <div
            className="hidden lg:block absolute top-[30px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, rgba(0,204,238,0.30), rgba(0,80,200,0.50), rgba(0,204,238,0.30))' }}
            aria-hidden="true"
          />

          {processSteps.map((step) => {
            const Icon = ICON_MAP[step.iconKey] ?? HelpCircle
            return (
              <motion.div
                key={step.step}
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Icon circle */}
                <div className="relative mb-6 z-10">
                  <div
                    className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_28px_rgba(0,204,238,0.35)]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,204,238,0.14), rgba(0,80,200,0.12))',
                      border: '1px solid rgba(0,204,238,0.22)',
                      boxShadow: '0 0 20px rgba(0,204,238,0.12)',
                    }}
                  >
                    <Icon size={24} className="text-cyan-400" aria-hidden="true" />
                  </div>
                  {/* Step badge */}
                  <div
                    className="absolute -top-2 -right-2 w-5 h-5 text-[#010810] text-[10px] font-black rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #00CCEE, #0066CC)' }}
                  >
                    {step.step}
                  </div>
                </div>

                <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-[220px]">{step.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.12), transparent)' }} aria-hidden="true" />
    </section>
  )
}


// Icon registry â€” maps iconKey strings from data/process.ts