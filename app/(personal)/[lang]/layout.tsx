import 'styles/index.css'

import { Footer } from 'components/global/Footer'
import { Navbar } from 'components/global/Navbar'
import { PreviewBanner } from 'components/preview/PreviewBanner'
import IntroTemplate from 'intro-template'
import { getCategories, token } from 'lib/sanity.fetch'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { Suspense } from 'react'
import Sidebar from 'components/pages/home/Sidebar'
import { Category } from 'types'

const PreviewProvider = dynamic(
  () => import('components/preview/PreviewProvider'),
)

type Link = {
  title: string
  slug: string
}

type GroupedLink = {
  title: string
  slug: string
  links: Link[]
}

// Recursive function to group links
function groupLinks(links: Link[], parentSlug = ''): GroupedLink[] {
  return links
    .filter(
      (link) =>
        link.slug.startsWith(parentSlug) &&
        link.slug.slice(parentSlug.length).split('/').length === 1,
    )
    .map((link) => ({
      title: link.title,
      slug: link.slug,
      links: groupLinks(links, link.slug + '/'),
    }))
}

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const isDraftMode = draftMode().isEnabled
  let groupedLinks: GroupedLink[] = []
  let categories = await getCategories()
  if (categories) {
    categories = categories.map((category) => ({
      ...category,
      slug: category.slug.replace('docs/', ''),
    }))
    groupedLinks = groupLinks(categories)
  }

  const layout = (
    <div className="flex min-h-screen flex-col bg-white text-black">
      {isDraftMode && <PreviewBanner />}
      <Suspense>
        <Navbar />
      </Suspense>
      <div className="mt-20 flex-grow px-4 md:px-16 lg:px-32">
        <div className="flex">
          <Sidebar groupedLinks={groupedLinks} />
          <div className="flex-1 p-10">
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
