export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  dueDate?: string;
  priority: TaskPriority;
  status: TaskStatus;
  category?: string;
}