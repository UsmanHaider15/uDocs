'use client'
import * as React from 'react'
import ReactPlayer from 'react-player'

const YouTubePlayer = ({ url }: { url: string }) => {
  return (
    <div style={{ position: 'relative', paddingTop: '56.25%' }}>
      <ReactPlayer
        style={{ position: 'absolute', top: 0, left: 0 }}
        url={url}
        width="100%"
        height="100%"
      />
    </div>
  )
}

export default YouTubePlayer
