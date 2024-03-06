<template lang="pug">
transition-group.todo__list(name="todo-list", tag="div")
  .todo__list-empty(v-if="!filteredItems.length")
    template(v-if="todoStore.stateStatus === 'all'") Вы еще не добавили ни одной задачи 🔥
    template(v-else) В данный момент тут еще нет задач 🍮
  TodoListItem(
    v-for="item in filteredItems" :key="item.id"
    v-bind="{ item }"
  )
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import TodoListItem from './TodoListItem.vue';
import { useTodoStore } from '../../store/todo';
import { ITodoStatus } from '../../types/todo';

const todoStore = useTodoStore();

const filteredItems = computed(() => {
  const status = todoStore.stateStatus;
  let sortedItems = todoStore.items;

  if (status === 'in_progress') {
    sortedItems = sortedItems.filter((u) => u.status === ITodoStatus.IN_PROGRESS);
  }

  if (status === 'success') {
    sortedItems = sortedItems.filter((u) => u.status === ITodoStatus.SUCCESS);
  }

  sortedItems.sort((a, b) => a.status - b.status);

  return sortedItems;
});
</script>

<style lang="scss" scoped>
.todo__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;

  &-empty {
    padding: 12px;
    border-radius: 4px;
    background: #eff7ff;
    line-height: 20px;
  }
}

.todo-list-enter-active,
.todo-list-leave-active {
  transition: all 0.5s;
}
.todo-list-enter,
.todo-list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.todo-list-move {
  transition: transform 0.5s ease;
}

.todo-list-leave-active {
  position: absolute;
  left: 0;
  right: 0;
}
</style>
