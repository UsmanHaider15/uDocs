import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import type { MenuItem, SettingsPayload } from 'types'
import LanugageDropdown from './LanguageDropdown'
import DocuSearch from 'components/DocSearch'
import { FaGithub } from 'react-icons/fa'
import Image from 'next/image'

interface NavbarProps {
  data: SettingsPayload
  lang: string
  version: string
}
export default function Navbar(props: NavbarProps) {
  const { data, lang } = props
  const menuItems = data?.menuItems || ([] as MenuItem[])

  return (
    <header className="sticky top-0 bg-white z-10 py-2 shadow-sm md:px-0 px-2">
      <nav className="flex mx-auto max-w-screen-xl justify-between">
        <div className="flex items-center">
          <Link href={`/${lang}`} className="hover:text-blue-500 mr-4">
            <Image width={30} height={30} src="/favicon.ico" alt="Home" />
          </Link>
          <Link
            href={`/en/docs/v1/introduction`}
            className="hover:text-blue-500 mr-4"
          >
            Docs
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
          <div className="mr-2 self-center">
            <FaGithub
              size={22}
              className="hover:text-blue-500 cursor-pointer"
            />
          </div>
          <div className="mr-2 self-center">
            <LanugageDropdown lang={lang} />
          </div>
        </div>
      </nav>
    </header>
  )
}
