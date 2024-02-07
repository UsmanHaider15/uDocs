'use client'
import * as React from 'react'
import ReactPlayer from 'react-player'

const YouTubePlayer = ({ url }: { url: string }) => {
  return <ReactPlayer url={url} />
}

export default YouTubePlayer
