import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'

export interface MenuItem {
  _type: string
  slug?: string
  title?: string
}

export interface MilestoneItem {
  description?: string
  duration?: {
    start?: string
    end?: string
  }
  image?: Image
  tags?: string[]
  title?: string
}

export interface HomePagePayload {
  title?: string
  overview?: PortableTextBlock[]
  body?: PortableTextBlock[]
  features?: Feature[]
  footer?: PortableTextBlock[]
}

interface Feature {
  title: string
  description: string
  image: Image
}

export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  headings?: PortableTextBlock[]
  title?: string
  slug?: string
}

export interface DocPagePayload {
  title: string
  slug: string
  overview?: PortableTextBlock[]
  body?: PortableTextBlock[]
  headings?: PortableTextBlock[]
  previousDoc: Partial<DocPagePayload>
  nextDoc: Partial<DocPagePayload>
}

interface Author {
  name: string
  role: string
  authorImage: Image
}

export interface BlogPagePayload {
  title: string
  slug: string
  coverImage: Image
  overview: PortableTextBlock[]
  body?: PortableTextBlock[]
  estimatedReadingTime?: number
  author: Author
  _createdAt: string
}

export interface BlogListPayload {
  title: string
  slug: string
  coverImage: Image
  overview: PortableTextBlock[]
  estimatedReadingTime: number
  author: Author
  _createdAt: string
}

export interface TOCLink {
  title: string
  slug: string
  links?: TOCLink[] | null
}

export interface BlogLink {
  title: string
  slug: string
}

export interface SettingsPayload {
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
}

export interface Language {
  id: string
  title: string
  isDefault?: boolean // Optional property
  countryCode: string // Optional property
}

export interface Version {
  id: string
  title: string
  isDefault?: boolean // Optional property
}
