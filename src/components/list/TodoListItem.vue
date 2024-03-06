<template lang="pug">
.todo__item(
  @dblclick="todoItem.onSetEditModeHandler"
  :class="{ 'todo__item--completed': item.status === ITodoStatus.SUCCESS, 'todo__item--remove-mode': todoStore.isRemoveMode }"
)
  .todo__item-selection(v-if="todoStore.isRemoveMode")
      UiCheckbox(
        :model-value="todoItem.isSelectedRemoveList"
        @update:model-value="todoItem.onToggleSelectionHandler"
      )
  .todo__item-name {{ props.item.name }}
  .todo__item-tag
    TodoItemStatus(
      :model-value="props.item.status"
      @update:model-value="todoItem.onUpdateStatusHandler"
    )
  .todo__item-action(
    @click="todoItem.onSetEditModeHandler"
  )
    IconEdit

</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ITodoItem } from '../../types/todo';
import { ITodoStatus } from '../../types/todo';
import TodoItemStatus from '../TodoItemStatus.vue';
import IconEdit from '../icons/IconEdit.vue';
import { useTodoStore } from '../../store/todo';
import UiCheckbox from '../../ui/ui-checkbox.vue';
import useTodoItem from '../../composables/useTodoItem';

const todoStore = useTodoStore();
interface IProps {
  item: ITodoItem;
}

const props = defineProps<IProps>();
const todoItem = useTodoItem(props.item);
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
