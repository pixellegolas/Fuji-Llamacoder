export interface FilmRecipe {
  name: string;
  description: string;
  accentColor: string;
  // Film simulation parameters
  saturation: number;
  contrast: number;
  brightness: number;
  warmth: number;
  grain: number;
  vignette: number;
  shadowTint: string;
  highlightTint: string;
}

export const filmRecipes: FilmRecipe[] = [
  {
    name: "Classic Cuban Negative",
    description: "Warm, faded, nostalgic tones",
    accentColor: "#e8a87c",
    saturation: 0.85,
    contrast: 0.9,
    brightness: 1.1,
    warmth: 1.25,
    grain: 0.2,
    vignette: 0.15,
    shadowTint: "#4a2c17",
    highlightTint: "#ffe8d6"
  },
  {
    name: "Classic Chrome",
    description: "Muted colors, high contrast",
    accentColor: "#d4a574",
    saturation: 0.7,
    contrast: 1.15,
    brightness: 1.0,
    warmth: 1.05,
    grain: 0.15,
    vignette: 0.1,
    shadowTint: "#4a3728",
    highlightTint: "#f5e6d3"
  },
  {
    name: "Velvia",
    description: "Vivid, saturated colors",
    accentColor: "#ff6b6b",
    saturation: 1.4,
    contrast: 1.1,
    brightness: 1.05,
    warmth: 1.1,
    grain: 0.05,
    vignette: 0.05,
    shadowTint: "#2d1b4e",
    highlightTint: "#ffe4e1"
  },
  {
    name: "Provia",
    description: "Natural, balanced colors",
    accentColor: "#4ecdc4",
    saturation: 1.0,
    contrast: 1.0,
    brightness: 1.0,
    warmth: 1.0,
    grain: 0.08,
    vignette: 0.05,
    shadowTint: "#1a1a2e",
    highlightTint: "#ffffff"
  },
  {
    name: "Astia",
    description: "Soft, gentle tones",
    accentColor: "#ffd93d",
    saturation: 0.85,
    contrast: 0.9,
    brightness: 1.1,
    warmth: 1.15,
    grain: 0.1,
    vignette: 0.08,
    shadowTint: "#3d2c1f",
    highlightTint: "#fff5e6"
  },
  {
    name: "Monochrome",
    description: "Classic black & white",
    accentColor: "#a8a8a8",
    saturation: 0,
    contrast: 1.2,
    brightness: 1.0,
    warmth: 1.0,
    grain: 0.2,
    vignette: 0.15,
    shadowTint: "#000000",
    highlightTint: "#ffffff"
  },
  {
    name: "Sepia",
    description: "Warm vintage tones",
    accentColor: "#c4a35a",
    saturation: 0.5,
    contrast: 0.95,
    brightness: 1.05,
    warmth: 1.3,
    grain: 0.25,
    vignette: 0.2,
    shadowTint: "#3d2b1f",
    highlightTint: "#f5deb3"
  }
];

export function applyFilmRecipe(ctx: CanvasRenderingContext2D, recipe: FilmRecipe) {
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const data = imageData.data;
  
  // Apply color adjustments
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];
    
    // Convert to grayscale for monochrome
    if (recipe.saturation === 0) {
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      r = g = b = gray;
    } else {
      // Apply saturation
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      r = gray + (r - gray) * recipe.saturation;
      g = gray + (g - gray) * recipe.saturation;
      b = gray + (b - gray) * recipe.saturation;
    }
    
    // Apply contrast
    r = ((r - 128) * recipe.contrast) + 128;
    g = ((g - 128) * recipe.contrast) + 128;
    b = ((b - 128) * recipe.contrast) + 128;
    
    // Apply brightness
    r *= recipe.brightness;
    g *= recipe.brightness;
    b *= recipe.brightness;
    
    // Apply warmth
    r *= recipe.warmth;
    b *= (2 - recipe.warmth);
    
    // Apply shadow/highlight tints
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    if (luminance < 128) {
      const shadowR = parseInt(recipe.shadowTint.slice(1, 3), 16);
      const shadowG = parseInt(recipe.shadowTint.slice(3, 5), 16);
      const shadowB = parseInt(recipe.shadowTint.slice(5, 7), 16);
      const shadowAmount = (128 - luminance) / 128 * 0.3;
      r += (shadowR - r) * shadowAmount;
      g += (shadowG - g) * shadowAmount;
      b += (shadowB - b) * shadowAmount;
    } else {
      const highlightR = parseInt(recipe.highlightTint.slice(1, 3), 16);
      const highlightG = parseInt(recipe.highlightTint.slice(3, 5), 16);
      const highlightB = parseInt(recipe.highlightTint.slice(5, 7), 16);
      const highlightAmount = (luminance - 128) / 128 * 0.3;
      r += (highlightR - r) * highlightAmount;
      g += (highlightG - g) * highlightAmount;
      b += (highlightB - b) * highlightAmount;
    }
    
    // Clamp values
    data[i] = Math.min(255, Math.max(0, r));
    data[i + 1] = Math.min(255, Math.max(0, g));
    data[i + 2] = Math.min(255, Math.max(0, b));
  }
  
  ctx.putImageData(imageData, 0, 0);
  
  // Apply grain
  if (recipe.grain > 0) {
    const grainData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const grainPixels = grainData.data;
    for (let i = 0; i < grainPixels.length; i += 4) {
      const grain = (Math.random() - 0.5) * recipe.grain * 255;
      grainPixels[i] += grain;
      grainPixels[i + 1] += grain;
      grainPixels[i + 2] += grain;
    }
    ctx.putImageData(grainData, 0, 0);
  }
  
  // Apply vignette
  if (recipe.vignette > 0) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
    
    const vignetteData = ctx.getImageData(0, 0, width, height);
    const vignettePixels = vignetteData.data;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        const vignetteAmount = (dist / maxDist) * recipe.vignette;
        const idx = (y * width + x) * 4;
        vignettePixels[idx] *= (1 - vignetteAmount);
        vignettePixels[idx + 1] *= (1 - vignetteAmount);
        vignettePixels[idx + 2] *= (1 - vignetteAmount);
      }
    }
    ctx.putImageData(vignetteData, 0, 0);
  }
}