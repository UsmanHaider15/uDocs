import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'

interface ImageBoxProps {
  image?: { asset?: any }
  alt?: string
  width?: number
  height?: number
  size?: string
  classesWrapper?: string
}

export default function ImageBox({
  image,
  alt = 'Cover image',
  width = 3500,
  height = 2000,
  size = '100vw',
  classesWrapper,
}: ImageBoxProps) {
  const imageUrl = image && urlForImage(image)?.fit('crop').url()

  return (
    <div className={`overflow-hidden rounded-lg ${classesWrapper}`}>
      {imageUrl && (
        <Image
          alt={alt}
          src={imageUrl}
          width={width}
          height={height}
          sizes={size}
        />
      )}
    </div>
  )
}
