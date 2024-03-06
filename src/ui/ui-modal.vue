<template lang="pug">
.ui__modal
  .ui__modal-overlay
  .ui__modal-position
    .ui__modal-container
      .ui__modal-container-header
        .ui__modal-container-header-title {{ props.title }}
        .ui__modal-container-header-action(@click="setState(false)")
          IconClose

      .ui__modal-container-content(v-if="$slots['content']")
        slot(name="content")
      .ui__modal-container-footer(v-if="$slots['footer']")
        slot(name="footer")
</template>

<script setup lang="ts">
import IconClose from '../components/icons/IconClose.vue';

interface IProps {
  title: string;
  width: string;
}

const props = defineProps<IProps>();
const emits = defineEmits(['update:state']);

const setState = (state: boolean) => {
  emits('update:state');
};
</script>

<style lang="scss" scoped>
.ui__modal {
  &-overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 998;
    background: rgba(0, 0, 0, 0.4);
  }

  &-position {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }

  &-container {
    width: 450px;
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 4px;

      &-title {
        font-weight: bold;
        font-size: 18px;
        color: #3d3d3d;
      }

      &-action {
        cursor: pointer;
        color: #3d3d3d;
      }
    }
  }
}
</style>
