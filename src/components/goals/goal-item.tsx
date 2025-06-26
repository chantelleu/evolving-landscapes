import React from "react";
import { Goal, Task } from "@/lib/types";
import { toggleTaskCompletion, deleteGoal, deleteTask } from "@/lib/data-store";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AddTaskForm } from "./add-task-form";

interface GoalItemProps {
  goal: Goal;
  onUpdate: () => void;
}

export function GoalItem({ goal, onUpdate }: GoalItemProps) {
  const handleToggleTask = (taskId: string) => {
    toggleTaskCompletion(goal.id, taskId);
    onUpdate();
  };

  const handleDeleteGoal = () => {
    deleteGoal(goal.id);
    onUpdate();
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(goal.id, taskId);
    onUpdate();
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">{goal.title}</h3>
        <Button variant="destructive" size="sm" onClick={handleDeleteGoal}>
          Delete Goal
        </Button>
      </div>
      <div className="ml-4">
        {goal.tasks.length === 0 ? (
          <p className="text-gray-500">No tasks yet. Add one below!</p>
        ) : (
          goal.tasks.map((task: Task) => (
            <div key={task.id} className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => handleToggleTask(task.id)}
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className={`ml-2 text-sm font-medium ${task.completed ? "line-through text-gray-500" : ""}`}
                >
                  {task.title}
                </label>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleDeleteTask(task.id)}>
                Delete
              </Button>
            </div>
          ))
        )}
      </div>
      <AddTaskForm goalId={goal.id} onTaskAdded={onUpdate} />
    </div>
  );
}
