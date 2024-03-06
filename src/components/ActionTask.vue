<template lang="pug">
UiModal(
  :title="`${title} задачи`"
  @update:state="setState"
)
  template(#content)
    form.form(
      @submit.prevent="onActionHandler"
    )
      .form__item
        UiLabel Наименование задачи
        UiText(
          placeholder="Укажите наименование"
          v-model="data.name"
        )
        UiError(v-if="v$.name.$dirty && v$.name.$invalid") Поле обязательное для заполнения
      .form__item
        UiLabel Описание задачи
        UiTextarea(
          placeholder="Укажите описание задачи"
          v-model="data.content"
        )
        UiError(v-if="v$.content.$dirty && v$.content.$invalid") Поле обязательное для заполнения
      .form__item.footer
        UiButton(scheme="primary" type="submit") Сохранить
        UiButton(scheme="danger" type="button" @click="onCloseHandler") Отмена
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import UiModal from '../ui/ui-modal.vue';
import type { ITodoItem } from '../types/todo.ts';
import UiLabel from '../ui/ui-label.vue';
import UiText from '../ui/ui-text.vue';
import UiTextarea from '../ui/ui-textarea.vue';
import UiButton from '../ui/ui-button.vue';
import UiError from '../ui/ui-error.vue';
import useTodo from '../composables/useTodo.ts';

interface IActionTaskComponent {
  $changeState: (state: boolean) => void;
}

interface IProps {
  item?: ITodoItem;
}

const props = defineProps<IProps>();
const emit = defineEmits(['update:state']);
const isEdit = computed(() => !!props.item);
const title = computed(() => (isEdit.value ? 'Редактирование' : 'Добавление'));

const todo = useTodo();

const data = ref({
  name: '',
  content: '',
});

onBeforeMount(() => {
  if (isEdit.value) {
    data.value.name = props.item.name;
    data.value.content = props.item.content;
  }
});

const rules = {
  name: { required },
  content: { required },
};

const v$ = useVuelidate(rules, data);

const setState = (state: boolean) => {
  emit('update:state', state);
};

const onCloseHandler = () => {
  setState(false);
};

const onActionHandler = () => {
  v$.value.$touch();
  if (v$.value.$invalid) return false;

  const { name, content } = data.value;

  if (isEdit.value) {
    const update = todo.updateItem({
      id: props.item.id,
      name,
      content,
    });

    return setState(false);
  }

  const create = todo.createItem({
    name,
    content,
  });

  return setState(false);
};
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: row !important;
  align-items: center;
  gap: 12px;
}
</style>
