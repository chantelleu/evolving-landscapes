"use client";

import { AddGoalForm } from "@/components/goals/add-goal-form";
import { GoalList } from "@/components/goals/goal-list";
import { useState } from "react";

export default function Home() {
  const [refreshGoals, setRefreshGoals] = useState(0);

  const handleGoalUpdate = () => {
    setRefreshGoals(prev => prev + 1);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Evolving Landscapes</h1>
      <div className="mb-8">
        <AddGoalForm onGoalAdded={handleGoalUpdate} />
      </div>
      <GoalList key={refreshGoals} />
    </main>
  );
}
