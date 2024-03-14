import 'styles/index.css'

import { Footer } from 'components/global/Footer'
import { PreviewBanner } from 'components/preview/PreviewBanner'
import IntroTemplate from 'intro-template'
import { token } from 'lib/sanity.fetch'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { Suspense } from 'react'
import { Navbar } from 'components/global/Navbar'

const PreviewProvider = dynamic(
  () => import('components/preview/PreviewProvider'),
)

export default async function IndexRoute({
  params,
  children,
}: {
  params: { lang: string }
  children: React.ReactNode
}) {
  const isDraftMode = draftMode().isEnabled

  const layout = (
    <div className="flex min-h-screen flex-col text-light-text dark:text-dark-text bg-light-base dark:bg-dark-base">
      {isDraftMode && <PreviewBanner />}
      <Suspense>
        <Navbar lang={params.lang} version={'v1'} />
      </Suspense>
      <div>
        <div className="flex">
          <div className="flex-1">
            <Suspense>{children}</Suspense>
          </div>
        </div>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
      <IntroTemplate />
    </div>
  )

  if (isDraftMode) {
    return <PreviewProvider token={token!}>{layout}</PreviewProvider>
  }

  return layout
}
