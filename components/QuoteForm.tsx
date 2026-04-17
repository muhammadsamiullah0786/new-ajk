'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Send, CheckCircle2, AlertCircle,
  User, Mail, Phone, Building2, Shield, MapPin, DollarSign, MessageSquare, BarChart3,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations'

const BUSINESS_TYPES = [
  'Insurance Agency',
  'Insurance Carrier',
  'MGA / Aggregator',
  'Performance Marketing Company',
  'Independent Agent',
  'Lead Buyer / Reseller',
  'Other',
]

const LEAD_TYPES = [
  'Medicare Leads',
  'Final Expense Leads',
  'ACA / Health Leads',
  'Auto Insurance Leads',
  'Homeowners Insurance Leads',
  'Business Insurance Leads',
  "Workers' Compensation Leads",
  'Live Transfers / Inbound Calls',
  'Multiple Verticals',
]

const DELIVERY_PREFS = [
  'API / Real-Time Push',
  'CRM Integration',
  'Secure Portal',
  'Email Delivery',
  'Discuss with Team',
]

const BUDGET_RANGES = [
  'Under $2,000 / month',
  '$2,000 – $5,000 / month',
  '$5,000 – $15,000 / month',
  '$15,000 – $50,000 / month',
  '$50,000+ / month',
  'Flexible — let\'s discuss',
]

interface FormData {
  fullName:        string
  companyName:     string
  workEmail:       string
  phone:           string
  businessType:    string
  leadType:        string
  targetGeo:       string
  monthlyVolume:   string
  deliveryPref:    string
  budgetRange:     string
  notes:           string
}

