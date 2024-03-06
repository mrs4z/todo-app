<template lang="pug">
.ui__switch
  .ui__switch-item(
    v-for='item in props.items'
    :key='item.value'
    @click='onSelectHandler(item.value)'
    :class='{ "ui__switch-item--active": item.value === props.modelValue }'
  ) {{ item.name }}
</template>

<script lang="ts" setup>
interface IItem {
  value: string;
  name: string;
}
interface IProps {
  items: IItem[];
  modelValue: string;
}

const props = defineProps<IProps>();
const emits = defineEmits(['update:model-value']);

const onSelectHandler = (value: string) => {
  emits('update:model-value', value);
};
</script>

<style lang="scss" scoped>
.ui__switch {
  display: flex;
  align-items: center;

  &-item {
    padding: 8px 12px;
    border: 1px solid #dcdcdc;
    cursor: pointer;

    background: #f7f7f7;
    color: #656565;

    transition: all 0.2s ease;

    user-select: none;

    &--active {
      background: #e7e7e7;
      color: #262626;
      cursor: default;
    }

    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      border-right: 0;
    }

    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-left: 0;
    }
  }
}
</style>
