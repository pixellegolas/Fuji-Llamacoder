import { FilmRecipe } from "@/lib/recipes";

interface RecipeSelectorProps {
  recipes: FilmRecipe[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function RecipeSelector({ recipes, selectedId, onSelect }: RecipeSelectorProps) {
  return (
    <div className="space-y-2">
      {recipes.map((recipe) => (
        <button
          key={recipe.id}
          onClick={() => onSelect(recipe.id)}
          className={`w-full rounded-xl border p-4 text-left transition-all ${
            selectedId === recipe.id
              ? "border-amber-500 bg-amber-500/10"
              : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-zinc-100">{recipe.name}</div>
              <div className="text-xs text-zinc-500">{recipe.film}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-zinc-400">{recipe.grain}</div>
              <div className="text-xs text-zinc-500">{recipe.color}</div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}