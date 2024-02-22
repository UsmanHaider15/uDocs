import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import ImageBox from 'components/shared/ImageBox'
import { TimelineSection } from 'components/shared/TimelineSection'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import YouTube from './YouTubePlayer'
import ButtonComponent from './CustomButton'
import Link from 'next/link'

export function CustomPortableText({
  paragraphClasses = '', // Default class for paragraphs
  value,
  lang = 'en',
  version = 'v1',
}: {
  paragraphClasses?: string
  value: PortableTextBlock[]
  lang: string
  version?: string
}) {
  const consistentBaseClass = 'my-4 mx-0 text-base leading-relaxed' // Consistent base for typography

  const components: PortableTextComponents = {
    block: {
      normal: ({ children, value }) => (
        <p
          id={value._key}
          className={`${consistentBaseClass} ${paragraphClasses}`}
        >
          {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="p-4 italic border-l-4 border-stone-400 bg-stone-100 text-stone-600">
          {children}
        </blockquote>
      ),
      h1: ({ children, value }) => (
        <h1 id={value._key} className="text-3xl font-bold my-4">
          {children}
        </h1>
      ),
      h2: ({ children, value }) => (
        <h2
          id={value._key}
          className="text-2xl font-semibold my-4 border-t border-stone-200 pt-4"
        >
          {children}
        </h2>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className={`${consistentBaseClass} list-disc pl-4`}>{children}</ul>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="mb-1">{children}</li>,
    },
    marks: {
      link: ({ children, value }) => (
        <a
          className="text-blue-500 hover:text-blue-700 transition-colors duration-300 ease-in-out"
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
      code: ({ children }) => (
        <code className="py-1 px-2 font-mono text-xs bg-gray-200 rounded-md">
          {children}
        </code>
      ),
    },
    types: {
      image: ({ value }) => (
        <div className="my-5">
          <ImageBox image={value} alt={value.alt} classesWrapper="" />
          {value?.caption && (
            <p className="text-xs text-center mt-2">{value.caption}</p>
          )}
        </div>
      ),
      youtube: (props) => <YouTube url={props.value.url} />,
      docLink: ({ value }) => {
        console.log('value', value)
        return (
          <div className="my-4">
            <h3 className="text-xl font-semibold">{value.title}</h3>
            <p>{value.description}</p>
            <Link
              href={`/${lang}/docs/${version}/${value.docRefSlug}`}
              className="text-blue-500 hover:text-blue-700"
            >
              Read more
            </Link>
          </div>
        )
      },

      button: ({ value }) => (
        <ButtonComponent
          text={value?.text}
          href={value?.href}
          style={value?.style}
        />
      ),
      code: ({ value }) => (
        <SyntaxHighlighter language={value.language} style={docco}>
          {value.code}
        </SyntaxHighlighter>
      ),
      timeline: ({ value }) => {
        const { items } = value || {}
        return <TimelineSection timelines={items} />
      },
    },
  }

  return <PortableText components={components} value={value} />
}
