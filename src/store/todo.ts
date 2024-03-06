import { defineStore } from 'pinia';
import type { ITodoItem } from '../types/todo';

interface ITodoState {
  stateStatus: 'all' | 'in_progress' | 'success';
  stateView: 'list' | 'grid';
  items: ITodoItem[];
  editItem: ITodoItem | null;
  removeSelectionItems: string[];
  isRemoveMode: boolean;
  isCreating: boolean;
}

export const useTodoStore = defineStore('todo', {
  state: (): ITodoState => ({
    stateStatus: 'all',
    stateView: 'grid',
    items: [],
    editItem: null,
    removeSelectionItems: [],
    isRemoveMode: false,
    isCreating: false,
  }),
  actions: {
    clearRemoveMode() {
      this.removeSelectionItems = [];
      this.isRemoveMode = false;
    },
  },
});
