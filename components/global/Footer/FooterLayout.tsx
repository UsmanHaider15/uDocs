import type { PortableTextBlock } from '@portabletext/types'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import type { SettingsPayload } from 'types'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

interface FooterProps {
  data: SettingsPayload
}
export default function Footer(props: FooterProps) {
  const { data } = props
  const footer = data?.footer || ([] as PortableTextBlock[])

  return (
    <footer className="bottom-0 w-full bg-white px-6 py-4 text-center border-t-2 ">
      <div className="flex justify-between">
        <div>Powered by uDocs</div>
        <div className="flex">
          <div className="px-2">
            <FaFacebookF />
          </div>
          <div className="px-2">
            <FaTwitter />
          </div>
          <div className="px-2">
            <FaInstagram />
          </div>
        </div>
      </div>
    </footer>
  )
}
