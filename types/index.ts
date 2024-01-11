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
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  title?: string
}

export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  headings?: PortableTextBlock[]
  title?: string
  slug?: string
  previousDoc?: PagePayload // Adding the previousDoc field
  nextDoc?: PagePayload // Adding the nextDoc field
}

export interface TOCLink {
  title: string
  slug: string
  links?: TOCLink[] | null
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
}

export interface Version {
  id: string
  title: string
  isDefault?: boolean // Optional property
}
