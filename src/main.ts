import { createApp } from 'vue';
import './assets/style.scss';
import { createPinia } from 'pinia';
import App from './App.vue';
import { useMainStore } from './types/main.ts';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

const mainStore = useMainStore();
mainStore.init();

app.mount('#app');
