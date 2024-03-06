<template lang="pug">
label.ui-checkbox
  input(type="checkbox" :checked="modelValue" @change="onChange")
  span(v-if="label") {{ label }}
</template>

<script setup lang="ts">
interface IProps {
  modelValue: boolean;
  label?: string;
}
const props = defineProps<IProps>();
const emit = defineEmits(['update:modelValue']);

function onChange(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
}
</script>

<style scoped>
.ui-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.ui-checkbox input[type='checkbox'] {
  margin-right: 8px;
}
</style>
