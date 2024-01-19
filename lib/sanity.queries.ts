import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home" && language == $lang][0]{
    _id,
    title,
    overview,
    body,
    features
  }
`

export const homePageTitleQuery = groq`
  *[_type == "home"][0].title
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
  _id,
  body,
  overview,
  title,
  }
`

export const tocQuery = `
*[_type == "toc" && language == $lang && slug.current == $version][0]
  {
    title,
    "slug": slug.current,
    links[] {
      "title": title,
      "slug": target->slug.current,
      links[] {
        "title": title,
        "slug": target->slug.current,
        links[] {
          "title": title,
          "slug": target->slug.current,
        }
      }
    }
  }
`

export const docsBySlugAndLangQuery = groq`
  *[_type == "doc" && slug.current == $slug && language == $lang && version->slug.current == $version][0] {
    _id,
    body,
    overview,
    title,
    "headings": body[length(style) == 2 && string::startsWith(style, "h")],
    "previousDoc": {"title": previousDoc->title, "slug": previousDoc->slug.current},
    "nextDoc": {"title": nextDoc->title, "slug": nextDoc->slug.current}
  }
`

export const pageBySlugAndLangQuery = groq`
  *[_type == "page" && slug.current == $slug && language == $lang ][0] {
  _id,
  body,
  overview,
  title,
  "headings": body[length(style) == 2 && string::startsWith(style, "h")]
  }
`

export const pagePaths = groq`
  *[_type == "page" && slug.current != null].slug.current
`

export const docPathsWithLang = groq`
  *[_type == "doc" && slug.current != null]{
    "slug": slug.current,
    "language": language,
    "version": version->slug.current,
  }
`
export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
  }
`
