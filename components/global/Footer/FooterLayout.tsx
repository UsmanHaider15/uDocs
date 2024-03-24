import type { PortableTextBlock } from '@portabletext/types'
import type { SettingsPayload } from 'types'
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'
import Link from 'next/link'

interface FooterProps {
  data: SettingsPayload
}

export default function Footer(props: FooterProps) {
  const { data } = props
  const footer = data?.footer || ([] as PortableTextBlock[])

  return (
    <footer className="bg-light-secondary dark:bg-dark-secondary">
      <div className="py-10 px-4 mx-auto max-w-screen-lg grid grid-cols-2 gap-8">
        <div className="flex flex-col justify-between">
          <div className="pb-4 font-bold text-xl">uDocs</div>
          <div className="flex space-x-4">
            <Link href="mailto:usman.haider.developer@gmail.com">
              <IoMdMail size={16} />
            </Link>
            <Link href={'https://github.com/UsmanHaider15'} target="_blank">
              <FaGithub size={16} />
            </Link>
            <Link
              href={'https://www.linkedin.com/in/usman-haider-39020017a/'}
              target="_blank"
            >
              <FaLinkedin size={16} />
            </Link>
            <Link href={'https://twitter.com/UsmanHaider734'} target="_blank">
              <FaTwitter size={16} />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {' '}
          <div>
            <h5 className="text-lg font-bold mb-2">Contact</h5>
            <div className="flex flex-col">
              <Link href="mailto:usman.haider.developer@gmail.com">Mail</Link>
              <Link href={'https://github.com/UsmanHaider15'} target="_blank">
                Github
              </Link>
              <Link
                href={'https://www.linkedin.com/in/usman-haider-39020017a/'}
                target="_blank"
              >
                Linkedin
              </Link>
              <Link href={'https://twitter.com/UsmanHaider734'} target="_blank">
                Twitter
              </Link>
            </div>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-2">Product</h5>
            <div className="flex flex-col">
              <Link href={'/docs'}>Docs</Link>
              <Link href={'/blogs'}>Blogs</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-6 mx-auto max-w-screen-xl justify-between items-center border-t border-gray-600">
        <div className="pb-4">© Copyright. All Rights Reserved.</div>
      </div>
    </footer>
  )
}
