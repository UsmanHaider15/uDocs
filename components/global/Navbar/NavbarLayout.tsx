import Search from 'components/autocomplete/Search'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import type { MenuItem, SettingsPayload } from 'types'
import LanugageDropdown from './LanguageDropdown'
import VersionDropdown from './VersionDropdown'

interface NavbarProps {
  data: SettingsPayload
  lang: string
  version: string
}
export default function Navbar(props: NavbarProps) {
  const { data, lang, version } = props
  const menuItems = data?.menuItems || ([] as MenuItem[])

  return (
    <header className="sticky top-0">
      <nav className="flex justify-end border-0 border-solid border-stone-900 bg-white">
        {/* {menuItems &&
          menuItems.map((menuItem, key) => {
            const href = resolveHref(menuItem?._type, menuItem?.slug)
            if (!href) {
              return null
            }
            return (
              <div className="hidden border-0 border-solid border-stone-900">
                <Link
                  key={key}
                  className={`text-lg hover:text-black md:text-xl ${
                    menuItem?._type === 'home'
                      ? 'font-extrabold text-black'
                      : 'text-gray-600'
                  }`}
                  href={href}
                >
                  {menuItem.title}
                </Link>{' '}
              </div>
            )
          })} */}

        <div className="mr-2">
          <Search />
        </div>
        <div className="mr-2">
          <LanugageDropdown lang={lang} />
        </div>
        <div className="mr-2">
          <VersionDropdown lang={lang} version={version} />
        </div>
      </nav>
    </header>
  )
}
