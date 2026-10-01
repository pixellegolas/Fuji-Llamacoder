import { Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilmRecipe } from "@/lib/recipes";

interface PhotoPreviewProps {
  imageData: string;
  recipe: FilmRecipe;
  onRetake: () => void;
  onDownload: () => void;
}

export default function PhotoPreview({ imageData, recipe, onRetake, onDownload }: PhotoPreviewProps) {
  const filterStyle = {
    filter: `
      saturate(${recipe.saturation})
      contrast(${recipe.contrast})
      sepia(${recipe.sepia})
      hue-rotate(${recipe.hueRotate}deg)
      brightness(${recipe.brightness})
      drop-shadow(0 0 ${recipe.halation * 20}px rgba(255, 100, 50, ${recipe.halation * 0.3}))
    `,
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      <div className="relative">
        <div className="relative overflow-hidden">
          <img 
            src={imageData} 
            alt="Captured" 
            className="w-full"
            style={filterStyle}
          />
          {/* Grain overlay */}
          <div 
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              opacity: recipe.grainAmount,
              backgroundSize: `${recipe.grainSize * 100}px ${recipe.grainSize * 100}px`,
            }}
          />
          {/* Bloom overlay */}
          <div 
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 30%, rgba(255, 200, 150, ${recipe.bloom * 0.3}), transparent 60%)`,
              mixBlendMode: 'screen',
            }}
          />
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-zinc-950/70 px-3 py-1 text-xs text-amber-400">
          {recipe.name}
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <Button
          variant="outline"
          onClick={onRetake}
          className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Retake
        </Button>
        <Button onClick={onDownload} className="bg-amber-500 text-zinc-950 hover:bg-amber-400">
          <Download className="mr-2 h-4 w-4" />
          Save Photo
        </Button>
      </div>
    </div>
  );
}