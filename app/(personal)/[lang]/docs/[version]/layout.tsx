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
  console.log('params', params)
  let toc = await getTocs(params.lang, params.version)
  console.log('toc', toc)

  return (
    <div className="flex">
      {toc && (
        <Sidebar data={toc} language={params.lang} version={params.version} />
      )}
      <div className="flex-1 p-10">
        <Suspense>{children}</Suspense>
      </div>
    </div>
  )
}
