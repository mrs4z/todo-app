<template lang="pug">
.todo__item(
  @dblclick="todoItem.onSetEditModeHandler" :data-id="props.item.id"
  :class="{ 'todo__item--success': props.item.status === ITodoStatus.SUCCESS }"
)
  .todo__item-header
    .todo__item-header-title
      UiCheckbox(
        :model-value="todoItem.isSelectedRemoveList"
        @update:model-value="todoItem.onToggleSelectionHandler"
        v-if="todoStore.isRemoveMode"
      )
      div {{ props.item.name }}
    .todo__item-header-action(
      @click="todoItem.onSetEditModeHandler"
    )
      IconEdit
  .todo__item-content {{ props.item.content }}
  .todo__item-status
    TodoItemStatus(
      :model-value="props.item.status"
      @update:model-value="todoItem.onUpdateStatusHandler"
    )
  .todo__item-date Обновлено {{ dateFormatter }}
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { ITodoItem } from '../../types/todo';
import { ITodoStatus } from '../../types/todo';
import TodoItemStatus from '../TodoItemStatus.vue';
import useTodo from '../../composables/useTodo';
import { useDayjs } from '../../composables/useDayjs';
import UiCheckbox from '../../ui/ui-checkbox.vue';
import { useTodoStore } from '../../store/todo';
import IconEdit from '../icons/IconEdit.vue';
import useTodoItem from '../../composables/useTodoItem';

interface IProps {
  item: ITodoItem;
}

const props = defineProps<IProps>();
const todo = useTodo();
const todoStore = useTodoStore();
const dayJs = useDayjs();
const todoItem = useTodoItem(props.item);

const dateFormatter = computed(() => dayJs(props.item.updatedAt).format('YYYY-MM-DD HH:mm'));
</script>

<style lang="scss" scoped>
.todo__item {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  border-radius: 4px;

  user-select: none;

  cursor: grab;

  background: #f0f3fe;

  &--success {
    background: #fff4ed;
  }

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-title {
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 2px;
    }

    &-action {
      color: #656565;
      cursor: pointer;
    }
  }

  &-content {
    font-size: 14px;
    line-height: 20px;
    color: #5d5d5d;
  }

  &-date {
    font-size: 12px;
    color: #b0b0b0;
  }
}
</style>
