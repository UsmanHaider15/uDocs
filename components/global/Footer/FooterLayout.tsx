import type { PortableTextBlock } from '@portabletext/types'
import type { SettingsPayload } from 'types'
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaApple,
  FaAndroid,
  FaWindows,
  FaAppleAlt,
} from 'react-icons/fa'

interface FooterProps {
  data: SettingsPayload
}
export default function Footer(props: FooterProps) {
  const { data } = props
  const footer = data?.footer || ([] as PortableTextBlock[])

  return (
    <footer className="bg-light-secondary dark:bg-dark-secondary">
      <div className="py-10 px-4 mx-auto max-w-screen-xl grid grid-cols-3 gap-8">
        <div>
          <h5 className="text-lg font-bold mb-4">COMPANY</h5>
          <ul className="space-y-2">
            <li>Docs</li>
            <li>Blog</li>
            <li>About</li>
            <li>Careers</li>
          </ul>
        </div>

        <div>
          <h5 className="text-lg font-bold mb-4">HELP CENTER</h5>
          <ul className="space-y-2">
            <li>Discord Server</li>
            <li>Twitter</li>
            <li>Facebook</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div>
          <h5 className="text-lg font-bold mb-4">LEGAL</h5>
          <ul className="space-y-2">
            <li>Privacy Policy</li>
            <li>Licensing</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col p-6 mx-auto max-w-screen-xl justify-between items-center border-t border-gray-600">
        <div className="pb-4 font-bold text-xl">uDocs</div>
        <div className="pb-4">© Copyright. All Rights Reserved.</div>
        <div className="flex space-x-4">
          <FaFacebook size={24} />
          <FaInstagram size={24} />
          <FaTwitter size={24} />
          <FaApple size={24} />
          <FaAndroid size={24} />
          <FaWindows size={24} />
          <FaAppleAlt size={24} />
        </div>
      </div>
    </footer>
  )
}
