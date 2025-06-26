import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addTask } from "@/lib/data-store";

interface AddTaskFormProps {
  goalId: string;
  onTaskAdded: () => void;
}

export function AddTaskForm({ goalId, onTaskAdded }: AddTaskFormProps) {
  const [taskTitle, setTaskTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      addTask(goalId, taskTitle.trim());
      setTaskTitle("");
      onTaskAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2 mt-2">
      <Input
        type="text"
        placeholder="New Task Title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <Button type="submit">Add Task</Button>
    </form>
  );
}
