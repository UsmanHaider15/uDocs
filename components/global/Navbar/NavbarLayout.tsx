import Search from 'components/autocomplete/Search'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import type { MenuItem, SettingsPayload } from 'types'

interface NavbarProps {
  data: SettingsPayload
}
export default function Navbar(props: NavbarProps) {
  const { data } = props
  const menuItems = data?.menuItems || ([] as MenuItem[])

  return (
    <header
      className="flex sticky top-0 flex-col justify-around items-center py-0 px-6 w-full h-16 leading-7 border-0 border-solid border-stone-900 bg-zinc-800 bg-opacity-[0.8]"
      style={{
        zIndex: 1000,
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
        transform: 'translateZ(0px)',
      }}
    >
      <nav
        className="flex relative flex-1 items-center w-full border-0 border-solid border-stone-900 bg-white"
        style={{ maxWidth: '1400px' }}
      >
        {menuItems &&
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
          })}

        <div className="flex gap-6 items-center w-full border-0 border-solid border-stone-900">
          My Docs
        </div>
        <div className="flex gap-3 items-center border-0 border-solid border-stone-900">
          <Search />
        </div>
      </nav>
    </header>
  )
}
