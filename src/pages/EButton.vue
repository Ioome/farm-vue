<template>
  <div>
    <a-button type="primary" size="large" shape="round" id="Buttons" @click="visible=true" v-if="!isChoose"><plus-outlined />选择土地</a-button>
    <a-modal  v-model:visible="visible" title="我的土地" @ok="handleOk" :style="DialogSty" :footer="null" >
      <a-table :columns="columns" :data-source="deviceData"  :scroll="{ y: 240 }">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'land'">
        <span>
          土地
        </span>
          </template>
          <template v-else-if="column.key === 'operation'">
        <span>
          操作
        </span>
          </template>
        </template>

        <template #bodyCell="{ column,record }">

          <template v-if="column.key === 'land'">

              {{ record.landName }}


        </template>
          <template v-if="column.key === 'operation'">

           <a-button type="primary" @click="checkMyLand(record.id)">查看</a-button>


          </template>
        </template>
      </a-table>
    </a-modal>
    <div v-if="isChoose" class="weather">
      <a-card title="日照量" style="width: 300px;height: 120px">
        <template #extra><img :src="require('../assets/太阳.svg')"></template>
        <div style="text-align: center;margin-top:-20px">
          <span style="font-size: 30px; " ><strong>3.021</strong></span>
        </div>
      </a-card>
      <a-card title="今日降雨量" style="width: 300px;height: 120px">
        <template #extra><img :src="require('../assets/雨量站 降雨量.svg')"></template>
        <div style="text-align: center;margin-top:-20px">
          <span style="font-size: 30px; " ><strong>3.021</strong></span>
        </div>
      </a-card>
      <a-card title="空气温度" style="width: 300px;height: 120px">
        <template #extra><img :src="require('../assets/温度.svg')"></template>
        <div style="text-align: center;margin-top:-20px">
          <span style="font-size: 30px; " ><strong>3.021</strong></span>
        </div>
      </a-card>
      <a-card title="土壤温度" style="width: 300px;height: 120px">
        <template #extra><img :src="require('../assets/土壤温度.svg')"></template>
        <div style="text-align: center;margin-top:-20px">
          <span style="font-size: 30px; " ><strong>3.021</strong></span>
        </div>
      </a-card>
      <a-card title="空气湿度" style="width: 300px;height: 120px">
        <template #extra><img :src="require('../assets/空气湿度.svg')"></template>
        <div style="text-align: center;margin-top:-20px">
          <span style="font-size: 30px; " ><strong>3.021</strong></span>
        </div>
      </a-card>
      <div class="plan">
      <div style="font-size: 30px;font-family: Fantasy;margin-left: 30px;margin-top: 10px">
        <span>种植计划</span>
        <a-button type="primary" style="position: relative;left:83%" @click="visible=true"><plus-outlined />选择土地</a-button>
      </div>
        <hr/>
        <div style="width: 100%;text-align: center">
          <AImage
              :width="400"

              :src="require('../assets/小麦.jpg')"
          >

          </AImage>
        </div>
        <div style="width: 80%;margin-top: 40px;margin-left: 180px;background-color: rgba(255,255,255,1);">
          <a-descriptions title="" layout="vertical" :column="1" bordered>
            <a-descriptions-item label="农作物">小麦</a-descriptions-item>
            <a-descriptions-item label="作物分类">大型谷类</a-descriptions-item>
            <a-descriptions-item label="生长周期">90天</a-descriptions-item>
            <a-descriptions-item label="推荐土壤湿度">60%-70%</a-descriptions-item>
            <a-descriptions-item label="温度推荐" :span="2">15-20°C</a-descriptions-item>
            <a-descriptions-item label="状态" :span="3">
              <a-badge status="processing" text="生长中" />
            </a-descriptions-item>

          </a-descriptions>
        </div>
        <div style="width: 100%;text-align: center;margin-top: 20px">
          <AImage
              :width="400"

              :src="require('../assets/玉米.jpg')"
          >

          </AImage>
        </div>
        <div style="width: 80%;margin-top: 40px;margin-left: 180px;background-color: rgba(255,255,255,1);">
          <a-descriptions title="" layout="vertical" :column="1" bordered>
            <a-descriptions-item label="农作物">玉米</a-descriptions-item>
            <a-descriptions-item label="作物分类">中型谷类</a-descriptions-item>
            <a-descriptions-item label="生长周期">120天</a-descriptions-item>
            <a-descriptions-item label="推荐土壤湿度">70%-80%</a-descriptions-item>
            <a-descriptions-item label="温度推荐" :span="2">20°C-25°C</a-descriptions-item>
            <a-descriptions-item label="状态" :span="3">
              <a-badge status="success" text="待收割" />
            </a-descriptions-item>

          </a-descriptions>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import {PlusOutlined} from "@ant-design/icons-vue";
import {ref,onMounted} from "vue";
import developApis from "@/api/request";
export default {
  name: "EButton",
  components:{PlusOutlined},
  setup(){
    let visible=ref(false)
    let deviceData=ref([])
    let isChoose=ref(false)

    const columns =ref( [{
      name: '土地',
      dataIndex: 'land',
      key: 'land',
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
    }])

    let getAllEquiment=()=>{
      developApis.getAllBlocks().then((res)=>{
        deviceData.value=res.data.data
        console.log(deviceData.value)
      })
    }
   function checkMyLand(id){
developApis.checkTheLand({id:id}).then()
     developApis.checkEquiment({id:2}).then(()=>{
       isChoose.value=true
       visible.value=false
     })
   }
    let handleOk=()=>{

    }
    let DialogSty={'position':'fixed','top':'30%','left':'35%','max-height':'400px'}
    onMounted(()=>{
      getAllEquiment()
    })
    return{
      visible,
      handleOk,
      DialogSty,
      getAllEquiment,
      deviceData,
      columns,
      checkMyLand,
      isChoose
    }
  }
}
</script>

<style scoped>
.plan{
background-color: rgba(255,255,255,0.3);
  width: 1500px;
height: 2800px;
  margin-top: 10px;
  border-radius: 10px;

}
.weather{
  margin: 100px;
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
}
hr{
  background-color:rgba(0,0,0,0.1); height:1px; border:none;
}
#Buttons{

  position: absolute;
  top: 50%;
  left: 45%;


}
.insideButton{
  position: relative;
  left:5% ;
  margin: 10px;
}
</style>