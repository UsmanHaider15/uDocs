import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import type { MenuItem, SettingsPayload } from 'types'
import LanguageDropdown from './LanguageDropdown'
import DocuSearch from 'components/DocSearch'
import { FaGithub } from 'react-icons/fa'
import Image from 'next/image'
import ThemeSwitcher from './ThemeSwitcher'

interface NavbarProps {
  data: SettingsPayload
  lang: string
  version: string
}
export default function Navbar(props: NavbarProps) {
  const { data, lang } = props
  const menuItems = data?.menuItems || ([] as MenuItem[])

  return (
    <header className="sticky top-0 bg-gray-50 dark:bg-gray-900 z-10 py-2 shadow-sm md:px-0 px-2">
      <nav className="flex mx-auto max-w-screen-xl justify-between">
        <div className="flex items-center">
          <Link href={`/${lang}`} className="hover:text-primary mr-4">
            <Image width={30} height={30} src="/favicon.ico" alt="Home" />
          </Link>
          <Link
            href={`/en/docs/v1/introduction`}
            className="hover:text-primary mr-4"
          >
            Docs
          </Link>
          <Link href={`/${lang}/blogs`} className="hover:text-primary">
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
                    className={`text-lg hover:text-primary md:text-xl ${
                      menuItem?._type === 'home'
                        ? 'font-extrabold text-gray-900 dark:text-gray-100'
                        : 'text-gray-600 dark:text-gray-400'
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
          <div className="self-center">
            <ThemeSwitcher />
          </div>
          <div className="mr-2 self-center">
            <FaGithub size={22} className="hover:text-primary cursor-pointer" />
          </div>
          <div className="mr-2 self-center">
            <LanguageDropdown lang={lang} />
          </div>
        </div>
      </nav>
    </header>
  )
}
