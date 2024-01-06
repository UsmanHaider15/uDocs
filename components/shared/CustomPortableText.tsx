import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import ImageBox from 'components/shared/ImageBox'
import { TimelineSection } from 'components/shared/TimelineSection'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
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
        <p className={`leading-relaxed mb-2 text-gray-800 ${paragraphClasses}`}>
          {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="font-sans p-3 my-4 mx-0 text-sm not-italic font-normal leading-5 text-gray-800 rounded-md border border-solid border-stone-900">
          {children}
        </blockquote>
      ),
      h1: ({ children, value }) => (
        <h1
          id={value._key}
          className="font-sans text-4xl font-bold my-4 text-gray-800"
        >
          {children}
        </h1>
      ),
      h2: ({ children, value }) => (
        <h2
          id={value._key}
          className="font-sans mt-6 mb-4 border-t pt-10 px-0 border-b-0 pb-0 mx-0 text-2xl font-semibold  border-solid border-x-0 border-stone-900"
        >
          {children}
        </h2>
      ),
    },
    list: {
      bullet: ({ children }) => {
        return (
          <ul className="list-disc pl-1 my-2 leading-7 text-left text-gray-800 border-0 border-solid border-stone-900">
            {children}
          </ul>
        )
      },
    },
    listItem: {
      bullet: ({ children }) => {
        return <li className="mb-2 text-gray-800">{children}</li>
      },
    },
    marks: {
      // Improved interactivity with a clear visual change on hover
      link: ({ children, value }) => (
        <a
          className="font-sans text-blue-400 hover:text-blue-600 transition duration-300 ease-in-out"
          href={value?.href}
          target="_blank"
          rel="noreferrer noopener"
        >
          {children}
        </a>
      ),
    },
    types: {
      image: ({ value }) => {
        return (
          <div className="my-5 mx-auto">
            <ImageBox image={value} alt={value.alt} classesWrapper="" />
            {value?.caption && (
              <p className="text-sm text-gray-500 text-center mt-2">
                {value.caption}
              </p>
            )}
          </div>
        )
      },
      code: ({ value }) => {
        return (
          <SyntaxHighlighter language={value.language} style={docco}>
            {value.code}
          </SyntaxHighlighter>
        )
      },
      // The timeline remains unchanged unless you want to apply specific styling
      timeline: ({ value }) => {
        const { items } = value || {}
        return <TimelineSection timelines={items} />
      },
    },
  }

  return <PortableText components={components} value={value} />
}
