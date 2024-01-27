import type { PortableTextBlock } from '@portabletext/types'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import type { SettingsPayload } from 'types'

interface FooterProps {
  data: SettingsPayload
}
export default function Footer(props: FooterProps) {
  const { data } = props
  const footer = data?.footer || ([] as PortableTextBlock[])

  return (
    <footer className="bottom-0 w-full bg-white px-6 py-4 text-center border-t-2 z-10">
      <div className="flex justify-between">
        <div>Powered by uDocs</div>
        <div className="flex">
          <div className="px-2">fb</div>
          <div className="px-2">tw</div>
          <div className="px-2">ig</div>
        </div>
      </div>
    </footer>
  )
}
