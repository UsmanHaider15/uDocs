import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import type { MenuItem, SettingsPayload } from 'types'
import LanugageDropdown from '../Navbar/LanguageDropdown'
import VersionDropdown from '../Navbar/VersionDropdown'
import DocuSearch from 'components/DocSearch'
import { FaGithub } from 'react-icons/fa'

interface NavbarProps {
  data: SettingsPayload
  lang: string
  version: string
}
export default function Navbar(props: NavbarProps) {
  const { data, lang, version } = props
  const menuItems = data?.menuItems || ([] as MenuItem[])

  return (
    <header className="sticky top-0 bg-white z-10 py-2 border-b-2 md:px-0 px-2">
      <nav className="flex mx-auto max-w-screen-xl justify-between">
        <div className="self-center">
          <Link href={`/en`} className="hover:text-blue-500 mr-4">
            Home
          </Link>
          <Link href={`/${lang}/blogs`} className="hover:text-blue-500">
            Blogs
          </Link>
          {menuItems &&
            menuItems.map((menuItem, key) => {
              const href = resolveHref(menuItem?._type, menuItem?.slug)
              if (!href) {
                return null
              }
              return (
                <div
                  key={key}
                  className="hidden border-0 border-solid border-stone-900"
                >
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
            })}
        </div>

        <div className="flex flex-row-reverse">
          <div className="mr-2">
            <DocuSearch />
          </div>
          <div className="mx-2 self-center">
            <Link
              className="hover:text-blue-500 cursor-pointer"
              href="https://github.com/UsmanHaider15/uDocs"
              target="_blank"
            >
              <FaGithub size={22} />
            </Link>
          </div>
          <div className="mr-2 self-center">
            <LanugageDropdown lang={lang} />
          </div>
          <div className="mr-2 self-center">
            <VersionDropdown lang={lang} version={version} />
          </div>
        </div>
      </nav>
    </header>
  )
}
