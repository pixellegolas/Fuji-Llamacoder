export interface FilmRecipe {
  id: string
  name: string
  film: string
  description: string
  saturation: number
  contrast: number
  brightness: number
  hueRotate: number
  sepia: number
}

export const FILM_RECIPES: FilmRecipe[] = [
  {
    id: "classic-chrome",
    name: "Classic Chrome",
    film: "Fujifilm X-Trans",
    description: "Muted colors with rich shadows",
    saturation: 0.8,
    contrast: 1.1,
    brightness: 0.95,
    hueRotate: 0,
    sepia: 0.1
  },
  {
    id: "velvia",
    name: "Velvia",
    film: "Fujichrome Velvia 50",
    description: "Vivid, saturated colors",
    saturation: 1.4,
    contrast: 1.2,
    brightness: 1.0,
    hueRotate: 0,
    sepia: 0
  },
  {
    id: "provia",
    name: "Provia",
    film: "Fujichrome Provia 100F",
    description: "Natural, balanced colors",
    saturation: 1.0,
    contrast: 1.0,
    brightness: 1.0,
    hueRotate: 0,
    sepia: 0
  },
  {
    id: "astia",
    name: "Astia",
    film: "Fujichrome Astia 100F",
    description: "Soft, gentle tones",
    saturation: 0.9,
    contrast: 0.9,
    brightness: 1.05,
    hueRotate: 0,
    sepia: 0.05
  },
  {
    id: "pro-neg-hi",
    name: "Pro Neg Hi",
    film: "Fujicolor Pro 400H",
    description: "High contrast with warm tones",
    saturation: 0.85,
    contrast: 1.15,
    brightness: 0.95,
    hueRotate: 5,
    sepia: 0.15
  },
  {
    id: "pro-neg-std",
    name: "Pro Neg Std",
    film: "Fujicolor Pro 160NS",
    description: "Soft, natural skin tones",
    saturation: 0.9,
    contrast: 0.95,
    brightness: 1.0,
    hueRotate: 0,
    sepia: 0.1
  },
  {
    id: "cuban-negative",
    name: "Cuban Negative",
    film: "Fujicolor C200",
    description: "Warm, nostalgic tones with faded blacks",
    saturation: 0.7,
    contrast: 0.85,
    brightness: 1.1,
    hueRotate: 15,
    sepia: 0.3
  }
]