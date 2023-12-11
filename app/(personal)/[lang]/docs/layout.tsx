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
    <div className="mt-20 flex-grow px-4 md:px-16 lg:px-32">
      <div className="flex">
        {toc && <Sidebar groupedLinks={toc} />}
        <div className="flex-1 p-10">
          <Suspense>{children}</Suspense>
        </div>
      </div>
    </div>
  )
}
