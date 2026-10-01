import { FilmRecipe } from "../types/film"

interface RecipeSelectorProps {
  recipes: FilmRecipe[]
  selected: FilmRecipe
  onSelect: (recipe: FilmRecipe) => void
}

export function RecipeSelector({ recipes, selected, onSelect }: RecipeSelectorProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
      <h2 className="mb-4 text-lg font-semibold text-zinc-100">Film Recipes</h2>
      <div className="space-y-2">
        {recipes.map((recipe) => (
          <button
            key={recipe.id}
            onClick={() => onSelect(recipe)}
            className={`w-full rounded-lg border p-3 text-left transition-colors ${
              selected.id === recipe.id
                ? "border-amber-500 bg-amber-500/10"
                : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-zinc-100">{recipe.name}</span>
              <span className="text-xs text-zinc-400">{recipe.film}</span>
            </div>
            <p className="mt-1 text-sm text-zinc-400">{recipe.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}