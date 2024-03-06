<template lang="pug">
TodoList(v-if="todoStore.stateView === 'list'")
TodoGrid(v-else)
</template>

<script lang="ts" setup>
import { useTodoStore } from '../store/todo';
import TodoList from './list/TodoList.vue';
import TodoGrid from './grid/TodoGrid.vue';

const todoStore = useTodoStore();
</script>
