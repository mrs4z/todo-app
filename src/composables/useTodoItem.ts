import { computed } from 'vue';
import type { ITodoItem } from '../types/todo';
import { ITodoStatus } from '../types/todo';
import { useTodoStore } from '../store/todo';
import useTodo from './useTodo';

const useTodoItem = (item: ITodoItem) => {
  const todoStore = useTodoStore();
  const todo = useTodo();

  const isSelectedRemoveList = computed(() =>
    todoStore.removeSelectionItems.some((u) => u === item.id),
  );

  const onUpdateStatusHandler = (status: number) => {
    todo.updateItemStatus({
      id: item.id,
      status: status as ITodoStatus,
    });
  };

  const onSetEditModeHandler = () => {
    todoStore.editItem = item;
  };

  const onToggleSelectionHandler = (event: boolean) => {
    if (event) {
      todoStore.removeSelectionItems.push(item.id);
    } else {
      const findItemIndex = todoStore.removeSelectionItems.findIndex((u) => u === item.id);
      todoStore.removeSelectionItems.splice(findItemIndex, 1);
    }
  };

  return {
    isSelectedRemoveList,
    onUpdateStatusHandler,
    onSetEditModeHandler,
    onToggleSelectionHandler,
  };
};

export default useTodoItem;
