import React, { useState, useEffect } from "react";
import { getGoals } from "@/lib/data-store";
import { Goal } from "@/lib/types";
import { GoalItem } from "./goal-item";

export function GoalList() {
  const [goals, setGoals] = useState<Goal[]>([]);

  const loadGoals = () => {
    setGoals(getGoals());
  };

  useEffect(() => {
    loadGoals();
  }, []);

  return (
    <div className="w-full max-w-2xl">
      {goals.length === 0 ? (
        <p className="text-center text-gray-500">No goals set yet. Add your first goal above!</p>
      ) : (
        goals.map((goal) => (
          <GoalItem key={goal.id} goal={goal} onUpdate={loadGoals} />
        ))
      )}
    </div>
  );
}
