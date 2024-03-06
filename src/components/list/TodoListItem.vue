<template lang="pug">
.todo__item(
  @dblclick="onSetEditModeHandler"
  :class="{ 'todo__item--completed': item.status === ITodoStatus.SUCCESS, 'todo__item--remove-mode': todoStore.isRemoveMode }"
)
  .todo__item-selection(v-if="todoStore.isRemoveMode")
      UiCheckbox(
        :model-value="isSelectedRemoveList"
        @update:model-value="onToggleSelectionHandler"
      )
  .todo__item-name {{ props.item.name }}
  .todo__item-tag
    TodoItemStatus(
      :model-value="props.item.status"
      @update:model-value="onUpdateStatusHandler"
    )
  .todo__item-action(
    @click="onSetEditModeHandler"
  )
    IconEdit

</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ITodoItem } from '../../types/todo';
import { ITodoStatus } from '../../types/todo';
import TodoItemStatus from '../TodoItemStatus.vue';
import useTodo from '../../composables/useTodo';
import IconEdit from '../icons/IconEdit.vue';
import { useTodoStore } from '../../store/todo';
import UiCheckbox from '../../ui/ui-checkbox.vue';

const todo = useTodo();
const todoStore = useTodoStore();
interface IProps {
  item: ITodoItem;
}

const props = defineProps<IProps>();
const isSelectedRemoveList = computed(() =>
  todoStore.removeSelectionItems.some((u) => u === props.item.id),
);

const onUpdateStatusHandler = (status: number) => {
  todo.updateItemStatus({
    id: props.item.id,
    status: status as ITodoStatus,
  });
};

const onSetEditModeHandler = () => {
  todoStore.editItem = props.item;
};

const onToggleSelectionHandler = (event: boolean) => {
  if (event) {
    todoStore.removeSelectionItems.push(props.item.id);
  } else {
    const findItemIndex = todoStore.removeSelectionItems.findIndex((u) => u === props.item.id);
    todoStore.removeSelectionItems.splice(findItemIndex, 1);
  }
};
</script>

<style lang="scss" scoped>
.todo__item {
  padding: 14px 10px;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  align-items: center;
  gap: 10px;
  color: #525252;

  cursor: pointer;

  background: #efefef;

  &-name {
    user-select: none;
  }

  &--remove-mode {
    grid-template-columns: 15px 1fr 1fr auto;
  }

  &--completed {
    background: #fff4ed;
  }

  &--completed &-name {
    text-decoration: line-through;
    color: #f8783f;
  }

  &-selection {
  }

  &-action {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
