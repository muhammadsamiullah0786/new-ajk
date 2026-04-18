import Link from 'next/link'
import { Phone, Mail, MapPin, MessageCircle, ChevronRight, Linkedin, Instagram, Facebook, Twitter } from 'lucide-react'

const CONTACT = {
  phone:     '+1 (845) 662-8071',
  phoneHref: 'tel:+18456628071',
  email:     'support@ajk-insurance.com',
  emailHref: 'mailto:support@ajk-insurance.com',
  whatsapp:  'https://wa.me/18456628071',
  address:   'United States — Licensed Nationwide',
  // TODO: Replace placeholder URLs with real social page URLs
  linkedin:  'https://www.linkedin.com/company/ajk-insurance-brokers',
  instagram: 'https://www.instagram.com/ajkinsurance',
  facebook:  'https://www.facebook.com/ajkinsurance',
  twitter:   'https://twitter.com/ajkinsurance',
}

const quickLinks = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About Us' },
  { href: '/services', label: 'Our Services' },
  { href: '/apply',    label: 'Request Lead Pricing' },
  { href: '/contact',  label: 'Contact Us' },
]

const serviceLinks = [
  { href: '/services#medicare-leads',       label: 'Medicare Leads' },
  { href: '/services#final-expense-leads',  label: 'Final Expense Leads' },
  { href: '/services#aca-health-leads',     label: 'ACA / Health Leads' },
  { href: '/services#auto-insurance-leads', label: 'Auto Insurance Leads' },
  { href: '/services#homeowners-leads',     label: 'Homeowners Leads' },
  { href: '/services#business-leads',       label: 'Business Insurance Leads' },
  { href: '/services#workers-comp-leads',   label: "Workers' Comp Leads" },
  { href: '/services#live-transfers',       label: 'Live Transfers' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="relative overflow-hidden text-slate-400"
      style={{ background: 'rgba(1,8,16,0.96)', borderTop: '1px solid rgba(0,204,238,0.08)' }}
      role="contentinfo"
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.30), transparent)' }}
        aria-hidden="true"
      />
      {/* Faint background blob */}
      <div
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,100,200,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />

      {/* Main grid */}
      <div className="section-container py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand col */}
          <div className="lg:col-span-1 space-y-5">
            <Link href="/" className="inline-flex items-center group" aria-label="AJK Insurance Home">
              <div className="w-20 h-20 rounded-3xl bg-white/10 p-3 flex items-center justify-center shadow-xl shadow-cyan-500/10">
                <img src="/logo.png" alt="AJK Logo" className="w-full h-full object-contain" />
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-slate-500">
              A performance-focused insurance lead generation and advertising partner — serving agencies,
              aggregators, carriers, and growth teams across all major insurance verticals.
            </p>

            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/25 text-emerald-400 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200"
            >
              <MessageCircle size={15} />
              Chat on WhatsApp
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {([
                { href: CONTACT.linkedin,  Icon: Linkedin,  label: 'LinkedIn',  color: 'rgba(10,102,194,0.15)',  border: 'rgba(10,102,194,0.30)',  hover: 'hover:bg-[rgba(10,102,194,0.28)]',  text: 'text-blue-400'    },
                { href: CONTACT.instagram, Icon: Instagram, label: 'Instagram', color: 'rgba(225,48,108,0.10)',  border: 'rgba(225,48,108,0.28)',  hover: 'hover:bg-[rgba(225,48,108,0.22)]',  text: 'text-pink-400'    },
                { href: CONTACT.facebook,  Icon: Facebook,  label: 'Facebook',  color: 'rgba(24,119,242,0.10)',  border: 'rgba(24,119,242,0.28)',  hover: 'hover:bg-[rgba(24,119,242,0.22)]',  text: 'text-blue-500'    },
                { href: CONTACT.twitter,   Icon: Twitter,   label: 'Twitter/X', color: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.12)', hover: 'hover:bg-[rgba(255,255,255,0.10)]', text: 'text-slate-300' },
              ] as const).map(({ href, Icon, label, color, border, hover, text }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`AJK Lead Generation on ${label}`}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200 ${hover} ${text}`}
                  style={{ background: color, borderColor: border }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-xs uppercase tracking-[0.14em]">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 text-sm transition-colors duration-200 group"
                  >
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-500" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-xs uppercase tracking-[0.14em]">Our Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 text-sm transition-colors duration-200 group"
                  >
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-500" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-xs uppercase tracking-[0.14em]">Contact Us</h3>
            <ul className="space-y-4">
              {[
                { icon: Phone, label: 'Phone', value: CONTACT.phone, href: CONTACT.phoneHref },
                { icon: Mail,  label: 'Email', value: 'admin@ajk-insurance.com', href: 'mailto:admin@ajk-insurance.com' },
                { icon: Mail,  label: 'Email', value: 'khurshid.khan@ajkinsurance.com', href: 'mailto:khurshid.khan@ajkinsurance.com' },
              ].map(({ icon: Icon, label, value, href }) => (
                <li key={label + value}>
                  <a href={href} className="flex items-start gap-3 text-slate-500 hover:text-white transition-colors duration-200 group">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:border-cyan-500/30"
                      style={{ background: 'rgba(0,204,238,0.06)', border: '1px solid rgba(0,204,238,0.10)' }}
                    >
                      <Icon size={14} className="text-cyan-500" />
                    </span>
                    <div>
                      <div className="text-[10px] text-slate-600 uppercase tracking-wider font-medium mb-0.5">{label}</div>
                      <div className="text-sm font-medium">{value}</div>
                    </div>
                  </a>
                </li>
              ))}
              <li>
                <div className="flex items-start gap-3 text-slate-500">
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0,204,238,0.06)', border: '1px solid rgba(0,204,238,0.10)' }}
                  >
                    <MapPin size={14} className="text-cyan-500" />
                  </span>
                  <div>
                    <div className="text-[10px] text-slate-600 uppercase tracking-wider font-medium mb-0.5">Location</div>
                    <div className="text-sm">{CONTACT.address}</div>
                  </div>
                </div>
              </li>
            </ul>

            <Link href="/apply" className="btn-primary text-sm !px-5 !py-2.5 mt-1">
              Request Lead Pricing
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(0,204,238,0.07)' }}>
        <div className="section-container pt-5 pb-4">
          {/* Legal disclaimer */}
          <p className="text-center text-[11px] text-slate-600 leading-relaxed mb-4">
            AJK is an insurance lead generation and advertising partner. We do not sell insurance
            policies directly. Lead availability and pricing vary by vertical and geography.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <p>
              &copy; {currentYear}{' '}
              <span className="text-slate-500 font-medium">AJK Lead Generation</span>.
              All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link href="/privacy" className="hover:text-slate-400 transition-colors duration-200">Privacy Policy</Link>
              <Link href="/terms"   className="hover:text-slate-400 transition-colors duration-200">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
