<template lang="pug">
UiButton(
  scheme="danger"
  v-if="todoStore.removeSelectionItems.length > 0"
  @click="onRemoveItemsHandler"
) Удалить {{ todoStore.removeSelectionItems.length }} {{ declension(todoStore.removeSelectionItems.length, ['задачу', 'задачи', 'задач']) }}?
</template>

<script lang="ts" setup>
import { useTodoStore } from '../store/todo';
import UiButton from '../ui/ui-button.vue';
import { declension } from '../utilites.ts';
import useTodo from '../composables/useTodo.ts';

const todoStore = useTodoStore();
const todo = useTodo();
const onRemoveItemsHandler = () => {
  if (
    todo.deleteItems({
      ids: todoStore.removeSelectionItems,
    })
  ) {
    todoStore.clearRemoveMode();
  }
};
</script>

<style lang="scss" scoped></style>
