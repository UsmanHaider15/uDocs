/**
 * This plugin contains all the logic for setting up the singletons
 */

import { type DocumentDefinition } from 'sanity'
import { type StructureResolver } from 'sanity/desk'
import { Iframe } from 'sanity-plugin-iframe-pane'
import { iframeOptions, PREVIEWABLE_DOCUMENT_TYPES } from '../sanity.config'
import { i18n, versions } from 'settings'
import { DocumentTextIcon, TiersIcon, ThListIcon } from '@sanity/icons'

export const singletonPlugin = (types: string[]) => {
  return {
    name: 'singletonPlugin',
    document: {
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === 'global') {
          return prev.filter(
            (templateItem) => !types.includes(templateItem.templateId),
          )
        }

        return prev
      },
      actions: (prev, { schemaType }) => {
        if (types.includes(schemaType)) {
          return prev.filter(({ action }) => action !== 'duplicate')
        }

        return prev
      },
    },
  }
}

// The StructureResolver is how we're changing the DeskTool structure to linking to document (named Singleton)
// like how "Home" is handled.
export const pageStructure = (
  typeDefArray: DocumentDefinition[],
): StructureResolver => {
  return (S, context) => {
    // Goes through all of the singletons that were provided and translates them into something the
    // Desktool can understand
    const singletonItems = typeDefArray.map((typeDef) => {
      // Check if the current type is 'home'
      if (typeDef.name === 'home') {
        return S.listItem()
          .title(typeDef.title!)
          .icon(typeDef.icon)
          .child(
            S.list()
              .title('Languages')
              .items(
                i18n.languages.map((language) =>
                  S.listItem()
                    .id(`${typeDef.name}-${language.id}`)
                    .title(`${typeDef.title} (${language.title})`)
                    .child(
                      // Use a function to return a specific editor for each language version
                      () =>
                        S.editor()
                          .id(`${typeDef.name}-${language.id}`)
                          .schemaType(typeDef.name)
                          .documentId(`${typeDef.name}-${language.id}`)
                          .views([
                            S.view.form(),
                            ...(PREVIEWABLE_DOCUMENT_TYPES.includes(
                              typeDef.name as any,
                            )
                              ? [
                                  S.view
                                    .component(Iframe)
                                    .options(iframeOptions)
                                    .title('Preview'),
                                ]
                              : []),
                          ]),
                    ),
                ),
              ),
          )
      } else {
        // For other types, use the existing behavior
        return S.listItem()
          .title(typeDef.title!)
          .icon(typeDef.icon)
          .child(
            S.editor()
              .id(typeDef.name)
              .schemaType(typeDef.name)
              .documentId(typeDef.name)
              .views([
                S.view.form(),
                ...(PREVIEWABLE_DOCUMENT_TYPES.includes(typeDef.name as any)
                  ? [
                      S.view
                        .component(Iframe)
                        .options(iframeOptions)
                        .title('Preview'),
                    ]
                  : []),
              ]),
          )
      }
    })

    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) =>
        !typeDefArray.find(
          (singleton) => singleton.name === listItem.getId(),
        ) &&
        listItem.getId() !== 'doc' &&
        listItem.getId() !== 'toc' &&
        listItem.getId() !== 'blog',
    )

    const docsByLanguageAndVersionItem = S.listItem()
      .title('Docs')
      .icon(DocumentTextIcon)
      .child(() =>
        S.list()
          .title('Languages')
          .items(
            i18n.languages.map((language) =>
              S.listItem()
                .title(`Docs (${language.id.toUpperCase()})`)
                .child(() =>
                  S.list()
                    .title(`Versions`)
                    .items(
                      versions.map((version) =>
                        S.listItem()
                          .title(`Version ${version.id}`)
                          .icon(ThListIcon)
                          .schemaType('doc')
                          .child(
                            S.documentList()
                              .id(`${language.id}-${version.id}`)
                              .title(
                                `${language.title} Docs - ${version.title}`,
                              )
                              .schemaType('doc')
                              .filter(
                                '_type == "doc" && language == $language && version->slug.current == $version',
                              )
                              .params({
                                language: language.id,
                                version: version.id,
                              }),
                          ),
                      ),
                    ),
                ),
            ),
          ),
      )

    const blogItemsByLanguage = S.listItem()
      .title('Blogs')
      .icon(DocumentTextIcon) // Adjust the icon as needed
      .child(() =>
        S.list()
          .title('Languages')
          .items([
            ...i18n.languages.map((language) =>
              S.listItem()
                .title(`Blogs (${language.title})`)
                .schemaType('blog')
                .child(
                  S.documentList()
                    .id(`blog-${language.id}`)
                    .title(`Blogs (${language.title})`)
                    .schemaType('blog')
                    .filter('_type == "blog" && language == $language')
                    .params({ language: language.id }),
                ),
            ),
          ]),
      )

    const tocByLanguageItem = S.listItem()
      .title('Table of Content')
      .icon(TiersIcon)
      .child(() =>
        S.list()
          .title('Languages')
          .items([
            ...i18n.languages.map((language) =>
              S.listItem()
                .title(`Table of Content (${language.id.toLocaleUpperCase()})`)
                .schemaType('toc')
                .child(
                  S.documentList()
                    .id(language.id)
                    .title(
                      `Table of Content (${language.id.toLocaleUpperCase()})`,
                    )
                    .schemaType('toc')
                    .filter('_type == "toc" && language == $language')
                    .params({ language: language.id }),
                ),
            ),
          ]),
      )

    return S.list()
      .title('Content')
      .items([
        ...singletonItems,
        S.divider(),
        blogItemsByLanguage,
        docsByLanguageAndVersionItem,
        tocByLanguageItem,
        S.divider(),
        ...defaultListItems,
      ])
  }
}
