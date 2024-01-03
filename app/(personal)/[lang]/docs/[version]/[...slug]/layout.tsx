import Sidebar from 'components/pages/home/Sidebar'
import { getTocs, token } from 'lib/sanity.fetch'
import { Suspense } from 'react'

export default async function DocsLayout({
  params,
  children, // will be a page or nested layout
}: {
  params: { lang: string; version: string }
  children: React.ReactNode
}) {
  let toc = await getTocs(params.lang, params.version)

  return (
    <div className="relative mx-auto max-w-screen-xl px-4 py-10 md:flex md:flex-row md:py-10">
      <div className="sticky top-[121px] hidden h-[calc(100vh-121px)] w-[284px] md:flex md:shrink-0 md:flex-col md:justify-between">
        {toc && (
          <Sidebar
            links={toc.links}
            language={params.lang}
            version={params.version}
          />
        )}
      </div>
      <Suspense>{children}</Suspense>
    </div>
  )
}
