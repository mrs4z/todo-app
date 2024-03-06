import _dayjs from 'dayjs';
import { App } from 'vue';

// Определяем функцию для установки плагина
export default {
  install(app: App): void {
    app.config.globalProperties.$dayjs = _dayjs; // Добавляем dayjs в глобальные свойства
  },
};
