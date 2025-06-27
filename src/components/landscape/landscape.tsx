import React from "react";

interface LandscapeProps {
  biome: "temperate-plains" | "arid-desert" | "quiet-tundra";
  // In the future, this will be an array of active assets to display
  activeAssets?: string[]; 
}

export function Landscape({ biome, activeAssets }: LandscapeProps) {
  const biomeImagePath = `/assets/images/landscape/${biome}.svg`;

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-lg bg-gray-100">
      {/* Base Biome Image */}
      <img 
        src={biomeImagePath} 
        alt={`${biome} biome`} 
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Placeholder for dynamically loaded assets */}
      {activeAssets && activeAssets.map((assetPath, index) => (
        <img
          key={index}
          src={`/assets/images/landscape/${assetPath}.svg`}
          alt="landscape asset"
          className="absolute object-contain"
          style={{ 
            // These styles will be dynamic based on asset type and position
            bottom: '10%', 
            left: `${10 + index * 20}%`, 
            width: '100px', 
            height: '100px' 
          }}
        />
      ))}
    </div>
  );
}
