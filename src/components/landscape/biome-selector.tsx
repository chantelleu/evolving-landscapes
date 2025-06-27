import React from "react";
import { Button } from "@/components/ui/button";
import { saveBiome } from "@/lib/data-store";

interface BiomeSelectorProps {
  onBiomeSelected: (biome: string) => void;
  currentBiome: string | null;
}

export function BiomeSelector({ onBiomeSelected, currentBiome }: BiomeSelectorProps) {
  const biomes = [
    { id: "temperate-plains", name: "Temperate Plains" },
    { id: "arid-desert", name: "Arid Desert" },
    { id: "quiet-tundra", name: "Quiet Tundra" },
  ];

  const handleBiomeChange = (biomeId: string) => {
    saveBiome(biomeId);
    onBiomeSelected(biomeId);
  };

  return (
    <div className="flex space-x-4 mb-8">
      {biomes.map((biome) => (
        <Button
          key={biome.id}
          onClick={() => handleBiomeChange(biome.id)}
          variant={currentBiome === biome.id ? "default" : "outline"}
        >
          {biome.name}
        </Button>
      ))}
    </div>
  );
}
