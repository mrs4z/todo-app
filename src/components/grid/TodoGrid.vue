<template lang="pug">
.todo__grid
  .todo__grid-item(v-for="item in columnsList" :key="item.value")
    .todo__grid-item-header
      .todo__grid-item-header-title {{ item.name }}
      .todo__grid-item-header-count {{ getCountOfType(item.value) }}
    draggable.todo__grid-item-content(
      :list="getItemsOfType(item.value)"
      group="todo"
      item-key="id"
      :sort="false"
      :data-column-value="item.value"
      @end="onEndDraggable"
    )
      template(#item="{element}")
        TodoGridItem(
          :item="element"
        )
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';
import { ITodoStatus } from '../../types/todo.ts';
import { useTodoStore } from '../../store/todo.ts';
import TodoGridItem from './TodoGridItem.vue';
import useTodo from '../../composables/useTodo.ts';

const todoStore = useTodoStore();
const todo = useTodo();
const columnsList = ref([
  {
    value: ITodoStatus.IN_PROGRESS,
    name: '🔥 В работе',
  },
  {
    value: ITodoStatus.SUCCESS,
    name: '✅ Завершенные',
  },
]);

const getCountOfType = (type: ITodoStatus) =>
  todoStore.items.filter((u) => u.status === type).length;

const getItemsOfType = (type: ITodoStatus) => todoStore.items.filter((u) => u.status === type);

const onEndDraggable = (event) => {
  const itemId = event.item.dataset.id; // Убедитесь, что у вашего TodoGridItem есть атрибут data-id="{{element.id}}"
  const columnStatus = event.to.dataset.columnValue;
  let newStatus = ITodoStatus.SUCCESS;

  if (parseInt(columnStatus) === 0) {
    newStatus = ITodoStatus.IN_PROGRESS;
  }

  const findItem = todoStore.items.find((item) => item.id === itemId);

  if (findItem && findItem.status !== newStatus) {
    todo.updateItemStatus({
      id: itemId,
      status: newStatus,
    });
  }
};
</script>

<style lang="scss" scoped>
.todo__grid {
  display: flex;
  gap: 24px;
  overflow-x: scroll;
  .todo__grid-item {
    min-width: 300px;
    max-width: 300px;

    display: flex;
    flex-direction: column;
    gap: 12px;

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      background: #f7f7f7;
      padding: 12px;
      border-radius: 4px;

      &-title {
        color: #3d3d3d;
      }

      &-count {
        border-radius: 4px;
        background: #6684f4;
        padding: 2px 6px;
        color: #fff;
        font-size: 12px;
      }
    }

    &-content {
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-height: 150px;
    }
  }
}
</style>
