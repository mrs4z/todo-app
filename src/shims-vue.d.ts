import { Dayjs } from 'dayjs';
import 'vue';

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $dayjs: typeof Dayjs;
  }
}
