import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import pugPlugin from 'vite-plugin-pug';

const options = {};
const locals = { name: 'Pug' };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), pugPlugin(options, locals)],
});
