'use client'
import React, { createElement } from 'react'
import { getAlgoliaResults } from '@algolia/autocomplete-js'
import algoliasearch from 'algoliasearch'
import { Autocomplete } from './Autocomplete'
import { ProductItem } from './ProductItem'
import '@algolia/autocomplete-theme-classic'

const appId = 'JQKUNTEZ0K'
const apiKey = 'c757cb1457dc2ff3ee72c37b37c7fc91'
const searchClient = algoliasearch(appId, apiKey)

function Search() {
  return (
    <Autocomplete
      openOnFocus={true}
      getSources={({ query }) => [
        {
          sourceId: 'docs',
          getItems() {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  indexName: 'docs',
                  query,
                },
              ],
            })
          },
          templates: {
            item({ item, components }) {
              return <ProductItem hit={item} components={components} />
            },
          },
        },
      ]}
    />
  )
}

export default Search
