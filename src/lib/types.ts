export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface Goal {
  id: string;
  title: string;
  createdAt: Date;
  tasks: Task[];
}
