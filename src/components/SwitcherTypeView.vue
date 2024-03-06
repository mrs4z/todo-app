<template lang="pug">
UiSwitcher(
  :items="itemsView"
  v-model="todoStore.stateView"
)
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTodoStore } from '../store/todo';
import UiSwitcher from '../ui/ui-switcher.vue';

const todoStore = useTodoStore();

const itemsView = ref([
  {
    value: 'list',
    name: 'Список',
  },
  {
    value: 'grid',
    name: 'Колонки',
  },
]);
</script>
