import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Download, RefreshCw, Film } from "lucide-react";
import { filmRecipes, applyFilmRecipe, type FilmRecipe } from "@/lib/filmRecipes";
import { cn } from "@/lib/utils";

// Capacitor imports (will be available in the native app)
declare const Capacitor: any;

export default function App() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [processedPhoto, setProcessedPhoto] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<FilmRecipe>(filmRecipes[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isNative, setIsNative] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check if running in Capacitor native environment
    if (typeof Capacitor !== 'undefined' && Capacitor.isNativePlatform()) {
      setIsNative(true);
    }
  }, []);

  const takePhoto = async () => {
    try {
      if (isNative) {
        // Use Capacitor Camera plugin for native
        const { Camera } = await import('@capacitor/camera');
        const image = await Camera.getPhoto({
          quality: 100,
          allowEditing: false,
          resultType: 'dataUrl',
          saveToGallery: false
        });
        setPhoto(image.dataUrl);
        setProcessedPhoto(null);
      } else {
        // Fallback for web - use file input
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
              setPhoto(ev.target?.result as string);
              setProcessedPhoto(null);
            };
            reader.readAsDataURL(file);
          }
        };
        input.click();
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  const processPhoto = () => {
    if (!photo) return;
    setIsProcessing(true);
    
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.drawImage(img, 0, 0);
      applyFilmRecipe(ctx, selectedRecipe);
      setProcessedPhoto(canvas.toDataURL('image/jpeg', 0.95));
      setIsProcessing(false);
    };
    img.src = photo;
  };

  const downloadPhoto = () => {
    if (!processedPhoto) return;
    const link = document.createElement('a');
    link.download = `fuji-${selectedRecipe.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    link.href = processedPhoto;
    link.click();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="w-6 h-6 text-amber-500" />
            <h1 className="text-xl font-bold tracking-tight">FujiCam</h1>
          </div>
          <span className="text-sm text-zinc-400">Film Recipes</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Camera/Photo area */}
        <Card className="bg-zinc-900 border-zinc-800 shadow-xl">
          <CardContent className="p-4">
            <div className="aspect-video bg-zinc-950 rounded-lg overflow-hidden flex items-center justify-center">
              {photo ? (
                <img 
                  src={processedPhoto || photo} 
                  alt="Captured" 
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center space-y-4">
                  <Camera className="w-16 h-16 text-zinc-600 mx-auto" />
                  <p className="text-zinc-500 text-sm">
                    {isNative ? 'Tap to take a photo' : 'Select an image to apply film recipes'}
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex gap-3">
              <Button 
                onClick={takePhoto}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Camera className="w-4 h-4 mr-2" />
                {photo ? 'Retake' : 'Take Photo'}
              </Button>
              {photo && !processedPhoto && (
                <Button 
                  onClick={processPhoto}
                  disabled={isProcessing}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {isProcessing ? 'Processing...' : 'Apply Recipe'}
                </Button>
              )}
              {processedPhoto && (
                <Button 
                  onClick={downloadPhoto}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Save
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Film recipes */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {filmRecipes.map((recipe) => (
            <button
              key={recipe.name}
              onClick={() => setSelectedRecipe(recipe)}
              className={cn(
                "p-4 rounded-xl border text-left transition-all",
                selectedRecipe.name === recipe.name
                  ? "border-amber-500 bg-amber-500/10 shadow-lg"
                  : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm">{recipe.name}</span>
                <span 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: recipe.accentColor }}
                />
              </div>
              <p className="text-xs text-zinc-400">{recipe.description}</p>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}