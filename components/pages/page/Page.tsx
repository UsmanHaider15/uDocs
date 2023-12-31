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
    <>
      <nav className="order-last hidden w-56 shrink-0 lg:block">
        <div className="sticky top-[126px] h-[calc(100vh-121px)]">
          {headings ? <TableOfContents headings={headings} /> : null}
        </div>
      </nav>
      <article className="mt-4 w-full min-w-0 max-w-6xl px-1 md:px-6">
        {body && (
          <CustomPortableText
            paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl"
            value={body}
          />
        )}
      </article>
    </>
  )
}

export default Page
