/**
 * This plugin contains all the logic for setting up the singletons
 */

import { type DocumentDefinition } from 'sanity'
import { type StructureResolver } from 'sanity/desk'
import { Iframe } from 'sanity-plugin-iframe-pane'
import { iframeOptions, PREVIEWABLE_DOCUMENT_TYPES } from '../sanity.config'
import { i18n } from 'settings'

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
      return S.listItem()
        .title(typeDef.title!)
        .icon(typeDef.icon)
        .child(
          S.editor()
            .id(typeDef.name)
            .schemaType(typeDef.name)
            .documentId(typeDef.name)
            .views([
              // Default form view
              S.view.form(),
              // Preview
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
    })

    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) =>
        !typeDefArray.find(
          (singleton) => singleton.name === listItem.getId(),
        ) &&
        listItem.getId() !== 'doc' &&
        listItem.getId() !== 'toc',
    )

    const docsByLanguageItem = S.listItem()
      .title('Docs')
      .child(() =>
        S.list()
          .title('Languages')
          .items([
            ...i18n.languages.map((language) =>
              S.listItem()
                .title(`Docs (${language.id.toLocaleUpperCase()})`)
                .schemaType('doc')
                .child(
                  S.documentList()
                    .id(language.id)
                    .title(`${language.title} Docs`)
                    .schemaType('doc')
                    .filter('_type == "doc" && language == $language')
                    .params({ language: language.id }),
                ),
            ),
          ]),
      )

    const tocByLanguageItem = S.listItem()
      .title('Table of Content')
      .child(() =>
        S.list()
          .title('Languages')
          .items([
            ...i18n.languages.map((language) =>
              S.listItem()
                .title(`Toc (${language.id.toLocaleUpperCase()})`)
                .schemaType('toc')
                .child(
                  S.documentList()
                    .id(language.id)
                    .title(`${language.title} Toc`)
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
        docsByLanguageItem,
        tocByLanguageItem,
        S.divider(),
        ...defaultListItems,
      ])
  }
}
