import { createApp } from 'vue';
import App from './App.vue';
import router from './pages/route';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VCharts from 'v-charts-v2'

import echarts from 'echarts/lib/echarts';
import dataV from '@jiaminghi/data-view'
const app = createApp(App);
app.use(Antd)
app.use(router);
app.use(echarts);
app.use(dataV)

app.mount('#app');