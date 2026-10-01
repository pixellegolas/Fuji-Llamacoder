import { useState, useRef, useEffect } from "react";
import { Camera, RefreshCw, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FILM_RECIPES } from "@/lib/recipes";
import RecipeSelector from "@/components/RecipeSelector";
import PhotoPreview from "@/components/PhotoPreview";

export default function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState(FILM_RECIPES[0]?.id || "");
  const [photo, setPhoto] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const selectedRecipe = FILM_RECIPES.find((r) => r.id === selectedRecipeId) || FILM_RECIPES[0];

  useEffect(() => {
    // Auto-start camera on mount
    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err) {
      setCameraError("Camera permission denied. Please enable camera access in settings.");
      setCameraActive(false);
    }
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !cameraActive) return;
    
    setIsCapturing(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth || 1920;
      canvas.height = videoRef.current.videoHeight || 1080;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
        setPhoto(dataUrl);
      }
    } finally {
      setIsCapturing(false);
    }
  };

  const downloadPhoto = () => {
    if (photo) {
      const link = document.createElement("a");
      link.download = `film-${selectedRecipe.id}-${Date.now()}.jpg`;
      link.href = photo;
      link.click();
    }
  };

  const resetCamera = () => {
    setPhoto(null);
    // Restart camera if it was stopped
    if (!cameraActive) {
      startCamera();
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-3">
        <div>
          <h1 className="font-serif text-xl font-bold text-amber-400">FilmLab</h1>
          <p className="text-xs text-zinc-500">Fujifilm Film Recipes</p>
        </div>
        {photo && (
          <Button
            variant="ghost"
            onClick={resetCamera}
            className="text-zinc-400 hover:text-zinc-100"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </header>

      {/* Main content */}
      <main className="flex flex-1 flex-col">
        {cameraError && (
          <div className="m-4 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400">
            {cameraError}
            <Button
              onClick={startCamera}
              className="mt-2 bg-amber-500 text-zinc-950 hover:bg-amber-400"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry Camera
            </Button>
          </div>
        )}

        {photo ? (
          <div className="flex-1 p-4">
            <PhotoPreview
              imageData={photo}
              recipe={selectedRecipe}
              onRetake={resetCamera}
              onDownload={downloadPhoto}
            />
          </div>
        ) : (
          <div className="relative flex-1">
            {/* Camera viewfinder */}
            <div className="absolute inset-0 bg-black">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                playsInline
                muted
                autoPlay
              />
              {!cameraActive && !cameraError && (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <Camera className="mx-auto mb-4 h-12 w-12 text-zinc-600" />
                    <p className="text-sm text-zinc-500">Starting camera...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Recipe selector overlay */}
            <div className="absolute bottom-24 left-0 right-0 px-4">
              <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/90 p-3 backdrop-blur">
                <div className="flex gap-2">
                  {FILM_RECIPES.map((recipe) => (
                    <button
                      key={recipe.id}
                      onClick={() => setSelectedRecipeId(recipe.id)}
                      className={`flex-shrink-0 rounded-xl px-4 py-2 text-sm transition-all ${
                        selectedRecipeId === recipe.id
                          ? "bg-amber-500 text-zinc-950"
                          : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                      }`}
                    >
                      {recipe.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Capture button */}
            {cameraActive && (
              <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                <button
                  onClick={capturePhoto}
                  disabled={isCapturing}
                  className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-transparent transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  <div className="h-12 w-12 rounded-full bg-white" />
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}