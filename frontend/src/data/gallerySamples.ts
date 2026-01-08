export type GallerySample = {
  id: string;
  title: string;
  original: string;
  mosaic: string;
  gridSize: string;
  colorLimit: number;
  brickCount: number;
  colorCount: number;
  brickTypes: string[];
  palette: { name: string; hex: string }[];
  stepsSummary?: string[];
};

export const gallerySamples: GallerySample[] = [
  {
    id: "sunrise",
    title: "Harbor Sunrise",
    original: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop",
    mosaic: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
    gridSize: "32x32",
    colorLimit: 16,
    brickCount: 1024,
    colorCount: 12,
    brickTypes: ["plate", "tile"],
    palette: [
      { name: "Sand Yellow", hex: "#D9B382" },
      { name: "Soft Coral", hex: "#E1796D" },
      { name: "Ocean Grey", hex: "#6B7A8F" },
      { name: "Deep Ink", hex: "#1F232B" }
    ],
    stepsSummary: ["Skylines base", "Harbor highlights", "Final accents"]
  },
  {
    id: "forest",
    title: "Emerald Forest",
    original: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop",
    mosaic: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop",
    gridSize: "48x48",
    colorLimit: 24,
    brickCount: 2304,
    colorCount: 18,
    brickTypes: ["plate", "round"],
    palette: [
      { name: "Pine", hex: "#2E4A3D" },
      { name: "Leaf", hex: "#6B8F4E" },
      { name: "Moss", hex: "#98B27A" },
      { name: "Stone", hex: "#A8A6A1" }
    ]
  },
  {
    id: "city",
    title: "Night City",
    original: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=800&auto=format&fit=crop",
    mosaic: "https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?q=80&w=800&auto=format&fit=crop",
    gridSize: "16x16",
    colorLimit: 8,
    brickCount: 256,
    colorCount: 8,
    brickTypes: ["tile"],
    palette: [
      { name: "Neon", hex: "#FEC84B" },
      { name: "Midnight", hex: "#1A1C2C" },
      { name: "Signal", hex: "#F2A2B8" }
    ]
  }
];
