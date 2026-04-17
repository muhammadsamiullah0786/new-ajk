'use client'

import { motion } from 'framer-motion'
import { Users, Shield, Zap, Building2, HeartHandshake, TrendingUp, HelpCircle } from 'lucide-react'
import { ElementType } from 'react'
import { type Feature } from '@/data/features'
import { scaleIn, viewportOnce } from '@/lib/animations'
import { cn } from '@/lib/utils'

const ICON_MAP: Record<string, ElementType> = {
  Users, Shield, Zap, Building2, HeartHandshake, TrendingUp,
}

interface FeatureCardProps {
  feature:    Feature
  variant?:   'card' | 'minimal'
  className?: string
}

export default function FeatureCard({ feature, variant = 'card', className }: FeatureCardProps) {
  const Icon = ICON_MAP[feature.iconKey] ?? HelpCircle

  if (variant === 'minimal') {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={scaleIn}
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
        className={cn('flex items-start gap-4 group', className)}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-cyan-400/30 group-hover:bg-cyan-500/15"
          style={{ background: 'rgba(0,204,238,0.10)', border: '1px solid rgba(0,204,238,0.16)' }}
        >
          <Icon size={18} className="text-cyan-400" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-white font-bold text-sm mb-1 group-hover:text-cyan-100 transition-colors duration-200">{feature.title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={scaleIn}
      whileHover={{ y: -5, scale: 1.015, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
      onMouseMove={(e) => {
        const el = e.currentTarget as HTMLElement
        const r  = el.getBoundingClientRect()
        el.style.backgroundImage = `radial-gradient(260px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(0,204,238,0.07) 0%, transparent 62%), linear-gradient(145deg, rgba(10,24,42,0.85) 0%, rgba(6,18,36,0.92) 100%)`
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.backgroundImage = ''
      }}
      className={cn('glow-card p-6 group', className)}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
        style={{ background: 'rgba(0,204,238,0.10)', border: '1px solid rgba(0,204,238,0.14)' }}
      >
        <Icon size={20} className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" aria-hidden="true" />
      </div>
      <h3 className="text-white font-bold text-base mb-2">{feature.title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
    </motion.div>
  )
}
