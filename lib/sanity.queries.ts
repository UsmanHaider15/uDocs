import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    showcaseProjects[]->{
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      tags,
      title,
    },
    title,
  }
`

export const categoryQuery = groq`
  *[_type == "category"]{
    title,
    "slug": select(
      defined(parent) && defined(parent->parent) && defined(parent->parent->parent) => parent->parent->parent->slug.current + "/" + parent->parent->slug.current + "/" + parent->slug.current + "/" + slug.current,
      defined(parent) && defined(parent->parent) => parent->parent->slug.current + "/" + parent->slug.current + "/" + slug.current,
      defined(parent) => parent->slug.current + "/" + slug.current,
      slug.current
    )
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

export const pagesBySlugAndLangQuery = groq`
  *[_type == "page" && slug.current == $slug && language == $lang ][0] {
  _id,
  body,
  overview,
  title,
  "headings": body[length(style) == 2 && string::startsWith(style, "h")]
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
  }
`

export const projectPaths = groq`
  *[_type == "project" && slug.current != null].slug.current
`

export const pagePaths = groq`
  *[_type == "page" && slug.current != null].slug.current
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
  }
`
