import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Header } from 'components/shared/Header'
import type { PagePayload } from 'types'

export interface PageProps {
  data: PagePayload | null
}

function createToC(headings: any[]) {
  const toc: any[] = []
  let currentH2: any = null

  headings.forEach((heading) => {
    if (heading._type === 'block' && heading.style === 'h2') {
      currentH2 = {
        title: heading.children[0].text,
        id: heading._key,
        children: [],
      }
      toc.push(currentH2)
    } else if (
      heading._type === 'block' &&
      heading.style === 'h3' &&
      currentH2
    ) {
      currentH2.children.push({
        title: heading.children[0].text,
        id: heading._key,
      })
    }
  })

  return toc
}

const TableOfContents = ({ headings }) => {
  const toc = createToC(headings)

  return (
    <ul>
      {toc.map((h2) => (
        <li key={h2.id}>
          <a href={`#${h2.id}`}>{h2.title}</a>
          {h2.children.length > 0 && (
            <ul>
              {h2.children.map((h3) => (
                <li key={h3.id}>
                  <a href={`#${h3.id}`}>{h3.title}</a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}

export function Page({ data }: PageProps) {
  const { body, overview, title, headings } = data ?? {}

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-grow mb-14">
        {/* Header */}
        {/* <Header title={title} description={overview} /> */}

        {/* Body */}
        {body && (
          <CustomPortableText
            paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl"
            value={body}
          />
        )}
      </div>

      {/* Table of Contents */}
      <div className="sticky top-0 h-screen overflow-y-auto">
        {headings ? <TableOfContents headings={headings} /> : null}
      </div>
    </div>
  )
}

export default Page
