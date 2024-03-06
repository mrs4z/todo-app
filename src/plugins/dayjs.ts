import _dayjs from 'dayjs';
import { App } from 'vue';

export default {
  install(app: App): void {
    app.config.globalProperties.$dayjs = _dayjs;
  },
};
