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
  links: Link[]
}

function buildLinkHierarchy(
  items: Array<{ title: string; slug: string }>,
): Link[] {
  const root: Link[] = []

  for (const item of items) {
    const parts = item.slug.split('/')
    let currentLevel = root
    let currentPath = ''

    for (const [index, part] of parts.entries()) {
      // Update the current path
      currentPath = index === 0 ? part : `${currentPath}/${part}`

      // Find or create the node at the current level
      let node = currentLevel.find((link) => link.slug === currentPath)
      if (!node) {
        node = { title: '', slug: currentPath, links: [] }
        currentLevel.push(node)
      }

      // If it's the last part, update the title
      if (index === parts.length - 1) {
        node.title = item.title
      }

      // Move to the next level
      currentLevel = node.links
    }
  }

  return root
}

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const isDraftMode = draftMode().isEnabled
  let groupedLinks: Link[] = []
  let categories = await getCategories()
  if (categories) {
    categories = categories.map((category) => ({
      ...category,
      slug: category.slug,
    }))
    groupedLinks = buildLinkHierarchy(categories)
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
