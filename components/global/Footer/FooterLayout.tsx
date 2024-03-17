import type { PortableTextBlock } from '@portabletext/types'
import type { SettingsPayload } from 'types'
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'
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
              href="mailto:usman.haider.developer@gmail.com?subject=uDocs%20Inquiry%20or%20Collaboration&body=Hi%20Usman,%0A%0AI'm%20interested%20in%20learning%20more%20about%20uDocs%20and%20possible%20collaboration%20opportunities.%20Here%20are%20some%20details%20about%20my%20inquiry%20or%20project:%0A%0A[Please%20provide%20details%20about%20your%20inquiry%20or%20project%20here.]%0A%0ALooking%20forward%20to%20your%20response.%0A%0ABest,%0A[Your%20Name]"
            >
              {' '}
              <MdOutlineEmail
                size={20}
                className="text-light-text dark:text-dark-text hover:text-blue-600 dark:hover:text-blue-400"
              />
            </Link>
          </div>
          <div className="px-2">
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/usman-haider-39020017a/"
            >
              {' '}
              <FaLinkedin
                size={20}
                className="text-light-text dark:text-dark-text hover:text-blue-600 dark:hover:text-blue-400"
              />
            </Link>
          </div>
          <div className="px-2">
            <Link target="_blank" href="https://twitter.com/UsmanHaider734">
              {' '}
              <FaTwitter
                size={20}
                className="text-light-text dark:text-dark-text hover:text-blue-400 dark:hover:text-blue-300"
              />
            </Link>
          </div>
          <div className="px-2">
            <Link target="_blank" href="https://github.com/UsmanHaider15">
              <FaGithub
                size={20}
                className="text-light-text dark:text-dark-text hover:text-pink-600 dark:hover:text-pink-400"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
