'use client'
import { DocSearch } from '@docsearch/react'
import '@docsearch/css'

function DocuSearch() {
  return (
    <DocSearch
      appId={process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID || ''}
      indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX || ''}
      apiKey={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY || ''}
    />
  )
}

export default DocuSearch
