<template lang="pug">
.app
  .app__title Todo Application 📝
  .app__content
    .app__content-bar
      .app__content-bar-left
        SwitcherTypeView
        SwitcherStatus
        RemoveMode
      .app__content-bar-right
        UiButton(
          scheme="danger"
          @click="onToggleRemoveModeHandler"
          v-if="todoStore.items.length > 0"
        ) {{ todoStore.isRemoveMode ? 'Отменить режим удаления' : 'Режим удаления' }}
        UiButton(@click="todoStore.isCreating = true") Добавить задачу
    .app__content-body
      TodoContent
ActionTask(
  v-if="!!todoStore.editItem"
  :item="todoStore.editItem"
  @update:state="todoStore.editItem = null"
)
ActionTask(
  v-if="todoStore.isCreating"
  @update:state="todoStore.isCreating = $event"
)
</template>

<script lang="ts" setup>
import SwitcherStatus from './components/SwitcherStatus.vue';
import SwitcherTypeView from './components/SwitcherTypeView.vue';
import TodoContent from './components/TodoContent.vue';
import ActionTask from './components/ActionTask.vue';
import { useTodoStore } from './store/todo';
import UiButton from './ui/ui-button.vue';
import RemoveMode from './components/RemoveMode.vue';

const todoStore = useTodoStore();

const onToggleRemoveModeHandler = () => {
  todoStore.isRemoveMode = !todoStore.isRemoveMode;

  if (!todoStore.isRemoveMode) {
    todoStore.removeSelectionItems = [];
  }
};
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 1280px;
  margin: 0 auto;

  padding: 12px 20px;

  &__title {
    font-weight: bold;
    font-size: 24px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-left,
      &-right {
        display: flex;
        align-items: center;
        gap: 12px;
      }
    }
  }
}
</style>
