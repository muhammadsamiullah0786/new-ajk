'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CLOSED' | 'SPAM'

interface Lead {
  id: string
  fullName: string
  companyName: string
  workEmail: string
  phoneNumber: string
  businessType: string | null
  leadTypeNeeded: string
  targetGeography: string | null
  monthlyVolumeNeeded: string | null
  budgetRange: string | null
  notesOrCampaignGoals: string | null
  sourcePage: string
  status: LeadStatus
  createdAt: string
  updatedAt: string
}

const STATUS_OPTIONS: LeadStatus[] = ['NEW', 'CONTACTED', 'QUALIFIED', 'CLOSED', 'SPAM']

const STATUS_COLORS: Record<LeadStatus, string> = {
  NEW:        'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
  CONTACTED:  'bg-blue-500/15 text-blue-400 border-blue-500/25',
  QUALIFIED:  'bg-green-500/15 text-green-400 border-green-500/25',
  CLOSED:     'bg-slate-500/15 text-slate-400 border-slate-500/25',
  SPAM:       'bg-red-500/15 text-red-400 border-red-500/25',
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null
  return (
    <div>
      <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">{label}</dt>
      <dd className="text-white text-sm">{value}</dd>
    </div>
  )
}

export default function LeadDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [lead, setLead]         = useState<Lead | null>(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetch(`/api/admin/leads/${id}`)
      .then(async res => {
        if (res.status === 401) { router.push('/admin/login'); return }
        if (!res.ok) { setError('Lead not found'); return }
        setLead(await res.json())
      })
      .catch(() => setError('Failed to load lead'))
      .finally(() => setLoading(false))
  }, [id, router])

  async function handleStatusChange(status: LeadStatus) {
    if (!lead) return
    setUpdating(true)
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) setLead(prev => prev ? { ...prev, status } : prev)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center text-slate-400 text-sm">
        Loading…
      </div>
    )
  }

  if (error || !lead) {
    return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center gap-4">
        <p className="text-red-400">{error || 'Lead not found'}</p>
        <button onClick={() => router.push('/admin')} className="btn-primary text-sm">
          Back to Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <header className="border-b border-white/8 bg-[#04091C]/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <button
            onClick={() => router.push('/admin')}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={15} /> Back
          </button>
          <span className="text-slate-600">|</span>
          <span className="text-white font-semibold truncate">{lead.fullName}</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Status bar */}
        <div className="flex items-center justify-between flex-wrap gap-3 bg-white/4 border border-white/8 rounded-xl px-5 py-4">
          <div className="flex items-center gap-3">
            <span className={cn('px-2.5 py-1 rounded-md text-xs font-semibold border', STATUS_COLORS[lead.status])}>
              {lead.status}
            </span>
            <span className="text-slate-400 text-xs">
              Submitted {new Date(lead.createdAt).toLocaleString('en-US')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-xs">Update status:</span>
            <div className="relative">
              <select
                value={lead.status}
                disabled={updating}
                onChange={e => handleStatusChange(e.target.value as LeadStatus)}
                className="appearance-none bg-white/8 border border-white/15 rounded-lg pl-3 pr-7 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 cursor-pointer disabled:opacity-50"
              >
                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white/4 border border-white/8 rounded-2xl p-6">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-5">Contact Information</h2>
          <dl className="grid sm:grid-cols-2 gap-5">
            <Field label="Full Name"    value={lead.fullName} />
            <Field label="Company Name" value={lead.companyName} />
            <Field label="Work Email"   value={lead.workEmail} />
            <Field label="Phone Number" value={lead.phoneNumber} />
            <Field label="Business Type" value={lead.businessType} />
          </dl>
        </div>

        <div className="bg-white/4 border border-white/8 rounded-2xl p-6">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-5">Campaign Details</h2>
          <dl className="grid sm:grid-cols-2 gap-5">
            <Field label="Lead Type Needed"     value={lead.leadTypeNeeded} />
            <Field label="Target Geography"     value={lead.targetGeography} />
            <Field label="Monthly Volume Needed" value={lead.monthlyVolumeNeeded} />
            <Field label="Budget Range"          value={lead.budgetRange} />
            <Field label="Source Page"           value={lead.sourcePage} />
          </dl>
        </div>

        {lead.notesOrCampaignGoals && (
          <div className="bg-white/4 border border-white/8 rounded-2xl p-6">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Notes / Campaign Goals</h2>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{lead.notesOrCampaignGoals}</p>
          </div>
        )}
      </main>
    </div>
  )
}
