<template lang="pug">
input.ui__input(
  v-bind="$attrs"
  :value="props.modelValue"
  @input="emits('update:model-value', $event.target.value)"
)
</template>

<script lang="ts" setup>
interface IProps {
  modelValue: string;
}

const props = defineProps<IProps>();
const emits = defineEmits(['update:model-value']);
</script>

<style lang="scss" scoped>
.ui__input {
  padding: 10px 12px;
  background: #efefef;
  border-radius: 4px;
  border: 2px rgba(170, 170, 170, 0) solid;

  font-size: 16px;
  font-weight: 400;

  color: #292929;

  &::placeholder {
    color: #7c7c7c;
  }

  transition: all 0.2s ease;

  &:focus {
    background: #f0f3fe;
  }
}
</style>
