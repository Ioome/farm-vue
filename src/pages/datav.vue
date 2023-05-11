<template>
    <div id="index">
    <div class="title">数据总览</div>
    
    <div class="leftContent">
        <dv-border-box13 class="weather">
        <div style="margin-top: 35px;margin-left: 30px;">
            <span style="font-size: 20px;color: white;">日照量</span> 
          <img :src="require('../assets/太阳.svg')" /> 
          <span style="font-size: 30px;color: aqua;margin-left: 20px;"><strong>{{ sunshine }}KWh</strong></span>
        </div>
        </dv-border-box13>
        <dv-border-box13 class="weather">
            <div style="margin-top: 35px;margin-left: 30px;">
            <span style="font-size: 20px;color: white;">土壤温度</span> 
          <img :src="require('../assets/土壤温度.svg')" /> 
          <span style="font-size: 30px;color: aqua;margin-left: 40px;"><strong>{{ earthTem||35 }}°C</strong></span>
        </div>
        </dv-border-box13>
        <dv-border-box13 class="weather">
            <div style="margin-top: 35px;margin-left: 30px;">
            <span style="font-size: 20px;color: white;">温度</span> 
          <img :src="require('../assets/温度.svg')" /> 
          <span style="font-size: 30px;color: aqua;margin-left: 40px;"><strong>{{ weatherTem||35  }}°C</strong></span>
        </div>
        </dv-border-box13>
        <dv-border-box13 class="weather">
            <div style="margin-top: 35px;margin-left: 30px;">
            <span style="font-size: 20px;color: white;">降雨量</span> 
          <img :src="require('../assets/雨量站 降雨量.svg')" /> 
          <span style="font-size: 30px;color: aqua;margin-left: 40px;"><strong>{{ rainfall }}mm</strong></span>
        </div>
        </dv-border-box13>
        <dv-border-box13 class="weather">
            <div style="margin-top: 35px;margin-left: 30px;">
            <span style="font-size: 20px;color: white;">空气湿度</span> 
          <img :src="require('../assets/数据监管.svg')" /> 
          <span style="font-size: 30px;color: aqua;margin-left: 40px;"><strong>{{ airWet||4.09 }}</strong></span>
        </div>
        </dv-border-box13>
    </div>
    <div class="charts">
        <dv-border-box13 style="padding-top: 30px;padding-left: 20px;">
        <div id="data" style="width: 600px;height: 360px;"></div>
        </dv-border-box13>
        <dv-border-box13 style="padding-top:-40px;padding-left: 20px;height: 70%;">
            <div id="datas" style="width: 600px;height: 290px;"></div>
        </dv-border-box13>
    </div>
    <div class="map">
        <dv-border-box11 title="农作物分类" style="padding-top: 100px;">
            <div id="maps" style="width: 500;height: 500px;">

            </div>
        </dv-border-box11>
    </div>
    </div>
</template>

