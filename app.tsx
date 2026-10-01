import { useRef, useState, useEffect } from 'react';
import { Camera, Download, RefreshCw, Film } from 'lucide-react';

// Fujifilm film simulation presets
const FILM_PRESETS = [
  { id: 'classic-chrome', name: 'Classic Chrome', saturation: 0.85, contrast: 1.05, warmth: 0.95, grain: 0.3 },
  { id: 'provia', name: 'Provia', saturation: 1.0, contrast: 1.0, warmth: 1.0, grain: 0.1 },
  { id: 'velvia', name: 'Velvia', saturation: 1.3, contrast: 1.1, warmth: 1.05, grain: 0.2 },
  { id: 'astia', name: 'Astia', saturation: 1.1, contrast: 0.9, warmth: 1.02, grain: 0.15 },
  { id: 'mono', name: 'Monochrome', saturation: 0, contrast: 1.2, warmth: 1.0, grain: 0.4 },
  { id: 'sepia', name: 'Sepia', saturation: 0.5, contrast: 1.0, warmth: 1.3, grain: 0.3 },
];

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState('classic-chrome');
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setCameraError('Camera access denied. Please grant camera permissions.');
    }
  };

  const applyFilmPreset = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const preset = FILM_PRESETS.find(p => p.id === activePreset) || FILM_PRESETS[0];
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      // Apply saturation
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      r = gray + (r - gray) * preset.saturation;
      g = gray + (g - gray) * preset.saturation;
      b = gray + (b - gray) * preset.saturation;

      // Apply contrast
      r = ((r - 128) * preset.contrast) + 128;
      g = ((g - 128) * preset.contrast) + 128;
      b = ((b - 128) * preset.contrast) + 128;

      // Apply warmth
      r *= preset.warmth;
      b *= (2 - preset.warmth);

      // Apply grain
      const grain = (Math.random() - 0.5) * preset.grain * 50;
      r += grain;
      g += grain;
      b += grain;

      // Clamp values
      data[i] = Math.min(255, Math.max(0, r));
      data[i + 1] = Math.min(255, Math.max(0, g));
      data[i + 2] = Math.min(255, Math.max(0, b));
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        applyFilmPreset(ctx, canvas.width, canvas.height);
        setCapturedImage(canvas.toDataURL('image/jpeg', 0.95));
      }
    }
  };

  const downloadImage = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.download = `fuji-${activePreset}-${Date.now()}.jpg`;
      link.href = capturedImage;
      link.click();
    }
  };

  const resetCamera = () => {
    setCapturedImage(null);
    startCamera();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Film className="w-5 h-5 text-amber-500" />
          <h1 className="text-lg font-semibold tracking-wide">FujiCam</h1>
        </div>
        <span className="text-xs text-zinc-400 bg-zinc-800 px-3 py-1 rounded-full">
          {FILM_PRESETS.find(p => p.id === activePreset)?.name}
        </span>
      </header>

      {/* Main content */}
      <main className="p-4">
        {cameraError ? (
          <div className="text-center py-20">
            <p className="text-red-400 mb-4">{cameraError}</p>
            <button
              onClick={startCamera}
              className="bg-amber-500 hover:bg-amber-600 text-black font-medium px-6 py-2 rounded-lg transition-colors"
            >
              Retry Camera
            </button>
          </div>
        ) : (
          <>
            {/* Camera viewfinder */}
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-[3/4] max-w-sm mx-auto shadow-2xl border border-zinc-800">
              {!capturedImage ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
              )}

              {/* Film preset badge */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-medium">
                {FILM_PRESETS.find(p => p.id === activePreset)?.name}
              </div>

              {/* Capture button */}
              {!capturedImage && (
                <button
                  onClick={capturePhoto}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-white bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                >
                  <Camera className="w-6 h-6 text-white" />
                </button>
              )}

              {/* Action buttons after capture */}
              {capturedImage && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                  <button
                    onClick={resetCamera}
                    className="bg-zinc-800/80 hover:bg-zinc-700/80 backdrop-blur px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Retake
                  </button>
                  <button
                    onClick={downloadImage}
                    className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Save
                  </button>
                </div>
              )}
            </div>

            {/* Film presets */}
            <div className="mt-6 max-w-sm mx-auto">
              <h2 className="text-sm font-medium text-zinc-400 mb-3">Film Simulation</h2>
              <div className="grid grid-cols-3 gap-2">
                {FILM_PRESETS.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => setActivePreset(preset.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activePreset === preset.id
                        ? 'bg-amber-500 text-black'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

export default App;