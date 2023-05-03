import { createApp } from 'vue';
import App from './App.vue';
import router from './pages/route';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VCharts from 'v-charts-v2'

const app = createApp(App);
app.use(Antd)
app.use(router);
app.use(VCharts);

app.mount('#app');