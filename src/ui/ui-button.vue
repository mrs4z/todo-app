<template lang="pug">
button.ui__button(
  v-bind="$attrs"
  :class="[schemeColor]"
)
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IProps {
  scheme: 'primary' | 'danger' | 'default';
}

const props = withDefaults(defineProps<IProps>(), {
  scheme: 'default',
});

const schemeColor = computed(() => {
  if (props.scheme !== 'default') {
    return `ui__button--${props.scheme}`;
  }

  return '';
});
</script>

<style lang="scss" scoped>
.ui__button {
  padding: 8px 12px;
  border-radius: 4px;

  appearance: none;
  border: 0;

  background: #707070;
  color: #fff;

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: lighten(#707070, 10);
  }

  /**
   * schemes
   */

  &--primary {
    background: #3f57ee;

    &:hover {
      background: lighten(#3f57ee, 10);
    }
  }

  &--danger {
    background: #f5551a;

    &:hover {
      background: lighten(#f5551a, 10);
    }
  }
}
</style>
