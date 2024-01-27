import React, { FC } from 'react'
import { TOCLink } from 'types'
import NavigationLink from './NavigationLink'

interface SidebarProps {
  toc: TOCLink
  language: string
  version: string
}

const Sidebar: FC<SidebarProps> = ({ toc, language, version }) => {
  return (
    <div className="md:sticky md:top-[72px] md:h-[calc(100vh-121px)] md:w-[284px] md:flex md:shrink-0 md:flex-col md:justify-between">
      {/* Sidebar */}
      <aside className="bg-white w-full md:w-64 min-h-screen border-r border-gray-200 p-2">
        {toc.links &&
          toc.links.map((link) => (
            <NavigationLink
              key={link.slug}
              link={link}
              language={language}
              version={version}
            />
          ))}
      </aside>
    </div>
  )
}

export default Sidebar
