"use client";

import { AddGoalForm } from "@/components/goals/add-goal-form";
import { GoalList } from "@/components/goals/goal-list";
import { Landscape } from "@/components/landscape/landscape";
import { useState, useEffect } from "react";
import { getBiome, saveBiome } from "@/lib/data-store";
import { BiomeSelector } from "@/components/landscape/biome-selector";

export default function Home() {
  const [refreshGoals, setRefreshGoals] = useState(0);
  const [currentBiome, setCurrentBiome] = useState<string | null>(null);

  useEffect(() => {
    const storedBiome = getBiome();
    if (storedBiome) {
      setCurrentBiome(storedBiome);
    } else {
      // Set a default biome if none is stored
      const defaultBiome = "temperate-plains";
      saveBiome(defaultBiome);
      setCurrentBiome(defaultBiome);
    }
  }, []);

  const handleGoalUpdate = () => {
    setRefreshGoals(prev => prev + 1);
  };

  const handleBiomeSelected = (biome: string) => {
    setCurrentBiome(biome);
  };

  if (!currentBiome) {
    return null; // Or a loading spinner
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Evolving Landscapes</h1>
      
      <div className="mb-8">
        <BiomeSelector onBiomeSelected={handleBiomeSelected} currentBiome={currentBiome} />
      </div>

      <div className="mb-8 w-full max-w-2xl">
        <Landscape biome={currentBiome as "temperate-plains" | "arid-desert" | "quiet-tundra"} />
      </div>

      <div className="mb-8">
        <AddGoalForm onGoalAdded={handleGoalUpdate} />
      </div>
      <GoalList key={refreshGoals} />
    </main>
  );
}