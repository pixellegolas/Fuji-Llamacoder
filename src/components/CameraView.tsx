import { useRef, useState, useEffect } from "react"

interface CameraViewProps {
  onCapture: (photo: string) => void
}

export function CameraView({ onCapture }: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setIsCameraOn(true)
      setError(null)
    } catch (err) {
      setError("Unable to access camera. Please check permissions.")
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setIsCameraOn(false)
  }

  const capturePhoto = () => {
    if (!videoRef.current) return
    const canvas = document.createElement("canvas")
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.drawImage(videoRef.current, 0, 0)
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9)
    onCapture(dataUrl)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      <div className="relative aspect-video bg-black">
        {isCameraOn ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            playsInline
            muted
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800">
                <span className="text-3xl">📷</span>
              </div>
              <p className="text-sm text-zinc-400">
                {error || "Camera is off"}
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between p-4">
        <div className="flex gap-2">
          {!isCameraOn ? (
            <button
              onClick={startCamera}
              className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-amber-400"
            >
              Start Camera
            </button>
          ) : (
            <>
              <button
                onClick={capturePhoto}
                className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-amber-400"
              >
                Capture
              </button>
              <button
                onClick={stopCamera}
                className="rounded-lg bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-700"
              >
                Stop
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}