import { Goal, Task } from "./types";

const LOCAL_STORAGE_GOALS_KEY = "evolving-landscapes-goals";
const LOCAL_STORAGE_BIOME_KEY = "evolving-landscapes-biome";

function generateUniqueId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function getGoals(): Goal[] {
  if (typeof window === "undefined") {
    return [];
  }
  const data = localStorage.getItem(LOCAL_STORAGE_GOALS_KEY);
  if (data) {
    const parsedData: Goal[] = JSON.parse(data);
    // Convert createdAt strings back to Date objects
    return parsedData.map(goal => ({
      ...goal,
      createdAt: new Date(goal.createdAt),
      tasks: goal.tasks.map(task => ({
        ...task,
        createdAt: new Date(task.createdAt)
      }))
    }));
  }
  return [];
}

export function saveGoals(goals: Goal[]): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(LOCAL_STORAGE_GOALS_KEY, JSON.stringify(goals));
}

export function getBiome(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(LOCAL_STORAGE_BIOME_KEY);
}

export function saveBiome(biome: string): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(LOCAL_STORAGE_BIOME_KEY, biome);
}

export function addGoal(title: string): Goal {
  const goals = getGoals();
  const newGoal: Goal = {
    id: generateUniqueId(),
    title,
    createdAt: new Date(),
    tasks: [],
  };
  goals.push(newGoal);
  saveGoals(goals);
  return newGoal;
}

export function addTask(goalId: string, title: string): Goal | undefined {
  const goals = getGoals();
  const goalIndex = goals.findIndex((g) => g.id === goalId);

  if (goalIndex > -1) {
    const newTask: Task = {
      id: generateUniqueId(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    goals[goalIndex].tasks.push(newTask);
    saveGoals(goals);
    return goals[goalIndex];
  }
  return undefined;
}

export function toggleTaskCompletion(goalId: string, taskId: string): Goal | undefined {
  const goals = getGoals();
  const goalIndex = goals.findIndex((g) => g.id === goalId);

  if (goalIndex > -1) {
    const taskIndex = goals[goalIndex].tasks.findIndex((t) => t.id === taskId);
    if (taskIndex > -1) {
      goals[goalIndex].tasks[taskIndex].completed = !goals[goalIndex].tasks[taskIndex].completed;
      saveGoals(goals);
      return goals[goalIndex];
    }
  }
  return undefined;
}

export function deleteGoal(goalId: string): void {
  const goals = getGoals();
  const updatedGoals = goals.filter((g) => g.id !== goalId);
  saveGoals(updatedGoals);
}

export function deleteTask(goalId: string, taskId: string): Goal | undefined {
  const goals = getGoals();
  const goalIndex = goals.findIndex((g) => g.id === goalId);

  if (goalIndex > -1) {
    goals[goalIndex].tasks = goals[goalIndex].tasks.filter((t) => t.id !== taskId);
    saveGoals(goals);
    return goals[goalIndex];
  }
  return undefined;
}
