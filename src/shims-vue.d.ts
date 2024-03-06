import { Dayjs } from 'dayjs';
import 'vue';

declare module '@types/uuid';
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $dayjs: typeof _dayjs;
  }
}
