export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

export type FilterType = 'all' | 'completed' | 'incomplete';