<script>
import {onMounted,ref } from 'vue';
import * as echarts from 'echarts'
import developApis from '@/api/request';
export default {
    setup () {
      let sunshine=ref(0);
      let earthTem=ref(0);
      let weatherTem=ref(0);
      let airWet=ref(0);
      let rainfall=ref(0);
   
      let getdatas=()=>{
        developApis.getSunshine().then((res)=>{
          if (res.status){
            sunshine.value=parseInt(res.data.data);
          }
        })
        developApis.getEarthTem().then((res)=>{
          if (res.status){
            earthTem.value=res.data.data;
          }
        })
        developApis. getTemperature().then((res)=>{
          if (res.status){
            weatherTem.value=res.data.data;
          }
        })
        developApis.getairWet().then((res)=>{
          if (res.status){
            airWet.value=res.data.data;
          }
        })
        developApis.getRainfall().then((res)=>{
          if (res.status){
            rainfall.value=parseInt(res.data.data)
          }
        })
      }
      getdatas();
       let draw=()=>{
        
        let oneDay = 24 * 3600 * 1000;
let date = [];
let data = [Math.random() * 300];
let base = +new Date(1968, 9, 3);
for (let i = 1; i < 20000; i++) {
  var now = new Date((base += oneDay));
  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
  data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));

}
developApis.getTemY().then((res)=>{
  const option1 = 
            {
  title: {
    text: '湿度趋势',
    textStyle: {
        color:'white'
    }
  },
  axisLabel: {
      color: 'white' // 设置 x 轴字体颜色
    },
  xAxis: {
    name: '第一周',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    nameTextStyle: {
      color: 'white' // 修改 x 轴名称字体颜色
    },
    axisLine: {
      symbol: ['none', 'arrow'], // 添加箭头
      lineStyle: {
        color: 'white' // 设置轴线颜色
      }
    }
  },
  yAxis: {
    name: '温度',
    nameTextStyle: {
      color: 'white' // 修改 y 轴名称字体颜色
    },
    axisLine: {
      symbol: ['arrow', 'none'], // 添加箭头
      lineStyle: {
        color: '#333' // 设置轴线颜色
      }
    }
  },
  series: [
    {
      data:res.data.data,
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#37a2da' },
          { offset: 1, color: '#67e0e3' }
        ])
      }
    }
  ]
}
let myChart = echarts.init(document.getElementById('data'));
   
   myChart.setOption(option1);
})


      
developApis.getWetY().then((res)=>{
  const option={

xAxis: {
  name: '时间',
  data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  axisLabel: {
    color: 'white' // 设置 x 轴字体颜色
  },
  axisLine: {
    symbol: ['none', 'arrow'], // 添加箭头
    lineStyle: {
      color: 'white' // 设置轴线颜色
    }
  }
},
yAxis: {
  name: '土壤湿度',
  nameTextStyle:{
      color:'white'
  },
  axisLabel: {
    color: 'white' // 设置 x 轴字体颜色
  },
  axisLine: {
    symbol: ['none', 'arrow'], // 添加箭头
    lineStyle: {
      color: 'white' // 设置轴线颜色
    }
  }
},
series: [
  {
    data: res.data.data,
    type: 'line',
    smooth: true,
    itemStyle:{
      color:'red'
    }
  }
]
}
 let myChart = echarts.init(document.getElementById('datas'));
 myChart.setOption(option);
})

developApis.getFunnel().then((res)=>{
  let map = {
  title: {
    text: ''
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%'
  },
 
  legend: {
    data:["叶菜类", "水稻", "麦类", "玉米", "豆类", "瓜类"],
    textStyle:{
        color:'white'
    }
  },
  series: [
    {
      name: 'Funnel',
      type: 'funnel',
      left: '10%',
      top: 60,
      bottom: 60,
      width: '80%',
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 2,
      label: {
        show: true,
        position: 'inside'
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: 'solid'
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1
      },
      emphasis: {
        label: {
          fontSize: 20
        }
      },
      data: [
        { value: 60, name: '叶菜类' },
        { value: 40, name: '水稻' },
        { value: 20, name: '麦类' },
        { value: 80, name: '玉米' },
        { value: 100, name: '豆类' }
      ]
    }
  ]
}
// let myChart = echarts.init(document.getElementById('data'));
   
//    myChart.setOption(option1);
//    let mycharts=echarts.init(document.getElementById('datas'));
//    mycharts.setOption(option)
    let mymap=echarts.init(document.getElementById('maps'));
    mymap.setOption(map);
})
       
       }
        onMounted(()=>{
  draw()
  
})
        return {
            // option1,
            // option,
            // map,
            draw,
            sunshine,
            weatherTem,
            earthTem,
            airWet,
            getdatas,
            rainfall
        }
    }
}
</script>

<style  scoped>
#index {
    position : absolute;
	width : 100%;
	height : 100%;
    top: 0;
    background:url('../assets/bg2.jpg') no-repeat center center fixed;
    background-size: 100% 100%;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
}
.map{
    width:53%;
    height: 65%;
    position:absolute;
    top:30%;
    left:45%

}
.leftContent{
    display: flex;
    flex-wrap: nowrap;
    width: 90%;
    height: 15%;
    margin-top: 3%;
    margin-left: 3%;
  

}
.charts{
display: block;
width: 40%;
height: 40%;
margin-left: 3%;
margin-top: 1%;
}
.title{
   width: 100%;
    font-size: 2rem;
    line-height: 3.5rem;
    color: rgba(14,253,255,1);
    text-align: center;
    font-weight: bold;
}
</style>