import { createApp } from 'vue';
import App from './App.vue';
import router from './pages/route';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VCharts from 'v-charts-v2'
// import DataV, { setClassNamePrefix } from '@dataview/datav-vue3';
// import { BorderBox13 } from '@dataview/datav-vue3';
// import { BorderBox11 } from '@dataview/datav-vue3';
import echarts from 'echarts/lib/echarts';
// import dataV from '@jiaminghi/data-view'
import DataVVue3 from '@kjgl77/datav-vue3'
const app = createApp(App);
app.use(Antd)
app.use(router);
app.use(echarts);
// app.use(dataV)
// app.use(DataV, { classNamePrefix: 'dv-' });
// app.use(BorderBox13)
// app.use(BorderBox11)
app.use(DataVVue3)
app.mount('#app');