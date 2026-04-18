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

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(10, 'Message is required'),
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
