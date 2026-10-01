import { useEffect, useRef, useState } from "react";
import { Camera, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilmRecipe } from "@/lib/recipes";

interface CameraViewProps {
  isActive: boolean;
  onCapture: (imageData: string) => void;
  onStart: () => void;
  onError: (error: string) => void;
  recipe: FilmRecipe;
}

export default function CameraView({ isActive, onCapture, onStart, onError, recipe }: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const startCamera = async () => {
      setIsLoading(true);
      try {
        // Check if running in secure context
        if (!window.isSecureContext) {
          onError("Camera requires HTTPS. Please open this app in a secure context.");
          return;
        }

        // Check if getUserMedia is available
        if (!navigator.mediaDevices?.getUserMedia) {
          onError("Camera not supported in this browser.");
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        });
        
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setIsLoading(false);
      } catch (err: any) {
        setIsLoading(false);
        if (err.name === "NotAllowedError") {
          onError("Camera permission was denied. Please allow camera access in your browser settings.");
        } else if (err.name === "NotFoundError") {
          onError("No camera device found on this device.");
        } else if (err.name === "NotReadableError") {
          onError("Camera is already in use by another application.");
        } else {
          onError("Unable to access camera. You can upload a photo instead.");
        }
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isActive, onError]);

  const handleCapture = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.filter = `saturate(${recipe.saturation}) contrast(${recipe.contrast}) sepia(${recipe.sepia}) hue-rotate(${recipe.hueRotate}deg) brightness(${recipe.brightness})`;
    ctx.drawImage(videoRef.current, 0, 0);
    onCapture(canvas.toDataURL("image/jpeg", 0.95));
  };

  if (!isActive) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
        <div className="text-center">
          <Camera className="mx-auto mb-4 h-12 w-12 text-zinc-600" />
          <p className="mb-4 text-sm text-zinc-400">Camera is off</p>
          <Button onClick={onStart} className="bg-amber-500 text-zinc-950 hover:bg-amber-400">
            <Video className="mr-2 h-4 w-4" />
            Start Camera
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-black">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-950/80">
          <div className="text-center">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
            <p className="text-sm text-zinc-400">Requesting camera access...</p>
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        className="aspect-video w-full object-cover"
        playsInline
        muted
      />
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <Button
          onClick={handleCapture}
          className="h-14 w-14 rounded-full border-4 border-white bg-transparent p-0 hover:bg-white/20"
          aria-label="Capture photo"
        >
          <span className="h-10 w-10 rounded-full bg-white" />
        </Button>
      </div>
      <div className="absolute right-4 top-4 rounded-full bg-zinc-950/70 px-3 py-1 text-xs text-amber-400">
        {recipe.name}
      </div>
    </div>
  );
}