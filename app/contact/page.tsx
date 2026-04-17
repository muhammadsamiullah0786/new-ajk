import type { Metadata } from 'next'
import ContactContent from '@/components/ContactContent'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Reach out to AJK to discuss lead generation campaigns, delivery options, and partnership opportunities. Our team responds within 24 hours.',
}

export default function ContactPage() {
  return (
    <>
      <ContactContent />
      <CTASection
        title="Ready to Scale Your Lead Campaigns?"
        subtitle="Let's talk about your targeting needs, lead volume, and campaign goals. We'll get you up and running fast."
        primaryLabel="Request Lead Pricing"
        primaryHref="/apply"
        secondaryLabel="View Our Services"
        secondaryHref="/services"
      />
    </>
  )
}
