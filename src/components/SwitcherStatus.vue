<template lang="pug">
UiSwitcher(
  :items="itemsStatus"
  v-model="todoStore.stateStatus"
  @update:model-value="onChangeStateStatusHandler"
)
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTodoStore } from '../store/todo';
import UiSwitcher from '../ui/ui-switcher.vue';

const todoStore = useTodoStore();

const itemsStatus = ref([
  {
    value: 'all',
    name: 'Все',
  },
  {
    value: 'in_progress',
    name: '🔥 В работе',
  },
  {
    value: 'success',
    name: '✅ Завершенные',
  },
]);

const onChangeStateStatusHandler = () => {
  todoStore.clearRemoveMode();
};
</script>
