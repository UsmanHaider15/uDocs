import type { PortableTextBlock } from '@portabletext/types'
import type { SettingsPayload } from 'types'
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'
import Link from 'next/link'

interface FooterProps {
  data: SettingsPayload
}
export default function Footer(props: FooterProps) {
  const { data } = props
  const footer = data?.footer || ([] as PortableTextBlock[])

  return (
    <footer className="bottom-0 w-full px-6 py-4 text-center border-t-2 z-10 text-light-text dark:text-dark-text border-light-secondary dark:border-dark-secondary">
      <div className="flex mx-auto max-w-screen-xl justify-between">
        <div>Powered by uDocs</div>
        <div className="flex">
          <div className="px-2">
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/usman-haider-39020017a/"
            >
              {' '}
              <FaLinkedin className="text-light-text dark:text-dark-text hover:text-blue-600 dark:hover:text-blue-400" />
            </Link>
          </div>
          <div className="px-2">
            <Link target="_blank" href="https://twitter.com/UsmanHaider734">
              {' '}
              <FaTwitter className="text-light-text dark:text-dark-text hover:text-blue-400 dark:hover:text-blue-300" />
            </Link>
          </div>
          <div className="px-2">
            <Link target="_blank" href="https://github.com/UsmanHaider15">
              <FaGithub className="text-light-text dark:text-dark-text hover:text-pink-600 dark:hover:text-pink-400" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
