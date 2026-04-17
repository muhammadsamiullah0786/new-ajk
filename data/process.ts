export interface ProcessStep {
  step: number
  iconKey: string
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  { step: 1, iconKey: 'ClipboardList', title: 'Define Your Campaign', description: 'Tell us your vertical, target geography, volume goals, and delivery preferences. We build a campaign around your acquisition objectives.' },
  { step: 2, iconKey: 'Send', title: 'Campaign Goes Live', description: 'Our team launches targeted campaigns across digital channels, driving high-intent insurance consumers to verified lead capture flows.' },
  { step: 3, iconKey: 'PhoneCall', title: 'Leads Delivered in Real Time', description: 'Qualified leads are delivered instantly to your CRM, dialler, or preferred endpoint so your team can reach prospects at peak intent.' },
  { step: 4, iconKey: 'BadgeCheck', title: 'Optimise and Scale', description: 'We continuously monitor CPL, contact rate, and conversion data — adjusting targeting and creative to improve performance and grow your volume.' },
]
