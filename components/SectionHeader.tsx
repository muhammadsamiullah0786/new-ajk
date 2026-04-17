'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeInUp, viewportOnce } from '@/lib/animations'

interface SectionHeaderProps {
  badge?:          string
  title:           string
  subtitle?:       string
  centered?:       boolean
  /** @deprecated kept for backward-compat â€” dark bg only now */
  light?:          boolean
  className?:      string
  titleClassName?: string
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  centered       = true,
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeInUp}
      className={cn('max-w-3xl', centered && 'mx-auto text-center', className)}
    >
      {badge && (
        <div className={cn('mb-4', centered && 'flex justify-center')}>
          <span className="badge-cyan">{badge}</span>
        </div>
      )}

      <h2
        className={cn(
          'text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-white tracking-tight leading-[1.12]',
          titleClassName
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p className={cn('mt-4 text-base sm:text-lg leading-relaxed text-slate-400 max-w-2xl', centered && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
