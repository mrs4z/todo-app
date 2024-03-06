<template lang="pug">
.ui__badge-selector
  .ui__badge-selector-item(
    :class="`ui__badge-selector-item--${selectedItem?.scheme}`"
    @click.stop="dropdownState = !dropdownState"
    ref="refButton"
  )
    .ui__badge-selector-item-name {{ selectedItem?.name }}
    .ui__badge-selector-item-arrow
      IconCaret
  .ui__badge-selector-dropdown(v-if="dropdownState" ref="refDropdown")
    .ui__badge-selector-dropdown-item(
      v-for="item in props.items"
      :key="item.value"
      :class="{ 'ui__badge-selector-dropdown-item--active': item.value === selectedItem?.value }"
      @click="onSelectionHandler(item.value)"
    )
      .ui__badge-selector-dropdown-item-scheme(:class="`ui__badge-selector-dropdown-item-scheme--${item.scheme}`")
      .ui__badge-selector-dropdown-item-name {{ item.name }}
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import IconCaret from '../components/icons/IconCaret.vue';

interface IItem {
  value: string | number;
  name: string;
  scheme: 'primary' | 'danger';
}
interface IProps {
  items: IItem[];
  modelValue: string | number;
}

const props = defineProps<IProps>();
const emits = defineEmits(['selected']);
const dropdownState = ref<boolean>(false);

const selectedItem = computed(() => props.items.find((u) => u.value === props.modelValue));

const refDropdown = ref<HTMLElement>();
const refButton = ref<HTMLElement>();

const onSelectionHandler = (value: string | number) => {
  emits('selected', value);
  dropdownState.value = false;
};

const closeDropdown = (event: MouseEvent) => {
  if (!event.target) return;

  if (!refDropdown.value || !refButton.value) return;

  if (
    !event.composedPath().includes(refDropdown.value) &&
    !event.composedPath().includes(refButton.value)
  ) {
    dropdownState.value = false;
  }
};

onMounted(() => {
  window.addEventListener('mousedown', closeDropdown);
});

onUnmounted(() => {
  window.removeEventListener('mousedown', closeDropdown);
});
</script>

<style lang="scss" scoped>
.ui__badge-selector {
  position: relative;

  &-item {
    display: inline-flex;
    gap: 8px;

    user-select: none;

    padding: 4px 8px;
    border-radius: 8px;

    background: #ccc;
    color: #000;

    cursor: pointer;

    &--primary {
      background: #6684f4;
      color: #f0f3fe;
    }

    &--danger {
      background: #f8783f;
      color: #fff4ed;
    }

    &-name {
      font-size: 14px;
    }

    &-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &-dropdown {
    position: absolute;
    top: 30px;
    background: #fff;
    border-radius: 4px;
    padding: 8px;
    z-index: 9999;

    display: flex;
    flex-direction: column;
    gap: 8px;

    box-shadow:
      0 4px 8px rgba(0, 0, 0, 0.05),
      0 6px 20px rgba(0, 0, 0, 0.05);

    &-item {
      padding: 4px 8px;
      background: #efefef;
      border-radius: 4px;

      user-select: none;

      cursor: pointer;
      transition: all 0.1s ease;

      &--active {
        background: #e7e7e7;
        cursor: default;
      }

      &:not(&--active):hover {
        background: darken(#efefef, 10);
      }

      display: flex;
      align-items: center;
      gap: 8px;

      &-scheme {
        min-width: 8px;
        height: 8px;
        border-radius: 8px;
        background: #000;

        &--primary {
          background: #6684f4;
        }

        &--danger {
          background: #f8783f;
        }
      }
    }
  }
}
</style>
