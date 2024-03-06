<template lang="pug">
UiBadgeSelector(
  v-bind="{ items }"
  :model-value="props.modelValue"
  @selected="onSelectionHandler"
)
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import UiBadgeSelector from '../ui/ui-badge-selector.vue';

interface IProps {
  modelValue: string | number;
}

const props = defineProps<IProps>();
const emits = defineEmits(['update:model-value']);

const items = ref([
  {
    value: 0,
    name: 'В процессе',
    scheme: 'primary',
  },
  {
    value: 1,
    name: 'Завершено',
    scheme: 'danger',
  },
]);

const onSelectionHandler = (e: number | string) => {
  emits('update:model-value', e);
};
</script>

<style lang="scss" scoped></style>
