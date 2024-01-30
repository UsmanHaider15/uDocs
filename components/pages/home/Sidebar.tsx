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
    <div className="flex-none w-56 sticky top-20 h-screen">
      {/* Sidebar */}
      <aside>
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
