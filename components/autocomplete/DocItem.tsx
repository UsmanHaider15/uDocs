import Link from 'next/link'
import React, { createElement } from 'react'

export function DocItem({ hit, components }) {
  console.log(hit)
  return (
    <Link href={hit.slug} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle">
          <components.Highlight hit={hit} attribute="title" />
        </div>
      </div>
    </Link>
  )
}
