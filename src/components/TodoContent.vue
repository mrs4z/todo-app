<template lang="pug">
TodoList(v-if="todoStore.stateView === 'list'")
</template>

<script lang="ts" setup>
import { useTodoStore } from '../store/todo.ts';
import TodoList from './list/TodoList.vue';

const todoStore = useTodoStore();
</script>
