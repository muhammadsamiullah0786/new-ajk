export interface TeamMember {
  /** URL slug + React key. Stable identifier. */
  id: string
  /** Full name including any post-nominal credentials. */
  name: string
  /** Job title shown under the name. */
  role: string
  /** Path under /public. Falls back to initials avatar if the file is missing. */
  image: string
}

/**
 * Source of truth for the "Meet the Team" sections (About + Home preview).
 * Order is intentional: leadership first, then operational managers.
 */
export const team: TeamMember[] = [
  {
    id: 'khurshid-khan',
    name: 'Khurshid Khan, MBA, PMP, CISA',
    role: 'President & CEO',
    image: '/team/khurshid-khan.jpg',
  },
  {
    id: 'shazia-khan',
    name: 'Shazia Khan',
    role: 'Operations Manager',
    image: '/team/shazia-khan.jpg',
  },
  {
    id: 'mahad-naseer',
    name: 'Mahad Naseer',
    role: 'Business Development Manager',
    image: '/team/mahad-naseer.jpg',
  },
  {
    id: 'owas-khurshid',
    name: 'Owas Khurshid',
    role: 'Account Manager',
    image: '/team/owas-khurshid.jpg',
  },
  {
    id: 'haris-khurshid',
    name: 'Haris Khurshid',
    role: 'Marketing Manager',
    image: '/team/haris-khurshid.jpg',
  },
  {
    id: 'elizabeth-senechal',
    name: 'Elizabeth Senechal',
    role: 'IT Manager',
    image: '/team/elizabeth-senechal.jpg',
  },
]
