import React, { useEffect, useRef } from 'react'
import { Client } from '@livepeer/webrtmp-sdk'

function App() {
  const inputEl = useRef<HTMLInputElement>(null)
  const videoEl = useRef<HTMLVideoElement>(null)
  const stream = useRef<MediaStream>(null)

  useEffect(() => {

    ; (async () => {
      if (!inputEl.current || !videoEl.current) {
        return
      }
      videoEl.current.volume = 0
      stream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      videoEl.current.srcObject = stream.current
      videoEl.current.play()
    })()
  })

  const onButtonClick = async () => {
    if (!inputEl.current || !videoEl.current) {
      return
    }

    const streamKey = inputEl.current.value

    if (!stream.current) {
      alert('Video stream was not started.')
      return
    }

    if (!streamKey) {
      alert('Invalid streamKey.')
      return
    }

    const client = new Client()

    const session = client.cast(stream.current, streamKey)

    session.on('open', () => {
      console.log('Stream started.')
      alert('Stream started; visit Livepeer Dashboard.')
    })

    session.on('close', () => {
      console.log('Stream stopped.')
    })

    session.on('error', (err) => {
      console.log('Stream error.', err.message)
    })
  }

  return (
    <div className="w-full h-screen">
      <input
        className="App-input"
        ref={inputEl}
        type="text"
        placeholder="streamKey"
      />
      <video className="App-video" ref={videoEl} width={"100%"} height={"100%"} />
      <button className="App-button" onClick={onButtonClick}>
        Start
      </button>
    </div>
  )
}

export default App
