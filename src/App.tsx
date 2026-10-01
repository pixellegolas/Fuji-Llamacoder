import { useEffect, useRef, useState } from "react"
import { Camera, Download, RefreshCw, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FilmRecipe, FILM_RECIPES } from "./types/film"
import { PhotoPreview } from "./components/PhotoPreview"
import { RecipeSelector } from "./components/RecipeSelector"

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [photo, setPhoto] = useState<string | null>(null)
  const [selectedRecipe, setSelectedRecipe] = useState<FilmRecipe>(FILM_RECIPES[0])
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
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setIsCameraOn(true)
    } catch (err) {
      setError("Camera permission denied. Please enable camera access in settings.")
      console.error("Camera error:", err)
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
    setPhoto(canvas.toDataURL("image/jpeg", 0.95))
  }

  const downloadPhoto = () => {
    if (!photo) return
    const link = document.createElement("a")
    link.download = `filmlab-${selectedRecipe.id}-${Date.now()}.jpg`
    link.href = photo
    link.click()
  }

  const reset = () => {
    setPhoto(null)
    setSelectedRecipe(FILM_RECIPES[0])
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 bg-zinc-900/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-amber-400">FilmLab</h1>
            <p className="text-sm text-zinc-400">Fujifilm Film Recipes</p>
          </div>
          <div className="flex items-center gap-2">
            {isCameraOn && (
              <Button
                variant="outline"
                size="sm"
                onClick={stopCamera}
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              >
                <X className="mr-2 h-4 w-4" />
                Stop Camera
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl p-6">
        {error && (
          <div className="mb-4 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-red-400">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
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
                    <Camera className="h-12 w-12 text-zinc-600" />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between p-4">
                <Button
                  onClick={isCameraOn ? capturePhoto : startCamera}
                  className="bg-amber-500 text-zinc-900 hover:bg-amber-400"
                >
                  {isCameraOn ? "Capture" : "Start Camera"}
                </Button>
                {photo && (
                  <Button
                    variant="outline"
                    onClick={reset}
                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                )}
              </div>
            </div>

            {photo && (
              <div className="flex gap-2">
                <Button
                  onClick={downloadPhoto}
                  className="flex-1 bg-emerald-500 text-zinc-900 hover:bg-emerald-400"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <RecipeSelector
              recipes={FILM_RECIPES}
              selected={selectedRecipe}
              onSelect={setSelectedRecipe}
            />
            {photo && (
              <PhotoPreview
                photo={photo}
                recipe={selectedRecipe}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}