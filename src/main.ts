import { createApp } from 'vue';
import './assets/style.scss';
import { createPinia } from 'pinia';
import App from './App.vue';
import { useMainStore } from './types/main';
import dayjsPlugin from './plugins/dayjs';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(dayjsPlugin);

const mainStore = useMainStore();
mainStore.init();

app.mount('#app');
