'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Phone, Mail, MapPin, MessageCircle, Clock,
  Send, User, MessageSquare, AlertCircle, CheckCircle2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations'

// TODO: update all contact details
const CONTACT_DETAILS = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (845) 662-8071',
    href:  'tel:+18456628071',
    description: 'Mon–Fri, 9am–6pm ET',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'khan@ajk-insurance.com',
    href:  'mailto:khan@ajk-insurance.com',
    description: 'We reply within 24 hours',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Chat on WhatsApp',
    href:  'https://wa.me/18456628071',
    description: 'Quick responses via chat',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'United States',             // TODO: replace with real office address
    href:  undefined,
    description: 'Licensed nationwide',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon–Sat, 9am–7pm ET',
    href:  undefined,
    description: 'Available for urgent inquiries',
  },
]

interface ContactForm {
  name:    string
  email:   string
  phone:   string
  subject: string
  message: string
}

const INIT: ContactForm = { name: '', email: '', phone: '', subject: '', message: '' }
type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactContent() {
  const [form,   setForm]   = useState<ContactForm>(INIT)
  const [errors, setErrors] = useState<Partial<ContactForm>>({})
  const [status, setStatus] = useState<Status>('idle')

  function validate(): boolean {
    const next: Partial<ContactForm> = {}
    if (!form.name.trim())  next.name  = 'Name is required.'
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Please enter a valid email address.'
    if (!form.subject.trim()) next.subject = 'Subject is required.'
    if (!form.message.trim()) next.message = 'Message is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    // TODO: replace with actual form handler (API route, EmailJS, Formspree, etc.)
    console.log('Contact form submission:', form)
    await new Promise(r => setTimeout(r, 1000))
    setStatus('success')
    setForm(INIT)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <>
      {/* ── Page Header ── */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: 'rgba(2,12,27,0.80)' }}
        aria-labelledby="contact-heading"
      >
        {/* Top divider */}
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.18), transparent)' }} aria-hidden="true" />
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,204,238,0.06) 0%, transparent 70%)' }} aria-hidden="true" />
        <div className="section-container relative z-10">
          <div className="max-w-xl">
            <span className="badge-cyan mb-5 inline-flex">Talk to Our Team</span>
            <h1
              id="contact-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-5"
            >
              Get in{' '}
              <span className="text-gradient-cyan">Touch</span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              Whether you want to discuss lead types, campaign setup, delivery preferences, or
              optimisation goals — our team is ready to help.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact Details + Form ── */}
      <section className="section-padding relative" aria-label="Contact information and form">
        {/* Top divider */}
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.12), transparent)' }} aria-hidden="true" />
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Contact cards — 2 columns */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer}
              className="lg:col-span-2 space-y-5"
            >
              <motion.div variants={fadeInUp} className="mb-2">
                <span className="badge-cyan mb-4 inline-flex">Contact</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">Ways to Reach Us</h2>
              </motion.div>
              <motion.p variants={fadeInUp} className="text-slate-400 text-sm leading-relaxed mb-6">
                Choose the channel that works best for you. Every inquiry is handled by a
                real AJK campaign specialist.
              </motion.p>

              <div className="space-y-4">
                {CONTACT_DETAILS.map(({ icon: Icon, label, value, href, description }, i) => {
                  const inner = (
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={viewportOnce}
                      transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ y: -3, x: 0, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
                      onMouseMove={(e) => {
                        const el = e.currentTarget as HTMLElement
                        const r  = el.getBoundingClientRect()
                        el.style.backgroundImage = `radial-gradient(200px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(0,204,238,0.07) 0%, transparent 60%), linear-gradient(145deg, rgba(10,24,42,0.85) 0%, rgba(6,18,36,0.92) 100%)`
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLElement).style.backgroundImage = ''
                      }}
                      className={cn(
                        'glow-card flex items-start gap-4 p-5 transition-all duration-200',
                        href ? 'cursor-pointer' : ''
                      )}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(0,204,238,0.10)', border: '1px solid rgba(0,204,238,0.18)' }}
                      >
                        <Icon size={18} className="text-cyan-400" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-[11px] text-cyan-500 uppercase tracking-wider font-semibold mb-0.5">{label}</div>
                        <div className="text-white font-semibold text-sm">{value}</div>
                        <div className="text-slate-400 text-xs mt-0.5">{description}</div>
                      </div>
                    </motion.div>
                  )

                  return href ? (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={`${label}: ${value}`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={label}>{inner}</div>
                  )
                })}
              </div>
            </motion.div>

            {/* Contact Form — 3 columns */}
            <div className="lg:col-span-3">
              <div className="glow-card premium-border p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-white mb-1.5">Send Us a Message</h2>
                <p className="text-slate-400 text-sm mb-8">
                  We aim to respond to all inquiries within 24 hours.
                </p>

                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-10"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{ background: 'rgba(0,204,238,0.12)', border: '1px solid rgba(0,204,238,0.25)' }}
                    >
                      <CheckCircle2 size={30} className="text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                      Thank you for reaching out. An AJK advisor will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-6 btn-primary text-sm"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    variants={staggerContainer}
                    onSubmit={handleSubmit}
                    noValidate
                    aria-label="Contact form"
                    className="space-y-5"
                  >
                    {/* Name + Email row */}
                    <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-5">
                      {[
                        { id: 'name',  label: 'Your Name',    type: 'text',  placeholder: 'John Smith',       icon: User },
                        { id: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', icon: Mail },
                      ].map(({ id, label, type, placeholder, icon: FieldIcon }) => (
                        <div key={id}>
                          <label htmlFor={id} className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                            {label}<span className="text-cyan-400 ml-0.5" aria-hidden="true">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                              <FieldIcon size={15} aria-hidden="true" />
                            </span>
                            <input
                              id={id}
                              name={id}
                              type={type}
                              value={form[id as keyof ContactForm]}
                              onChange={handleChange}
                              placeholder={placeholder}
                              required
                              aria-required="true"
                              className={cn(
                                'input-dark w-full pl-10',
                                errors[id as keyof ContactForm] && 'border-red-500/60 focus:border-red-400'
                              )}
                            />
                          </div>
                          {errors[id as keyof ContactForm] && (
                            <p role="alert" className="flex items-center gap-1 mt-1 text-xs text-red-400 font-medium">
                              <AlertCircle size={11} aria-hidden="true" />
                              {errors[id as keyof ContactForm]}
                            </p>
                          )}
                        </div>
                      ))}
                    </motion.div>

                    {/* Phone */}
                    <motion.div variants={fadeInUp}>
                      <label htmlFor="phone" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Phone Number <span className="text-slate-500 font-normal normal-case">(optional)</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                          <Phone size={15} aria-hidden="true" />
                        </span>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className="input-dark w-full pl-10"
                        />
                      </div>
                    </motion.div>

                    {/* Subject */}
                    <motion.div variants={fadeInUp}>
                      <label htmlFor="subject" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Subject<span className="text-cyan-400 ml-0.5" aria-hidden="true">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                          <MessageSquare size={15} aria-hidden="true" />
                        </span>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="e.g. Life Insurance Inquiry"
                          required
                          aria-required="true"
                          className={cn(
                            'input-dark w-full pl-10',
                            errors.subject && 'border-red-500/60 focus:border-red-400'
                          )}
                        />
                      </div>
                      {errors.subject && (
                        <p role="alert" className="flex items-center gap-1 mt-1 text-xs text-red-400 font-medium">
                          <AlertCircle size={11} aria-hidden="true" />
                          {errors.subject}
                        </p>
                      )}
                    </motion.div>

                    {/* Message */}
                    <motion.div variants={fadeInUp}>
                      <label htmlFor="message" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Message<span className="text-cyan-400 ml-0.5" aria-hidden="true">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-3.5 text-slate-500 pointer-events-none">
                          <MessageSquare size={15} aria-hidden="true" />
                        </span>
                        <textarea
                          id="message"
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Tell us how we can help you..."
                          required
                          aria-required="true"
                          className={cn(
                            'input-dark w-full pl-10 resize-none',
                            errors.message && 'border-red-500/60 focus:border-red-400'
                          )}
                        />
                      </div>
                      {errors.message && (
                        <p role="alert" className="flex items-center gap-1 mt-1 text-xs text-red-400 font-medium">
                          <AlertCircle size={11} aria-hidden="true" />
                          {errors.message}
                        </p>
                      )}
                    </motion.div>

                    {/* Submit */}
                    <motion.div variants={fadeInUp}>
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className={cn(
                          'btn-primary w-full !py-4 text-base',
                          status === 'submitting' && 'opacity-75 cursor-not-allowed'
                        )}
                        aria-disabled={status === 'submitting'}
                      >
                        {status === 'submitting' ? (
                          <>
                            <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={17} aria-hidden="true" />
                          </>
                        )}
                      </button>
                    </motion.div>
                  </motion.form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Map placeholder ── */}
      <section style={{ background: 'rgba(1,8,16,0.80)' }} aria-label="Office location placeholder">
        {/* Top divider */}
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,238,0.12), transparent)' }} aria-hidden="true" />
        <div className="section-container py-8">
          {/* TODO: Embed real Google Maps iframe here */}
          <div
            className="h-56 sm:h-72 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(6,18,33,0.85)', border: '1px solid rgba(0,204,238,0.09)' }}
          >
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: 'rgba(0,204,238,0.10)', border: '1px solid rgba(0,204,238,0.18)' }}
              >
                <MapPin size={22} className="text-cyan-400" aria-hidden="true" />
              </div>
              <p className="text-white text-sm font-semibold">Map Placeholder</p>
              <p className="text-slate-500 text-xs mt-1">
                Replace with an embedded Google Maps iframe for your office location.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
