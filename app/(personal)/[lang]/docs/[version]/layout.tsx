import Sidebar from 'components/pages/home/Sidebar'
import { getTocs, token } from 'lib/sanity.fetch'
import { Suspense } from 'react'
import { Navbar } from 'components/global/Navbar'
import { Footer } from 'components/global/Footer'

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
      <Suspense>
        <Navbar lang={params.lang} version={params.version} />
      </Suspense>
      <div className="max-w-screen-xl mx-auto flex">
        {toc && (
          <Sidebar toc={toc} language={params.lang} version={params.version} />
        )}
        <Suspense>{children}</Suspense>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </div>
  )
}
