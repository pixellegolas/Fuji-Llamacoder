import { useState } from "react"
import { CameraView } from "./components/CameraView"
import { PhotoPreview } from "./components/PhotoPreview"
import { PhotoUpload } from "./components/PhotoUpload"
import { FilmRecipe, FILM_RECIPES } from "./types/film"

export default function App() {
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null)
  const [selectedRecipe, setSelectedRecipe] = useState<FilmRecipe>(FILM_RECIPES[0])
  const [showUpload, setShowUpload] = useState(false)

  const handleCapture = (photoDataUrl: string) => {
    setCapturedPhoto(photoDataUrl)
  }

  const handleUpload = (photoDataUrl: string) => {
    setCapturedPhoto(photoDataUrl)
    setShowUpload(false)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20">
              <span className="text-2xl">📷</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">FilmLab</h1>
              <p className="text-xs text-zinc-400">Fujifilm Recipe Camera</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowUpload(true)}
              className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-700"
            >
              Upload Photo
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            {showUpload ? (
              <PhotoUpload onUpload={handleUpload} />
            ) : (
              <CameraView onCapture={handleCapture} />
            )}
            
            {capturedPhoto && (
              <PhotoPreview
                photo={capturedPhoto}
                recipe={selectedRecipe}
                onRecipeChange={setSelectedRecipe}
              />
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h2 className="mb-4 text-lg font-semibold">Film Recipes</h2>
              <div className="space-y-2">
                {FILM_RECIPES.map((recipe) => (
                  <button
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(recipe)}
                    className={`w-full rounded-xl border p-4 text-left transition-all ${
                      selectedRecipe.id === recipe.id
                        ? "border-amber-500 bg-amber-500/10"
                        : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{recipe.name}</span>
                      <span className="text-xs text-zinc-400">{recipe.film}</span>
                    </div>
                    <p className="mt-1 text-xs text-zinc-400">{recipe.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}