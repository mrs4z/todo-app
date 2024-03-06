import { getCurrentInstance } from 'vue';

export function useDayjs() {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error('useDayjs must be called within a setup function');
  }

  return instance.appContext.config.globalProperties.$dayjs;
}
