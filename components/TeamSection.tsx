'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import { team, type TeamMember } from '@/data/team'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface TeamSectionProps {
  /**
   * `full` renders the complete grid (used on /about). `preview` renders a
   * short, marketing-friendly slice with a CTA back to /about (used on the
   * home page).
   */
  variant?: 'full' | 'preview'
  /** Optional override of which members to render. Defaults to all in `team`. */
  members?: TeamMember[]
  /** Override the section heading copy when needed. */
  badge?: string
  title?: string
  subtitle?: string
  /** When `true`, the outer <section> wrapper is omitted (caller provides it). */
  bare?: boolean
  /** Optional className passed through to the outer wrapper. */
  className?: string
}

/** Two uppercase initials from a full name, ignoring credentials after a comma. */
function initialsFor(name: string): string {
  const cleaned = name.split(',')[0].trim()
  const parts = cleaned.split(/\s+/).filter(Boolean)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase()
}

interface TeamCardProps {
  member: TeamMember
  index: number
}

/**
 * Single team member card. Uses a CSS-only image with `onError` fallback to
 * initials so the page degrades gracefully if a photo is missing or fails to
 * load. Avoids next/image to keep the fallback path simple.
 */
function TeamCard({ member, index }: TeamCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
      className="glow-card group p-6 sm:p-7 flex flex-col items-center text-center"
    >
      {/* Photo / initials avatar */}
      <div className="relative w-full max-w-[220px] aspect-[4/5] mb-5">
        {/* Outer glow ring (visible on hover) */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(0,204,238,0.35) 0%, rgba(68,136,255,0.15) 100%)',
            filter: 'blur(16px)',
          }}
          aria-hidden="true"
        />
        {/* Photo container */}
        <div
          className="relative h-full w-full overflow-hidden rounded-2xl"
          style={{
            background:
              'linear-gradient(145deg, rgba(0,204,238,0.10) 0%, rgba(0,119,204,0.04) 100%)',
            border: '1px solid rgba(0,204,238,0.18)',
          }}
        >
          {/* Initials fallback layer (always rendered, hidden by photo when it loads) */}
          <div
            className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl font-black tracking-wider text-cyan-300/80 select-none"
            aria-hidden="true"
          >
            {initialsFor(member.name)}
          </div>
          <img
            src={member.image}
            alt={`Portrait of ${member.name.split(',')[0].trim()}`}
            loading={index < 3 ? 'eager' : 'lazy'}
            decoding="async"
            className="relative h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            onError={(e) => {
              // If the photo file is missing, hide the broken <img> and let
              // the initials layer show through.
              ;(e.currentTarget as HTMLImageElement).style.display = 'none'
            }}
          />
          {/* Subtle gradient overlay at the bottom for premium feel */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(2,12,27,0.55) 0%, transparent 100%)',
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      <h3 className="text-white font-bold text-base sm:text-lg leading-snug">{member.name}</h3>
      <p className="mt-1 text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide uppercase">
        {member.role}
      </p>
    </motion.div>
  )
}

export default function TeamSection({
  variant = 'full',
  members,
  badge,
  title,
  subtitle,
  bare = false,
  className,
}: TeamSectionProps) {
  const list = members ?? (variant === 'preview' ? team.slice(0, 3) : team)

  const resolvedBadge = badge ?? (variant === 'preview' ? 'Our Team' : 'Meet the Team')
  const resolvedTitle =
    title ?? (variant === 'preview' ? 'The People Behind AJK' : 'The People Behind AJK')
  const resolvedSubtitle =
    subtitle ??
    (variant === 'preview'
      ? 'A leadership team focused on performance, partnership, and your campaign results.'
      : 'A leadership and operations team built to support insurance advertisers, agencies, and aggregators at every stage of their growth.')

  const grid = (
    <>
      <SectionHeader badge={resolvedBadge} title={resolvedTitle} subtitle={resolvedSubtitle} />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
        className={cn(
          'mt-12 grid gap-6 sm:gap-7',
          variant === 'preview'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {list.map((member, idx) => (
          <TeamCard key={member.id} member={member} index={idx} />
        ))}
      </motion.div>

      {variant === 'preview' && (
        <div className="mt-10 text-center">
          <Link href="/about#team" className="btn-outline inline-flex items-center gap-2">
            Meet the Full Team
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      )}
    </>
  )

  if (bare) {
    return <div className={className}>{grid}</div>
  }

  return (
    <section
      id="team"
      className={cn('section-padding relative scroll-mt-24', className)}
      style={{ background: 'rgba(1,8,16,0.88)' }}
      aria-label="Meet the AJK team"
    >
      {/* Top divider */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,204,238,0.14), transparent)',
        }}
        aria-hidden="true"
      />
      <div className="section-container">{grid}</div>
    </section>
  )
}
