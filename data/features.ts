export interface Feature {
  id: string
  iconKey: string
  title: string
  description: string
}

export const features: Feature[] = [
  { id: 'high-intent-leads', iconKey: 'Users', title: 'High-Intent Lead Supply', description: 'We deliver insurance leads from consumers actively seeking coverage — ensuring your team contacts prospects who are ready to engage and convert.' },
  { id: 'vertical-expertise', iconKey: 'Shield', title: 'Deep Vertical Expertise', description: 'From Medicare and Final Expense to ACA, Auto, and Home — we specialize in the insurance verticals that drive the highest advertiser ROI.' },
  { id: 'fast-delivery', iconKey: 'Zap', title: 'Real-Time Lead Delivery', description: 'Leads are delivered in real time via API, CRM integration, or secure portal — so your team can reach prospects at peak intent.' },
  { id: 'campaign-optimization', iconKey: 'Building2', title: 'Campaign Optimization', description: 'We continuously optimize targeting, copy, and bidding to improve CPL, increase lead quality, and scale campaign performance for your team.' },
  { id: 'scalable-growth', iconKey: 'HeartHandshake', title: 'Scalable Lead Volume', description: 'Whether you need 50 leads a week or 5,000, our infrastructure scales with your acquisition goals across all major insurance verticals.' },
  { id: 'performance-reporting', iconKey: 'TrendingUp', title: 'Transparent Reporting', description: 'Every campaign comes with full performance visibility — CPL, contact rate, conversion data, and quality metrics — so you always know what is working.' },
]
