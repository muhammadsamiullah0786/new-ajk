export interface Testimonial {
  id: string
  name: string
  location: string
  initials: string
  rating: number
  quote: string
  service: string
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Marcus T.',
    location: 'Director of Growth, Dallas Agency',
    initials: 'MT',
    rating: 5,
    quote:
      'AJK dramatically improved our Medicare lead quality within the first two weeks. Contact rates jumped and our CPL dropped by over 20%. Their team communicates clearly and delivers consistently.',
    service: 'Medicare Leads',
  },
  {
    id: '2',
    name: 'Sarah R.',
    location: 'VP Acquisition, Health Aggregator',
    initials: 'SR',
    rating: 5,
    quote:
      'We have worked with a lot of lead vendors. AJK stands out for their transparency and follow-through. Our ACA campaign scaled from 200 to 800 leads per week with no drop in quality.',
    service: 'ACA Leads',
  },
  {
    id: '3',
    name: 'James K.',
    location: 'Owner, Final Expense Agency',
    initials: 'JK',
    rating: 5,
    quote:
      'The final expense leads AJK delivers are genuinely high-intent. Our agents are spending less time on dead ends and closing at a rate we have not seen with any other vendor.',
    service: 'Final Expense Leads',
  },
  {
    id: '4',
    name: 'Diana M.',
    location: 'Head of Marketing, Regional Carrier',
    initials: 'DM',
    rating: 5,
    quote:
      'Campaign launch was smooth and the onboarding was faster than we expected. AJK hit our target CPL within the first month and has been optimising upward ever since.',
    service: 'Campaign Strategy',
  },
  {
    id: '5',
    name: 'Robert A.',
    location: 'Operations Lead, National Buyer',
    initials: 'RA',
    rating: 5,
    quote:
      'Reliable delivery, strong lead intent signals, and a team that actually answers the phone. AJK has become a core part of our customer acquisition strategy across three verticals.',
    service: 'Auto & Home Leads',
  },
  {
    id: '6',
    name: 'Linda W.',
    location: 'Performance Manager, Insurance Aggregator',
    initials: 'LW',
    rating: 5,
    quote:
      'We switched to AJK for our homeowners vertical and the CPA improvement was immediate. Their geo-targeting and quality filters are best-in-class. Would recommend to any insurance buyer.',
    service: 'Homeowners Leads',
  },
]
