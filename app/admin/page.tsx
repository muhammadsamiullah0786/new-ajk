'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, RefreshCw, ChevronDown, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CLOSED' | 'SPAM'

interface Lead {
  id: string
  fullName: string
  companyName: string
  workEmail: string
  phoneNumber: string
  leadTypeNeeded: string
  businessType: string | null
  status: LeadStatus
  sourcePage: string
  createdAt: string
}

const STATUS_OPTIONS: LeadStatus[] = ['NEW', 'CONTACTED', 'QUALIFIED', 'CLOSED', 'SPAM']

const STATUS_COLORS: Record<LeadStatus, string> = {
  NEW:        'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
  CONTACTED:  'bg-blue-500/15 text-blue-400 border-blue-500/25',
  QUALIFIED:  'bg-green-500/15 text-green-400 border-green-500/25',
  CLOSED:     'bg-slate-500/15 text-slate-400 border-slate-500/25',
  SPAM:       'bg-red-500/15 text-red-400 border-red-500/25',
}

const FILTERS: { label: string; value: string }[] = [
  { label: 'All', value: '' },
  ...STATUS_OPTIONS.map(s => ({ label: s.charAt(0) + s.slice(1).toLowerCase(), value: s })),
]

export default function AdminDashboard() {
  const router = useRouter()
  const [leads, setLeads]       = useState<Lead[]>([])
  const [loading, setLoading]   = useState(true)
  const [filter, setFilter]     = useState('')
  const [updating, setUpdating] = useState<string | null>(null)

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    try {
      const url = filter ? `/api/admin/leads?status=${filter}` : '/api/admin/leads'
      const res = await fetch(url)
      if (res.status === 401) { router.push('/admin/login'); return }
      setLeads(await res.json())
    } finally {
      setLoading(false)
    }
  }, [filter, router])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  async function handleStatusChange(id: string, status: LeadStatus) {
    setUpdating(id)
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
    } finally {
      setUpdating(null)
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const counts = leads.reduce((acc, l) => {
    acc[l.status] = (acc[l.status] ?? 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <header className="border-b border-white/8 bg-[#04091C]/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white tracking-tight">AJK Admin</span>
            <span className="text-slate-500 text-sm">/ Leads</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchLeads}
              title="Refresh"
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <RefreshCw size={15} className={cn(loading && 'animate-spin')} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {STATUS_OPTIONS.map(s => (
            <div key={s} className="bg-white/4 border border-white/8 rounded-xl p-4">
              <p className="text-xs text-slate-400 uppercase tracking-wider">{s}</p>
              <p className="text-2xl font-bold text-white mt-1">{counts[s] ?? 0}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                filter === f.value
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white border border-white/8',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-slate-500">
              <RefreshCw size={18} className="animate-spin mr-2" /> Loading…
            </div>
          ) : leads.length === 0 ? (
            <div className="text-center py-20 text-slate-500 text-sm">No leads found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8 text-left">
                    {['Name', 'Company', 'Email', 'Lead Type', 'Status', 'Date', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, idx) => (
                    <tr
                      key={lead.id}
                      className={cn(
                        'border-b border-white/5 hover:bg-white/3 transition-colors',
                        idx === leads.length - 1 && 'border-b-0',
                      )}
                    >
                      <td className="px-4 py-3 font-medium text-white whitespace-nowrap">{lead.fullName}</td>
                      <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{lead.companyName}</td>
                      <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{lead.workEmail}</td>
                      <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{lead.leadTypeNeeded}</td>
                      <td className="px-4 py-3">
                        <div className="relative flex items-center">
                          <span className={cn('px-2 py-0.5 rounded-md text-xs border', STATUS_COLORS[lead.status])}>
                            {lead.status}
                          </span>
                          <div className="relative ml-2">
                            <select
                              value={lead.status}
                              disabled={updating === lead.id}
                              onChange={e => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                              className="appearance-none bg-white/6 border border-white/10 rounded-md pl-2 pr-6 py-0.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/50 cursor-pointer disabled:opacity-50"
                            >
                              {STATUS_OPTIONS.map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                            <ChevronDown size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap text-xs">
                        {new Date(lead.createdAt).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => router.push(`/admin/leads/${lead.id}`)}
                          className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <Eye size={13} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-slate-600 text-xs text-right">
          Total: {leads.length} leads
        </p>
      </main>
    </div>
  )
}
