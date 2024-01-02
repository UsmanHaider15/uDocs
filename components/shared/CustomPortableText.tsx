import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import ImageBox from 'components/shared/ImageBox'
import { TimelineSection } from 'components/shared/TimelineSection'
import { Image } from 'sanity'

export function CustomPortableText({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    block: {
      // Adjusted typography and whitespace
      normal: ({ children }) => (
        <p className={`leading-relaxed mb-2 text-gray-700 ${paragraphClasses}`}>
          {children}
        </p>
      ),
      h1: ({ children, value }) => (
        <h1 id={value._key} className="text-4xl font-bold my-4 text-gray-900">
          {children}
        </h1>
      ),
      h2: ({ children, value }) => (
        <h2
          id={value._key}
          className="mt-6 mb-4 border-t pt-10 px-0 border-b-0 pb-0 mx-0 text-2xl font-semibold  border-solid border-x-0 border-stone-900"
        >
          {children}
        </h2>
      ),
      // ... Other heading styles remain similar with adjusted margins
    },
    marks: {
      // Improved interactivity with a clear visual change on hover
      link: ({ children, value }) => (
        <a
          className="underline text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out"
          href={value?.href}
          target="_blank"
          rel="noreferrer noopener"
        >
          {children}
        </a>
      ),
    },
    types: {
      image: ({ value }) => (
        <div className="my-8 mx-auto">
          <ImageBox
            image={value}
            alt={value.alt}
            classesWrapper="relative w-full h-auto aspect-auto"
          />
          {value?.caption && (
            <p className="text-sm text-gray-500 text-center mt-2">
              {value.caption}
            </p>
          )}
        </div>
      ),
      // The timeline remains unchanged unless you want to apply specific styling
      timeline: ({ value }) => {
        const { items } = value || {}
        return <TimelineSection timelines={items} />
      },
    },
  }

  return <PortableText components={components} value={value} />
}

{
  /* <h2
  id="accessibility"
  data-docs-heading=""
  class="px-0 pt-10 pb-0 mx-0 mt-8 mb-4 text-2xl font-semibold text-gray-200 border-b-0 border-t border-solid border-x-0 border-stone-900"
  style="border-width: 0px; line-height: 1.33333; scroll-margin-top: 11px;"
></h2> */
}
