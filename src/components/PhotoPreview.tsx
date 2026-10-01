import { useEffect, useRef } from "react"
import { FilmRecipe } from "../types/film"

interface PhotoPreviewProps {
  photo: string
  recipe: FilmRecipe
  onRecipeChange: (recipe: FilmRecipe) => void
}

export function PhotoPreview({ photo, recipe, onRecipeChange }: PhotoPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.drawImage(img, 0, 0)

      // Apply film recipe filters
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        let r = data[i]
        let g = data[i + 1]
        let b = data[i + 2]

        // Apply color grading based on recipe
        if (recipe.id === "classic-cuban-negative") {
          // Warm, nostalgic tones - boost reds and yellows
          r = r * 1.1 + 15
          g = g * 0.95 + 10
          b = b * 0.85 + 5
        } else if (recipe.id === "classic-chrome") {
          // Muted colors with deep shadows
          r = r * 0.9 + 10
          g = g * 0.85 + 8
          b = b * 0.8 + 5
        } else if (recipe.id === "velvia") {
          // Vivid, saturated colors
          r = r * 1.15
          g = g * 1.1
          b = b * 1.2
        } else if (recipe.id === "pro-neg") {
          // Soft contrast with warm tones
          r = r * 0.95 + 12
          g = g * 0.9 + 8
          b = b * 0.85 + 5
        } else if (recipe.id === "acros") {
          // Black and white
          const gray = (r * 0.299 + g * 0.587 + b * 0.114)
          r = gray
          g = gray
          b = gray
        }

        // Apply grain
        const grain = (Math.random() - 0.5) * recipe.grain * 20
        r += grain
        g += grain
        b += grain

        // Clamp values
        r = Math.min(255, Math.max(0, r))
        g = Math.min(255, Math.max(0, g))
        b = Math.min(255, Math.max(0, b))

        data[i] = r
        data[i + 1] = g
        data[i + 2] = b
      }

      ctx.putImageData(imageData, 0, 0)
    }
    img.src = photo
  }, [photo, recipe])

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
      <h2 className="mb-4 text-lg font-semibold text-zinc-100">Preview</h2>
      <canvas ref={canvasRef} className="w-full rounded-lg" />
      <div className="mt-4">
        <p className="text-sm text-zinc-400">Recipe: {recipe.name}</p>
        <p className="text-sm text-zinc-400">Film: {recipe.film}</p>
      </div>
    </div>
  )
}