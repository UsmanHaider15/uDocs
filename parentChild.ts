// ./src/desk-structure/parentChild.ts

import { DocumentStore } from 'sanity'
import { SanityDocument } from '@sanity/client'
import { StructureBuilder } from 'sanity/desk'
import { map } from 'rxjs/operators'
import { TagIcon } from 'lucide-react'

export default function parentChild(
  schemaType: string,
  S: StructureBuilder,
  documentStore: DocumentStore,
) {
  const query = (parentId) =>
    parentId
      ? `*[_type == "category" && parent._ref == "${parentId}" && !(_id in path("drafts.**"))]{ _id, title }`
      : `*[_type == "category" && !defined(parent) && !(_id in path("drafts.**"))]{ _id, title }`
  const options = { apiVersion: `2023-01-01` }

  const buildCategoryList = (parentId, title) => {
    return S.listItem()
      .title(title)
      .child(
        documentStore.listenQuery(query(parentId), {}, options).pipe(
          map((categories) =>
            S.list()
              .title(title)
              .items(
                categories.map((category) =>
                  buildCategoryList(category._id, category.title),
                ),
              ),
          ),
        ),
      )
  }

  return buildCategoryList(null, 'Categories')
}
