import Sidebar from 'components/pages/home/Sidebar'
import { getTocs, token } from 'lib/sanity.fetch'
import { Suspense } from 'react'

export default async function DocsLayout({
  params,
  children, // will be a page or nested layout
}: {
  params: { lang: string }
  children: React.ReactNode
}) {
  let toc = await getTocs(params.lang)

  return (
    <div className="flex">
      {toc && <Sidebar groupedLinks={toc} languag={params.lang} />}
      <div className="flex-1 p-10">
        <Suspense>{children}</Suspense>
      </div>
    </div>
  )
}
