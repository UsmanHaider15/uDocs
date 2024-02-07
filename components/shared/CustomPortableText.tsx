import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import ImageBox from 'components/shared/ImageBox'
import { TimelineSection } from 'components/shared/TimelineSection'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Image } from 'sanity'
import YouTube from './YouTubePlayer'

export function CustomPortableText({
  paragraphClasses = '',
  value,
}: {
  paragraphClasses?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    block: {
      // Adjusted typography and whitespace
      normal: ({ children, value }) => (
        <p id={value._key} className={`mb-2 ${paragraphClasses}`}>
          {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="p-3 my-4 mx-0 text-sm not-italic font-normal rounded-md border border-solid border-stone-900">
          {children}
        </blockquote>
      ),
      h1: ({ children, value }) => (
        <h1 id={value._key} className="text-4xl font-bold my-4">
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
    },
    list: {
      bullet: ({ children }) => {
        return (
          <ul className="font-serif list-disc pl-1 my-2 text-left border-0 border-solid border-stone-900">
            {children}
          </ul>
        )
      },
    },
    listItem: {
      bullet: ({ children }) => {
        return <li className="mb-2">{children}</li>
      },
    },
    marks: {
      // Improved interactivity with a clear visual change on hover
      link: ({ children, value }) => (
        <a
          className="text-blue-400 hover:text-blue-600 transition duration-300 ease-in-out"
          href={value?.href}
          target="_blank"
          rel="noreferrer noopener"
        >
          {children}
        </a>
      ),
      code: ({ children }) => {
        return (
          <code className="inline py-px px-1 m-0 font-mono text-sm text-left rounded-md border border-solid border-neutral-700 bg-zinc-800 content-none">
            {children}
          </code>
        )
      },
    },
    types: {
      image: ({ value }) => {
        return (
          <div className="my-5 mx-auto">
            <ImageBox image={value} alt={value.alt} classesWrapper="" />
            {value?.caption && (
              <p className="text-sm text-center mt-2">{value.caption}</p>
            )}
          </div>
        )
      },
      // @ts-ignore
      youtube: (props) => {
        console.log('props', props)
        console.log('props.value.url', props.value.url)
        return <YouTube url={props.value.url} />
      },
      button: ({ value }) => {
        return (
          <button
            type="button"
            className={value?.style}
            rel="noreferrer noopener"
          >
            <a href={value?.href} target="_blank">
              {value?.text}
            </a>
          </button>
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
