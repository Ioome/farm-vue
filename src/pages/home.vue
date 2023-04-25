<template>
    <div id="bg">
        <div style="background: rgba(255,255,255,0.5); padding: 30px">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-card>
          <a-statistic
            title="Feedback"
            :value="11.28"
            :precision="2"
            suffix="%"
            :value-style="{ color: '#3f8600' }"
            style="margin-right: 50px"
          >
            <template #prefix>
              <arrow-up-outlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card>
          <a-statistic
            title="Idle"
            :value="9.3"
            :precision="2"
            suffix="%"
            class="demo-class"
            :value-style="{ color: '#cf1322' }"
          >
            <template #prefix>
              <arrow-down-outlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>
  </div>
  <div class="echarts-box">
    <div id="myEcharts" :style="{ width: '900px', height: '300px',position:relative,top:'100px',left:'100px' }"></div>
  </div>
   </div>
</template>

<script>
import * as echarts from "echarts";
import { onMounted,onUnmounted} from "vue";
export default {

    setup () {
        let echart = echarts;
    

onMounted(() => {
  initChart();
});

onUnmounted(() => {
  echart.dispose;
});

// 基础配置一下Echarts
function initChart() {
  let chart = echart.init(document.getElementById("myEcharts"), "dark");
  // 把配置和数据放这里
  chart.setOption({
    xAxis: {
      type: "category",
      data: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ]
    },
    tooltip: {
      trigger: "axis"
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [
          820,
          932,
          901,
          934,
          1290,
          1330,
          1320,
          801,
          102,
          230,
          4321,
          4129
        ],
        type: "line",
        smooth: true
      }
    ]
  });
  window.onresize = function() {
    //自适应大小
    chart.resize();

  };
}

       return{initChart}
    }
}
</script>

<style  scoped>
#bg{
    position: absolute;
    background-image: url(../assets/Agri.jpg);
    margin:0px;

background-size:100% 100%;
background-attachment:fixed;
top:0;
  bottom: 0;
  left: 0;
  right: 0;
    background-repeat: no-repeat;




}
</style>