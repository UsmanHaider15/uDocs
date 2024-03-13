import type { PortableTextBlock } from '@portabletext/types'
import type { SettingsPayload } from 'types'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

interface FooterProps {
  data: SettingsPayload
}
export default function Footer(props: FooterProps) {
  const { data } = props
  const footer = data?.footer || ([] as PortableTextBlock[])

  return (
    <footer className="bottom-0 w-full px-6 py-4 text-center border-t-2 z-10 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700">
      <div className="flex mx-auto max-w-screen-xl justify-between">
        <div>Powered by uDocs</div>
        <div className="flex">
          <div className="px-2">
            <FaFacebookF className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400" />
          </div>
          <div className="px-2">
            <FaTwitter className="text-gray-900 dark:text-gray-100 hover:text-blue-400 dark:hover:text-blue-300" />
          </div>
          <div className="px-2">
            <FaInstagram className="text-gray-900 dark:text-gray-100 hover:text-pink-600 dark:hover:text-pink-400" />
          </div>
        </div>
      </div>
    </footer>
  )
}
