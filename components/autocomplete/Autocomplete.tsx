'use client'
import { autocomplete } from '@algolia/autocomplete-js'
import React, { createElement, Fragment, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'

export function Autocomplete(props) {
  const containerRef = useRef(null)
  const panelRootRef = useRef(null)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) {
      return undefined
    }

    const search = autocomplete({
      container: '#autocomplete',
      //   container: containerRef.current,
      renderer: { createElement, Fragment, render: () => {} },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          // @ts-ignore
          rootRef.current = root

          // @ts-ignore
          panelRootRef.current?.unmount()
          panelRootRef.current = createRoot(root)
        }

        // @ts-ignore
        panelRootRef.current.render(children)
      },
      detachedMediaQuery: '(min-width: 640px)',
      ...props,
    })

    return () => {
      search.destroy()
    }
  }, [props])

  return <div ref={containerRef} />
}
