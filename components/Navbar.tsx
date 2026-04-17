'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/apply',    label: 'Get Pricing' },
  { href: '/contact',  label: 'Contact' },
]

const PHONE      = '+1 (845) 662-8071'
const PHONE_HREF = 'tel:+18456628071'

export default function Navbar() {
  const [isScrolled,   setIsScrolled]  = useState(false)
  const [isMobileOpen, setMobileOpen]  = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-[#0b1f3a] backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'bg-[#0b1f3a]'
        )}
        role="banner"
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 outline-none group"
              aria-label="AJK Insurance — Home"
            >
              {/* Shield SVG */}
              <svg width="42" height="48" viewBox="0 0 42 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M21 2L3 9.5v15C3 35.5 11 44 21 47c10-3 18-11.5 18-22.5v-15L21 2z"
                  fill="url(#shield_grad)" />
                <path d="M21 2L3 9.5v15C3 35.5 11 44 21 47c10-3 18-11.5 18-22.5v-15L21 2z"
                  fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                <polyline points="13,24 19,31 30,18"
                  stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="shield_grad" x1="3" y1="2" x2="39" y2="47" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#4a90d9" />
                    <stop offset="100%" stopColor="#1a3fa6" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Text */}
              <div className="flex flex-col leading-none">
                <span className="text-white font-extrabold text-2xl tracking-wide">
                  AJK
                </span>
                <span className="text-white/75 font-semibold text-[10px] tracking-[0.3em] uppercase mt-0.5">
                  Insurance
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map(({ href, label }) => {
                const active = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'relative px-3 py-1.5 text-[0.82rem] font-medium rounded-md transition-all duration-200',
                      active
                        ? 'text-white'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    )}
                    aria-current={active ? 'page' : undefined}
                  >
                    {label}
                    {active && (
                      <span
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-white/80"
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white text-xs font-medium transition-colors duration-200"
              >
                <Phone size={12} className="text-cyan-300" aria-hidden="true" />
                <span>{PHONE}</span>
              </a>
              <Link href="/apply" className="btn-primary text-xs !px-4 !py-1.5">
                Get Lead Pricing
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isMobileOpen ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[280px] z-50 flex flex-col lg:hidden"
              style={{
                background: '#0b1f3a',
                borderLeft: '1px solid rgba(255,255,255,0.10)',
              }}
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-6 h-16"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="flex items-center gap-2.5">
                  <svg width="30" height="34" viewBox="0 0 42 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M21 2L3 9.5v15C3 35.5 11 44 21 47c10-3 18-11.5 18-22.5v-15L21 2z" fill="url(#shield_m)" />
                    <polyline points="13,24 19,31 30,18" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    <defs>
                      <linearGradient id="shield_m" x1="3" y1="2" x2="39" y2="47" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#4a90d9" />
                        <stop offset="100%" stopColor="#1a3fa6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="flex flex-col leading-none">
                    <span className="text-white font-extrabold text-lg tracking-wide">AJK</span>
                    <span className="text-white/70 font-semibold text-[9px] tracking-[0.3em] uppercase mt-0.5">Insurance</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto" aria-label="Mobile navigation">
                {NAV_LINKS.map(({ href, label }, i) => {
                  const active = pathname === href
                  return (
                    <motion.div
                      key={href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.28 }}
                    >
                      <Link
                        href={href}
                        className={cn(
                          'flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                          active
                            ? 'text-white bg-white/10'
                            : 'text-slate-300 hover:text-white hover:bg-white/8'
                        )}
                        style={active ? { border: '1px solid rgba(255,255,255,0.15)' } : {}}
                        aria-current={active ? 'page' : undefined}
                      >
                        {label}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              {/* Footer */}
              <div
                className="px-6 py-5 space-y-3"
                style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
              >
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-2 text-slate-300 hover:text-white text-sm transition-colors"
                >
                  <Phone size={14} className="text-cyan-300" />
                  <span>{PHONE}</span>
                </a>
                <Link href="/apply" className="btn-primary w-full !py-3 text-sm" onClick={() => setMobileOpen(false)}>
                  Get Lead Pricing
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
