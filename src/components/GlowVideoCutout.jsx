import { useEffect, useRef } from 'react'

// Black/near-black pixels are removed via mix-blend-screen so the clip melts
// into the navy hero — no canvas square, no mismatched grey box.
export default function GlowVideoCutout({ src, className = '' }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const play = () => video.play().catch(() => {})
    const onLoaded = () => play()

    if (video.readyState >= 2) play()
    else video.addEventListener('loadeddata', onLoaded, { once: true })

    return () => video.removeEventListener('loadeddata', onLoaded)
  }, [src])

  return (
    <div
      className={`glow-video-wrap ${className}`}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        autoPlay
        preload="auto"
        className="glow-video"
      />
    </div>
  )
}
