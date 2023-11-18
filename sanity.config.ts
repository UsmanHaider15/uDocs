/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, previewSecretId, projectId } from 'lib/sanity.api'
import { pageStructure, singletonPlugin } from 'plugins/settings'
import { defineConfig, defineField } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import Iframe, {
  defineUrlResolver,
  IframeOptions,
} from 'sanity-plugin-iframe-pane'
import { previewUrl } from 'sanity-plugin-iframe-pane/preview-url'
import page from 'schemas/documents/page'
import doc from 'schemas/documents/doc'
import project from 'schemas/documents/project'
import duration from 'schemas/objects/duration'
import milestone from 'schemas/objects/milestone'
import timeline from 'schemas/objects/timeline'
import home from 'schemas/singletons/home'
import settings from 'schemas/singletons/settings'
import category from 'schemas/documents/category'
import { documentInternationalization } from '@sanity/document-internationalization'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
  'Next.js Personal Website with Sanity.io'

export const PREVIEWABLE_DOCUMENT_TYPES = [
  home.name,
  page.name,
  doc.name,
  project.name,
  category.name,
] satisfies string[]

export const PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS = [
  page.name,
  doc.name,
  project.name,
  category.name,
] satisfies typeof PREVIEWABLE_DOCUMENT_TYPES

// Used to generate URLs for drafts and live previews
export const PREVIEW_BASE_URL = '/api/draft'

export const urlResolver = defineUrlResolver({
  base: PREVIEW_BASE_URL,
  requiresSlug: PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS,
})

export const iframeOptions = {
  url: urlResolver,
  urlSecretId: previewSecretId,
} satisfies IframeOptions

export default defineConfig({
  basePath: '/studio',
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      settings,
      // Documents
      duration,
      page,
      doc,
      project,
      category,
      // Objects
      milestone,
      timeline,
    ],
    // Add this 'category child' template
    templates: (prev) => {
      const categoryChild = {
        id: 'category-child',
        title: 'Category: Child',
        schemaType: 'category',
        parameters: [{ name: `parentId`, title: `Parent ID`, type: `string` }],
        // This value will be passed-in from desk structure
        value: ({ parentId }: { parentId: string }) => ({
          parent: { _type: 'reference', _ref: parentId },
        }),
      }

      return [...prev, categoryChild]
    },
  },
  plugins: [
    deskTool({
      structure: pageStructure([home, settings]),
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      // You can add any React component to `S.view.component` and it will be rendered in the pane
      // and have access to content in the form in real-time.
      // It's part of the Studio's “Structure Builder API” and is documented here:
      // https://www.sanity.io/docs/structure-builder-reference
      defaultDocumentNode: (S, { schemaType }) => {
        if ((PREVIEWABLE_DOCUMENT_TYPES as string[]).includes(schemaType)) {
          return S.document().views([
            // Default form view
            S.view.form(),
            // Preview
            S.view.component(Iframe).options(iframeOptions).title('Preview'),
          ])
        }

        return null
      },
    }),
    documentInternationalization({
      // Required
      // Either: an array of supported languages...
      supportedLanguages: [
        { id: 'nb', title: 'Norwegian (Bokmål)' },
        { id: 'nn', title: 'Norwegian (Nynorsk)' },
        { id: 'en', title: 'English' },
      ],
      // ...or a function that takes the client and returns a promise of an array of supported languages
      // MUST return an "id" and "title" as strings
      // supportedLanguages: (client) => client.fetch(`*[_type == "language"]{id, title}`),

      // Required
      // Translations UI will only appear on these schema types
      schemaTypes: ['page', 'doc'],

      // Optional
      // Customizes the name of the language field
      languageField: `language`, // defauts to "language"

      // Optional
      // Keep translation.metadata references weak
      weakReferences: true, // defaults to false

      // Optional
      // Adds UI for publishing all translations at once. Requires access to the Scheduling API
      // https://www.sanity.io/docs/scheduling-api
      // bulkPublish: true // defaults to false

      // Optional
      // Adds additional fields to the metadata document
      metadataFields: [defineField({ name: 'slug', type: 'slug' })],

      // Optional
      // Define API Version for all queries
      // https://www.sanity.io/docs/api-versioning
      apiVersion: '2023-05-22',
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, settings.name]),
    // Add the "Open preview" action
    previewUrl({
      base: PREVIEW_BASE_URL,
      requiresSlug: PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS,
      urlSecretId: previewSecretId,
      matchTypes: PREVIEWABLE_DOCUMENT_TYPES,
    }),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
