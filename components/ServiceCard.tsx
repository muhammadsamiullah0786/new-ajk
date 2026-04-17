'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Heart, Activity, ShieldCheck, FileText, Plane, Shield, Car, Home, Briefcase, HardHat } from 'lucide-react'
import { ElementType } from 'react'
import { type Service } from '@/data/services'
import { scaleIn, viewportOnce } from '@/lib/animations'
import { cn } from '@/lib/utils'

const ICON_MAP: Record<string, ElementType> = {
  Heart, Activity, ShieldCheck, FileText, Plane, Car, Home, Briefcase, HardHat,
}

interface ServiceCardProps {
  service:    Service
  variant?:   'preview' | 'full'
  className?: string
}

export default function ServiceCard({ service, variant = 'preview', className }: ServiceCardProps) {
  const Icon = ICON_MAP[service.iconKey] ?? Shield

  if (variant === 'full') {
    return (
      <motion.article
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={scaleIn}
        id={service.slug}
        whileHover={{ y: -4, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
        onMouseMove={(e) => {
          const el = e.currentTarget as HTMLElement
          const r  = el.getBoundingClientRect()
          el.style.backgroundImage = `radial-gradient(280px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(0,204,238,0.07) 0%, transparent 62%), linear-gradient(145deg, rgba(10,24,42,0.85) 0%, rgba(6,18,36,0.92) 100%)`
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLElement).style.backgroundImage = ''
        }}
        className={cn('glow-card p-7 lg:p-9 group scroll-mt-20', className)}
      >
        {/* Icon + title */}
        <div className="flex items-start gap-5 mb-6">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-400/30"
            style={{ background: 'linear-gradient(135deg, rgba(0,204,238,0.15), rgba(0,80,200,0.12))', border: '1px solid rgba(0,204,238,0.18)' }}
          >
            <Icon size={26} className="text-cyan-400" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{service.shortDescription}</p>
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-6">{service.fullDescription}</p>

        <ul className="space-y-2.5 mb-8" aria-label={`${service.title} benefits`}>
          {service.benefits.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm text-slate-300">
              <CheckCircle2 size={14} className="text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>

        <Link
          href="/apply"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 hover:gap-3 transition-all duration-200 group/cta"
        >
          Apply for {service.title}
          <ArrowRight size={14} className="transition-transform duration-200 group-hover/cta:translate-x-1" aria-hidden="true" />
        </Link>
      </motion.article>
    )
  }

  /* Preview card */
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={scaleIn}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
      onMouseMove={(e) => {
        const el = e.currentTarget as HTMLElement
        const r  = el.getBoundingClientRect()
        el.style.backgroundImage = `radial-gradient(260px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(0,204,238,0.07) 0%, transparent 62%), linear-gradient(145deg, rgba(10,24,42,0.85) 0%, rgba(6,18,36,0.92) 100%)`
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.backgroundImage = ''
      }}
      className={cn('glow-card p-6 group cursor-pointer', className)}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{ background: 'linear-gradient(135deg, rgba(0,204,238,0.12), rgba(0,80,200,0.10))', border: '1px solid rgba(0,204,238,0.15)' }}
      >
        <Icon size={20} className="text-cyan-400" aria-hidden="true" />
      </div>

      <h3 className="text-base font-bold text-white mb-2">{service.title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-5">{service.shortDescription}</p>

      <Link
        href={`/services#${service.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-200 group/cta"
      >
        Learn More
        <ArrowRight size={13} className="transition-transform duration-200 group-hover/cta:translate-x-1" aria-hidden="true" />
      </Link>
    </motion.article>
  )
}
