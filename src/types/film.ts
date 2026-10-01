export interface FilmRecipe {
  id: string
  name: string
  film: string
  description: string
  grain: number
  shadows: number
  highlights: number
  color: number
}

export const FILM_RECIPES: FilmRecipe[] = [
  {
    id: "classic-cuban-negative",
    name: "Classic Cuban Negative",
    film: "Fujifilm X100V",
    description: "Warm, nostalgic tones with soft contrast",
    grain: 0.95,
    shadows: 25,
    highlights: 12,
    color: 1.1
  },
  {
    id: "classic-chrome",
    name: "Classic Chrome",
    film: "Fujifilm X100V",
    description: "Muted colors with deep shadows",
    grain: 0.9,
    shadows: 20,
    highlights: 10,
    color: 0.8
  },
  {
    id: "velvia",
    name: "Velvia",
    film: "Fujifilm X-T4",
    description: "Vivid, saturated colors",
    grain: 1.0,
    shadows: 15,
    highlights: 5,
    color: 1.2
  },
  {
    id: "pro-neg",
    name: "Pro Neg Hi",
    film: "Fujifilm X-Pro3",
    description: "Soft contrast with warm tones",
    grain: 0.85,
    shadows: 25,
    highlights: 15,
    color: 0.9
  },
  {
    id: "acros",
    name: "ACROS",
    film: "Fujifilm X-E4",
    description: "Classic black and white",
    grain: 1.1,
    shadows: 30,
    highlights: 20,
    color: 0.5
  }
]