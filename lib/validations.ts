import { z } from 'zod'

export const leadSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  companyName: z.string().min(1, 'Company name is required'),
  workEmail: z.string().email('Valid work email is required'),
  phoneNumber: z.string().min(7, 'Phone number is required').max(30),
  businessType: z.string().optional(),
  leadTypeNeeded: z.string().min(1, 'Lead type is required'),
  targetGeography: z.string().optional(),
  monthlyVolumeNeeded: z.string().optional(),
  budgetRange: z.string().optional(),
  notesOrCampaignGoals: z.string().max(2000).optional(),
  sourcePage: z.string().optional(),
})

// Length thresholds are mirrored in components/ContactContent.tsx so the
// inline frontend validation matches what the API will accept. Keep them in
// sync if you change either side.
export const CONTACT_MIN_NAME = 2
export const CONTACT_MIN_SUBJECT = 5
export const CONTACT_MIN_MESSAGE = 10

export const contactSchema = z.object({
  name: z.string().trim().min(CONTACT_MIN_NAME, `Name must be at least ${CONTACT_MIN_NAME} characters`),
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z.string().trim().optional(),
  subject: z.string().trim().min(CONTACT_MIN_SUBJECT, `Subject must be at least ${CONTACT_MIN_SUBJECT} characters`),
  message: z.string().trim().min(CONTACT_MIN_MESSAGE, `Message must be at least ${CONTACT_MIN_MESSAGE} characters`),
  honeypot: z.string().optional(),
  formStartAt: z.string().optional().refine(
    (value) => !value || !Number.isNaN(Date.parse(value)),
    { message: 'Invalid start timestamp' },
  ),
  submittedAt: z.string().optional().refine(
    (value) => !value || !Number.isNaN(Date.parse(value)),
    { message: 'Invalid submitted timestamp' },
  ),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const updateLeadStatusSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'CLOSED', 'SPAM']),
})

export type LeadInput = z.infer<typeof leadSchema>