const INITIAL_STATE: FormData = {
  fullName: '', companyName: '', workEmail: '', phone: '',
  businessType: '', leadType: '', targetGeo: '', monthlyVolume: '',
  deliveryPref: '', budgetRange: '', notes: '',
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function QuoteForm() {
  const [form,      setForm]      = useState<FormData>(INITIAL_STATE)
  const [errors,    setErrors]    = useState<Partial<FormData>>({})
  const [status,    setStatus]    = useState<FormStatus>('idle')
  const [apiError,  setApiError]  = useState('')

  function validate(): boolean {
    const next: Partial<FormData> = {}
    if (!form.fullName.trim())
      next.fullName = 'Full name is required.'
    if (!form.companyName.trim())
      next.companyName = 'Company name is required.'
    if (!form.workEmail.trim())
      next.workEmail = 'Work email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail))
      next.workEmail = 'Please enter a valid email address.'
    if (!form.phone.trim())
      next.phone = 'Phone number is required.'
    else if (!/^[\d\s\-\+\(\)]{7,20}$/.test(form.phone))
      next.phone = 'Please enter a valid phone number.'
    if (!form.leadType)
      next.leadType = 'Please select a lead type.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    setApiError('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName:             form.fullName,
          companyName:          form.companyName,
          workEmail:            form.workEmail,
          phoneNumber:          form.phone,
          businessType:         form.businessType || undefined,
          leadTypeNeeded:       form.leadType,
          targetGeography:      form.targetGeo || undefined,
          monthlyVolumeNeeded:  form.monthlyVolume || undefined,
          budgetRange:          form.budgetRange || undefined,
          notesOrCampaignGoals: form.notes || undefined,
          sourcePage:           'apply',
        }),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json()
        setApiError(data.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setApiError('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center py-14"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
          style={{ background: 'rgba(0,204,238,0.12)', border: '1px solid rgba(0,204,238,0.25)' }}
        >
          <CheckCircle2 size={30} className="text-cyan-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Inquiry Received!</h3>
        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
          Thank you for reaching out. An AJK campaign specialist will contact you within 24 hours to discuss your lead generation goals and pricing.
        </p>
        <button
          onClick={() => { setStatus('idle'); setForm(INITIAL_STATE) }}
          className="mt-7 btn-primary text-sm"
        >
          Submit Another Inquiry
        </button>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Campaign inquiry form"
      className="space-y-5"
    >
      {/* Row 1: Full Name + Company Name */}
      <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-5">
        {([
          { id: 'fullName',    label: 'Full Name',    type: 'text', placeholder: 'Jane Smith',        icon: User,      required: true  },
          { id: 'companyName', label: 'Company Name', type: 'text', placeholder: 'Acme Insurance Co.', icon: Building2, required: true  },
        ] as const).map(({ id, label, type, placeholder, icon: Icon, required }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              {label}
              {required && <span className="text-cyan-400 ml-0.5" aria-hidden="true">*</span>}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                <Icon size={15} aria-hidden="true" />
              </span>
              <input
                id={id}
                name={id}
                type={type}
                value={form[id]}
                onChange={handleChange}
                placeholder={placeholder}
                required={required}
                aria-required={required}
                className={cn('input-dark w-full pl-10', errors[id] && 'border-red-500/60')}
              />
            </div>
            {errors[id] && (
              <p role="alert" className="flex items-center gap-1 mt-1 text-xs text-red-400">
                <AlertCircle size={11} aria-hidden="true" />
                {errors[id]}
              </p>
            )}
          </div>
        ))}
      </motion.div>

      {/* Row 2: Work Email + Phone */}
      <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-5">
        {([
          { id: 'workEmail', label: 'Work Email',   type: 'email', placeholder: 'jane@company.com',  icon: Mail,  required: true  },
          { id: 'phone',     label: 'Phone Number', type: 'tel',   placeholder: '+1 (555) 000-0000', icon: Phone, required: true  },
        ] as const).map(({ id, label, type, placeholder, icon: Icon, required }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              {label}
              {required && <span className="text-cyan-400 ml-0.5" aria-hidden="true">*</span>}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                <Icon size={15} aria-hidden="true" />
              </span>
              <input
                id={id}
                name={id}
                type={type}
                value={form[id]}
                onChange={handleChange}
                placeholder={placeholder}
                required={required}
                aria-required={required}
                className={cn('input-dark w-full pl-10', errors[id] && 'border-red-500/60')}
              />
            </div>
            {errors[id] && (
              <p role="alert" className="flex items-center gap-1 mt-1 text-xs text-red-400">
                <AlertCircle size={11} aria-hidden="true" />
                {errors[id]}
              </p>
            )}
          </div>
        ))}
      </motion.div>

      {/* Business Type */}
      <motion.div variants={fadeInUp}>
        <label htmlFor="businessType" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Business Type
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
            <Building2 size={15} aria-hidden="true" />
          </span>
          <select
            id="businessType"
            name="businessType"
            value={form.businessType}
            onChange={handleChange}
            className="input-dark w-full pl-10"
          >
            <option value="">Select business type&hellip;</option>
            {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </motion.div>

      {/* Lead Type Needed */}
      <motion.div variants={fadeInUp}>
        <label htmlFor="leadType" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Lead Type Needed<span className="text-cyan-400 ml-0.5" aria-hidden="true">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
            <Shield size={15} aria-hidden="true" />
          </span>
          <select
            id="leadType"
            name="leadType"
            value={form.leadType}
            onChange={handleChange}
            required
            className={cn('input-dark w-full pl-10', errors.leadType && 'border-red-500/60')}
          >
            <option value="">Select a lead type&hellip;</option>
            {LEAD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        {errors.leadType && (
          <p role="alert" className="flex items-center gap-1 mt-1 text-xs text-red-400">
            <AlertCircle size={11} aria-hidden="true" />
            {errors.leadType}
          </p>
        )}
      </motion.div>

      {/* Row 3: Target Geography + Monthly Volume */}
      <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="targetGeo" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Target Geography
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
              <MapPin size={15} aria-hidden="true" />
            </span>
            <input
              id="targetGeo"
              name="targetGeo"
              type="text"
              value={form.targetGeo}
              onChange={handleChange}
              placeholder="e.g. Nationwide, TX, FL, NY"
              className="input-dark w-full pl-10"
            />
          </div>
        </div>
        <div>
          <label htmlFor="monthlyVolume" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Monthly Volume Needed
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
              <BarChart3 size={15} aria-hidden="true" />
            </span>
            <input
              id="monthlyVolume"
              name="monthlyVolume"
              type="text"
              value={form.monthlyVolume}
              onChange={handleChange}
              placeholder="e.g. 500 leads / month"
              className="input-dark w-full pl-10"
            />
          </div>
        </div>
      </motion.div>

      {/* Row 4: Delivery Preference + Budget Range */}
      <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="deliveryPref" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Delivery Preference
          </label>
          <select
            id="deliveryPref"
            name="deliveryPref"
            value={form.deliveryPref}
            onChange={handleChange}
            className="input-dark w-full"
          >
            <option value="">Select delivery method&hellip;</option>
            {DELIVERY_PREFS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="budgetRange" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Budget Range
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
              <DollarSign size={15} aria-hidden="true" />
            </span>
            <select
              id="budgetRange"
              name="budgetRange"
              value={form.budgetRange}
              onChange={handleChange}
              className="input-dark w-full pl-10"
            >
              <option value="">Select budget range&hellip;</option>
              {BUDGET_RANGES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Notes / Campaign Goals */}
      <motion.div variants={fadeInUp}>
        <label htmlFor="notes" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Notes / Campaign Goals{' '}
          <span className="text-slate-500 font-normal normal-case">(optional)</span>
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-3.5 text-slate-500 pointer-events-none">
            <MessageSquare size={15} aria-hidden="true" />
          </span>
          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us about your campaign goals, quality requirements, or any specific targeting needs\u2026"
            className="input-dark w-full pl-10 resize-none"
          />
        </div>
      </motion.div>

      {/* API error */}
      {status === 'error' && apiError && (
        <motion.div variants={fadeInUp} role="alert" className="flex items-center gap-2 bg-red-500/10 border border-red-500/25 rounded-lg px-4 py-3 text-red-400 text-sm">
          <AlertCircle size={15} aria-hidden="true" />
          {apiError}
        </motion.div>
      )}

      {/* Submit */}
      <motion.div variants={fadeInUp}>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={cn('btn-primary w-full !py-4 text-base flex items-center justify-center gap-2', status === 'submitting' && 'opacity-75 cursor-not-allowed')}
        >
          {status === 'submitting' ? (
            <>
              <svg
                className="animate-spin w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Submitting&hellip;
            </>
          ) : (
            <>
              Request Lead Pricing
              <Send size={17} aria-hidden="true" />
            </>
          )}
        </button>
        <p className="text-center text-slate-500 text-xs mt-4">
          By submitting you agree to be contacted by an AJK campaign specialist. No spam, ever.
        </p>
      </motion.div>
    </motion.form>
  )
}
