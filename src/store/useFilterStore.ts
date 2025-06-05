import { create } from 'zustand';
import type { TaskPriority, TaskStatus } from '../types/task';

interface FilterStore {
  search: string;
  status: TaskStatus | 'all';
  priority: TaskPriority | 'all';
  setSearch: (value: string) => void;
  setStatus: (value: TaskStatus | 'all') => void;
  setPriority: (value: TaskPriority | 'all') => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  search: '',
  status: 'all',
  priority: 'all',
  setSearch: (value) => set({ search: value }),
  setStatus: (value) => set({ status: value }),
  setPriority: (value) => set({ priority: value }),
}));
