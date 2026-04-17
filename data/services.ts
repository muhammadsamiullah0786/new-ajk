export interface Service {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  iconKey: string
  benefits: string[]
  color: string
  iconColor: string
  slug: string
}

export const services: Service[] = [
  {
    id: 'medicare',
    title: 'Medicare Lead Generation',
    shortDescription: 'High-intent Medicare leads for Part A, Part B, Medicare Advantage, and Supplement buyers.',
    fullDescription: 'We generate qualified Medicare leads for insurance advertisers, agencies, and aggregators targeting seniors actively researching coverage options. Each lead is sourced from consumers showing real buying intent across Medicare Advantage, Medigap, and Part D — delivered in real time to maximise speed-to-contact and conversion rates.',
    iconKey: 'Heart',
    benefits: [
      'Medicare Advantage, Supplement, and Part D leads',
      'Age- and geography-qualified targeting',
      'Real-time delivery via API or CRM',
      'Exclusive and shared lead options',
      'CPL and quality optimisation built in',
    ],
    color: 'bg-rose-50',
    iconColor: 'text-rose-500',
    slug: 'medicare-leads',
  },
  {
    id: 'final-expense',
    title: 'Final Expense Lead Generation',
    shortDescription: 'Qualified final expense leads for agents and carriers targeting seniors aged 50–85.',
    fullDescription: 'AJK delivers final expense leads with verified age, geography, and intent signals — sourced from consumers actively seeking whole life and burial insurance coverage. Our campaigns are optimised for contact rate and conversion, helping advertisers and agents scale final expense acquisition cost-effectively.',
    iconKey: 'FileText',
    benefits: [
      'Age-filtered leads targeting 50–85 demographic',
      'High-intent, form-submitted prospects',
      'Exclusive or shared delivery models',
      'Geo-targeted by state, county, or ZIP',
      'Consistent daily volume with quality caps',
    ],
    color: 'bg-purple-50',
    iconColor: 'text-purple-500',
    slug: 'final-expense-leads',
  },
  {
    id: 'aca',
    title: 'ACA / Health Insurance Leads',
    shortDescription: 'Verified ACA and individual health insurance leads for agents, aggregators, and carriers.',
    fullDescription: 'We supply high-intent ACA and individual health plan leads during open enrollment and special enrollment periods. Our targeting stack ensures leads match buyer profiles your team can convert — with filtering by household size, income band, state, and coverage status to improve your cost per acquisition.',
    iconKey: 'Activity',
    benefits: [
      'ACA marketplace and off-exchange health leads',
      'Income and household filtering available',
      'SEP and OEP campaign support',
      'Real-time ping/post and API delivery',
      'CPA and CPL optimisation on demand',
    ],
    color: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    slug: 'aca-health-leads',
  },
  {
    id: 'auto',
    title: 'Auto Insurance Lead Generation',
    shortDescription: 'In-market auto insurance leads for carriers, MGAs, and independent agencies.',
    fullDescription: 'Our auto insurance lead campaigns reach consumers actively shopping for new or renewal vehicle coverage. We drive intent-verified leads through targeted digital campaigns, applying vehicle type, driver profile, and geography filters so your agents spend time on the highest-value prospects.',
    iconKey: 'Car',
    benefits: [
      'New and renewal auto insurance shoppers',
      'Vehicle type and driver profile filters',
      'Nationwide or state-specific delivery',
      'Exclusive leads for higher close rates',
      'Real-time CRM and dialler integration',
    ],
    color: 'bg-blue-50',
    iconColor: 'text-blue-500',
    slug: 'auto-insurance-leads',
  },
  {
    id: 'home',
    title: 'Homeowners Insurance Leads',
    shortDescription: 'Qualified homeowner leads for carriers and agencies seeking property insurance buyers.',
    fullDescription: 'We generate homeowners insurance leads from consumers actively comparing property coverage — new home buyers, refinancers, and renewal shoppers. Targeting by home value, geography, and ownership status ensures your team is working the most relevant prospects for your book of business.',
    iconKey: 'Home',
    benefits: [
      'New purchase and renewal homeowner leads',
      'Home value and geography targeting',
      'Bundling opportunities with auto leads',
      'Flexible shared or exclusive delivery',
      'Volume scalable by region or national',
    ],
    color: 'bg-teal-50',
    iconColor: 'text-teal-500',
    slug: 'homeowners-leads',
  },
  {
    id: 'business',
    title: 'Business Insurance Leads',
    shortDescription: 'Qualified small business insurance leads for commercial lines carriers and agencies.',
    fullDescription: 'We generate business insurance leads from small and mid-size business owners actively seeking commercial coverage — including general liability, BOP, and commercial property. Our targeting by industry, business size, and geography ensures your sales team receives the most relevant commercial prospects available.',
    iconKey: 'Briefcase',
    benefits: [
      'BOP, GL, and commercial property lead types',
      'Industry and business-size targeting',
      'Nationwide or state-specific campaigns',
      'Real-time delivery to CRM or dialler',
      'Scalable volume for commercial lines teams',
    ],
    color: 'bg-indigo-50',
    iconColor: 'text-indigo-500',
    slug: 'business-leads',
  },
  {
    id: 'workers-comp',
    title: "Workers' Compensation Leads",
    shortDescription: "In-market workers' comp leads for carriers, brokers, and commercial lines agencies.",
    fullDescription: "We source workers' compensation leads from business owners and HR decision-makers actively researching coverage for employee injury liability and state compliance. Leads are filtered by industry classification, employee count, and geography to match your campaign's acquisition criteria.",
    iconKey: 'HardHat',
    benefits: [
      'Business owner and HR decision-maker leads',
      'Industry and employee count filtering',
      'State compliance-driven demand targeting',
      'Exclusive or shared delivery options',
      'Quality scoring and intent verification',
    ],
    color: 'bg-orange-50',
    iconColor: 'text-orange-500',
    slug: 'workers-comp-leads',
  },
  {
    id: 'live-transfers',
    title: 'Live Transfers & Inbound Calls',
    shortDescription: 'Pre-qualified inbound insurance calls and live transfers delivered to your agents in real time.',
    fullDescription: 'Beyond form leads, AJK delivers live transfer and inbound call campaigns for insurance advertisers who want warm, pre-screened prospects connected directly to their sales floor. Every call is intent-verified before transfer, improving close rates and reducing handle time across all major verticals.',
    iconKey: 'Activity',
    benefits: [
      'Medicare, ACA, auto, and life live transfers',
      'Pre-qualification scripting included',
      'Real-time routing to your agents',
      'Call recording and compliance support',
      'Volume and quality reporting dashboard',
    ],
    color: 'bg-amber-50',
    iconColor: 'text-amber-500',
    slug: 'live-transfers',
  },
]
