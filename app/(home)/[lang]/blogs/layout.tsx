import { Suspense } from 'react'

export default async function DocsLayout({
  params,
  children, // will be a page or nested layout
}: {
  params: { lang: string; version: string }
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto md:py-4 min-h-screen">
      <Suspense>{children}</Suspense>
    </div>
  )
}
