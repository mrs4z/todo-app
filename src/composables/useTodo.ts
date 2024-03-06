import { v4 as uuidv4 } from 'uuid';
import type { ITodoCreateItem, ITodoItem } from '../types/todo';
import {
  ITodoDeleteItem,
  ITodoDeleteItems,
  ITodoEditItem,
  ITodoStatus,
  ITodoUpdateStatusItem,
} from '../types/todo';
import { useTodoStore } from '../store/todo';
import useStorage from './useStorage';

const useTodo = () => {
  const todoStore = useTodoStore();
  const storage = useStorage();

  const STORAGE_LIST_KEY = 'todo_items';

  const getAllTodoListFromStorage = () => storage.getItem(STORAGE_LIST_KEY) || [];

  const updateStorage = () => {
    storage.setItem(STORAGE_LIST_KEY, todoStore.items);
  };

  const createItem = ({ name, content }: ITodoCreateItem): boolean => {
    const makeItem: ITodoItem = {
      id: uuidv4(),
      name,
      content,
      status: ITodoStatus.IN_PROGRESS,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    todoStore.items.push(makeItem);
    updateStorage();

    return true;
  };

  const updateItem = ({ id, name, content }: ITodoEditItem): boolean => {
    const findItem = todoStore.items.find((u) => u.id === id);

    if (!findItem) return false;

    findItem.updatedAt = new Date();
    findItem.name = name;
    findItem.content = content;

    updateStorage();

    return true;
  };

  const updateItemStatus = ({ id, status }: ITodoUpdateStatusItem): boolean => {
    const findItem = todoStore.items.find((u) => u.id === id);

    if (!findItem) return false;

    findItem.updatedAt = new Date();
    findItem.status = status;

    updateStorage();

    return true;
  };

  const deleteItems = ({ ids }: ITodoDeleteItems): boolean => {
    if (!ids.length) return false;

    const items = [...todoStore.items];

    for (const id of ids) {
      const findIndexItem = items.findIndex((u) => u.id === id);
      if (findIndexItem > -1) {
        items.splice(findIndexItem, 1);
      }
    }

    todoStore.items = items;
    updateStorage();
    return true;
  };

  return {
    createItem,
    updateItem,
    deleteItems,
    updateItemStatus,
    getAllTodoListFromStorage,
  };
};

export default useTodo;
