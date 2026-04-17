export interface Partner {
  id: string
  name: string
  shortName: string
  description: string
}

export const partners: Partner[] = [
  { id: 'medicare-buyers',    name: 'Medicare Advertisers',      shortName: 'Medicare',         description: 'MA, Supplement & Part D buyers'     },
  { id: 'final-expense',      name: 'Final Expense Agencies',    shortName: 'Final Expense',    description: 'Senior life & burial insurance'        },
  { id: 'aca-aggregators',    name: 'ACA / Health Aggregators',  shortName: 'ACA / Health',     description: 'Marketplace & off-exchange health'     },
  { id: 'auto-carriers',      name: 'Auto Insurance Buyers',     shortName: 'Auto Insurance',   description: 'P&C carriers and auto agencies'        },
  { id: 'home-buyers',        name: 'Homeowners Buyers',         shortName: 'Home Insurance',   description: 'Property & casualty advertisers'       },
  { id: 'business-buyers',    name: 'Commercial Lines Buyers',   shortName: 'Commercial',       description: 'Business & workers comp lead buyers'   },
  { id: 'live-transfers',     name: 'Live Transfer Partners',    shortName: 'Live Transfers',   description: 'Inbound call & warm transfer buyers'   },
  { id: 'mgaS',               name: 'MGAs & Aggregators',        shortName: 'MGA / Agg',        description: 'National and regional aggregators'     },
  { id: 'performance',        name: 'Performance Marketers',     shortName: 'Performance',      description: 'CPL and CPA campaign advertisers'      },
  { id: 'agencies',           name: 'Insurance Agencies',        shortName: 'Agencies',         description: 'Independent & captive agency buyers'   },
]
