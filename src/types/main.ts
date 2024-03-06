import { defineStore } from 'pinia';
import useTodo from '../composables/useTodo.ts';
import { useTodoStore } from '../store/todo.ts';
import { ITodoItem } from './todo.ts';

export const useMainStore = defineStore('main', {
  actions: {
    init() {
      const todo = useTodo();
      const todoStore = useTodoStore();

      todoStore.items = todo.getAllTodoListFromStorage() as ITodoItem[];
    },
  },
});
