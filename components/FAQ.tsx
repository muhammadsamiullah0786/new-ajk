'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import { staggerContainer, fadeInUp, viewportOnce } from '@/lib/animations'

const FAQS = [
  {
    question: 'What insurance lead types do you offer?',
    answer:
      'We generate leads across all major insurance verticals including Medicare (Advantage, Supplement, Part D), Final Expense, ACA / Health, Auto, Homeowners, Business Insurance, Workers\u2019 Compensation, and Live Transfers. We can support single-vertical campaigns or multi-vertical programmes.',
  },
  {
    question: 'Are leads exclusive or shared?',
    answer:
      'We offer both options. Exclusive leads are delivered to a single buyer only, resulting in higher close rates and zero competition. Shared leads are delivered to a limited number of buyers simultaneously and are priced at a lower CPL. We can discuss which model fits your campaign objectives.',
  },
  {
    question: 'How are leads delivered?',
    answer:
      'Leads are delivered in real time via API integration, direct CRM push, or a secure delivery portal. We support most major CRMs and dialler platforms. Custom delivery formats are available on request.',
  },
  {
    question: 'Do you support live transfers or inbound calls?',
    answer:
      'Yes. In addition to form-submitted leads, we operate live transfer and inbound call campaigns across Medicare, ACA, Auto, and Final Expense. Every transfer is pre-qualified before connecting to your agents to maximise your contact and conversion rate.',
  },
  {
    question: 'Which geographies and verticals do you support?',
    answer:
      'We operate campaigns nationally across the United States and can target by state, DMA, county, or ZIP code. We support all major insurance verticals. Contact us to confirm availability and volume capacity in your specific geography.',
  },
  {
    question: 'How quickly can campaigns launch?',
    answer:
      'Standard campaigns can be live within 24 to 48 hours of onboarding completion. Custom campaigns with specific targeting parameters or integration requirements may take slightly longer. Our team will give you a clear timeline during the kickoff process.',
  },
  {
    question: 'Can you optimise by CPL, CPA, or quality thresholds?',
    answer:
      'Yes. We actively monitor and optimise all campaigns against your performance targets \u2014 whether those are CPL goals, CPA benchmarks, contact rate thresholds, or custom quality scoring criteria. Optimisation is ongoing, not a one-time setup.',
  },
  {
    question: 'Do you support custom filtering and campaign targeting?',
    answer:
      'Absolutely. We support a wide range of filters including age, income band, geography, homeowner status, vehicle type, business type, employee count, and more \u2014 depending on the vertical. Custom filter requirements can be discussed during onboarding.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      className="section-padding relative"
      style={{ background: 'rgba(2,12,27,0.90)' }}
      aria-label="Frequently asked questions"
    >
      {/* Top divider */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.18), transparent)' }}
        aria-hidden="true"
      />

      <div className="section-container">
        <SectionHeader
          badge="FAQ"
          title="Advertiser &amp; Buyer Questions Answered"
          subtitle="Everything you need to know about working with AJK as a lead generation and advertising partner."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-12 max-w-3xl mx-auto space-y-3"
        >
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: isOpen ? 'rgba(0,204,238,0.06)' : 'rgba(0,204,238,0.03)',
                  border: `1px solid ${isOpen ? 'rgba(0,204,238,0.22)' : 'rgba(0,204,238,0.09)'}`,
                  transition: 'background 0.25s ease, border-color 0.25s ease',
                }}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-white font-semibold text-sm sm:text-base leading-snug">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-shrink-0 text-cyan-400"
                    aria-hidden="true"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-slate-400 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
