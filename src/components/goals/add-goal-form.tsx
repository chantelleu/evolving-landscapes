import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addGoal } from "@/lib/data-store";

interface AddGoalFormProps {
  onGoalAdded: () => void;
}

export function AddGoalForm({ onGoalAdded }: AddGoalFormProps) {
  const [goalTitle, setGoalTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goalTitle.trim()) {
      addGoal(goalTitle.trim());
      setGoalTitle("");
      onGoalAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="New Goal Title"
        value={goalTitle}
        onChange={(e) => setGoalTitle(e.target.value)}
      />
      <Button type="submit">Add Goal</Button>
    </form>
  );
}
