import { createApp } from 'vue';
import pinia from './stores/pinia';
import router from './router';
import App from './App.vue';
// import '@/utils/flexible.js' // 需要rem适配放开此处注释
import '@/assets/var/dark.css';
import '@/assets/var/light.css';
import '@/assets/style/base.css'; // 基本样式
import '@/assets/style/common.scss'; // 基本样式

const app = createApp(App);
app.use(pinia).use(router).mount('#app');
