import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin – AJK Insurance',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#020c1b]">
      {children}
    </div>
  )
}
