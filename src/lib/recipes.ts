export interface FilmRecipe {
  id: string;
  name: string;
  film: string;
  grain: string;
  color: string;
  shadow: string;
  highlight: string;
  saturation: number;
  contrast: number;
  sepia: number;
  hueRotate: number;
  brightness: number;
  grainAmount: number;
  grainSize: number;
  halation: number;
  bloom: number;
  warmth: number;
}

export const FILM_RECIPES: FilmRecipe[] = [
  {
    id: "classic-cuban-neg",
    name: "Classic Cuban Neg",
    film: "Kodak Gold 200",
    grain: "Heavy",
    color: "Warm, muted",
    shadow: "Soft",
    highlight: "Creamy",
    saturation: 0.85,
    contrast: 0.9,
    sepia: 0.25,
    hueRotate: -5,
    brightness: 1.05,
    grainAmount: 0.35,
    grainSize: 1.5,
    halation: 0.4,
    bloom: 0.3,
    warmth: 1.15,
  },
  {
    id: "portra-400",
    name: "Portra 400",
    film: "Kodak Portra 400",
    grain: "Fine",
    color: "Natural, soft",
    shadow: "Gentle",
    highlight: "Smooth",
    saturation: 0.9,
    contrast: 0.95,
    sepia: 0.1,
    hueRotate: 0,
    brightness: 1.0,
    grainAmount: 0.15,
    grainSize: 1.0,
    halation: 0.15,
    bloom: 0.15,
    warmth: 1.05,
  },
  {
    id: "velvia",
    name: "Velvia",
    film: "Fujifilm Velvia 50",
    grain: "Fine",
    color: "Vivid, saturated",
    shadow: "Deep",
    highlight: "Bright",
    saturation: 1.4,
    contrast: 1.2,
    sepia: 0.0,
    hueRotate: 5,
    brightness: 1.0,
    grainAmount: 0.1,
    grainSize: 0.8,
    halation: 0.05,
    bloom: 0.05,
    warmth: 1.0,
  },
  {
    id: "acros",
    name: "ACROS",
    film: "Fujifilm ACROS 100",
    grain: "Fine",
    color: "Monochrome",
    shadow: "Deep",
    highlight: "Crisp",
    saturation: 0.0,
    contrast: 1.1,
    sepia: 0.0,
    hueRotate: 0,
    brightness: 0.95,
    grainAmount: 0.2,
    grainSize: 1.2,
    halation: 0.0,
    bloom: 0.0,
    warmth: 1.0,
  },
  {
    id: "pro-neg-hi",
    name: "Pro Neg Hi",
    film: "Fujifilm Pro 400H",
    grain: "Fine",
    color: "Soft, pastel",
    shadow: "Soft",
    highlight: "Gentle",
    saturation: 0.8,
    contrast: 0.85,
    sepia: 0.05,
    hueRotate: 0,
    brightness: 1.05,
    grainAmount: 0.12,
    grainSize: 0.9,
    halation: 0.2,
    bloom: 0.2,
    warmth: 1.02,
  },
  {
    id: "kodachrome-64",
    name: "Kodachrome 64",
    film: "Kodak Kodachrome 64",
    grain: "Fine",
    color: "Rich, classic",
    shadow: "Deep",
    highlight: "Warm",
    saturation: 1.1,
    contrast: 1.05,
    sepia: 0.15,
    hueRotate: -3,
    brightness: 1.0,
    grainAmount: 0.15,
    grainSize: 1.0,
    halation: 0.1,
    bloom: 0.1,
    warmth: 1.1,
  },
];