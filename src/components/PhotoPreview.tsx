import { FilmRecipe } from "../types/film"

interface PhotoPreviewProps {
  photo: string
  recipe: FilmRecipe
  onRecipeChange: (recipe: FilmRecipe) => void
}

export function PhotoPreview({ photo, recipe, onRecipeChange }: PhotoPreviewProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
        <h3 className="font-semibold">Preview</h3>
        <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium text-amber-400">
          {recipe.name}
        </span>
      </div>
      <div className="p-4">
        <img
          src={photo}
          alt="Captured"
          className="w-full rounded-xl"
          style={{
            filter: `saturate(${recipe.saturation}) contrast(${recipe.contrast}) brightness(${recipe.brightness}) hue-rotate(${recipe.hueRotate}deg) sepia(${recipe.sepia})`
          }}
        />
      </div>
      <div className="border-t border-zinc-800 p-4">
        <div className="flex flex-wrap gap-2">
          {[recipe].map((r) => (
            <button
              key={r.id}
              onClick={() => onRecipeChange(r)}
              className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-700"
            >
              Apply {r.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}