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
    <div>
      <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto md:py-4">
        {toc && (
          <Sidebar toc={toc} language={params.lang} version={params.version} />
        )}
        <Suspense>{children}</Suspense>
      </div>
    </div>
  )
}
