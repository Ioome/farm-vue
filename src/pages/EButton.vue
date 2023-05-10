<template>
  <div>
    <a-button type="primary" style="margin-left: 70%;margin-bottom:10px; " @click="addshow=true">添加土地</a-button>
    <a-table :columns="columns" :pagination="{  pageSize:7 }"
    :data-source="datas"
    style="width: 90%;"
    

    >
    
    <template #detail="{ record }">
    <a-button type="primary" @click="showDetail(record.key)">查看土地详情</a-button>
    <a-button type="danger" @click="deleteBlock(record.key)" style="margin-left: 10px;">删除土地</a-button>
   </template>
  </a-table>
  
  <a-modal v-model:visible="detailVisible" title="土地信息"  :footer="false">
    <a-page-header :title="farmData.name" :subTitle="farmData.city" />

<a-row :gutter="16" class="farm-details">
  <a-col :span="8">
    <a-card :title="'农作物信息'">
      <p>名称: {{ farmData.cropName||"玉米" }}</p>
      <p>类型: {{ farmData.cropType||'小型' }}</p>
      <p>种类: {{ farmData.cropVariety||'谷类' }}</p>
      <p>生长周期: {{ farmData.growthCycle||'120' }} 天</p>
    </a-card>
  </a-col>
  <a-col :span="8">
    <a-card :title="'生长环境'">
      <p>推荐温度: {{ farmData.recommendedTemperature||'25-30' }} °C</p>
      <p>推荐湿度: {{ farmData.recommendedHumidity||"70-80" }} %</p>
    </a-card>
  </a-col>
  <a-col :span="8">
    <a-card :title="'农田信息'">
      <p>大小: {{ farmData.size||900 }} 亩</p>
      <p>所在城市: {{ farmData.city||'山东省济南市历城区' }} </p>
    </a-card>
  </a-col>
</a-row>
  </a-modal>
  <a-modal v-model:visible="visible" title="Basic Modal">
    <a-descriptions title="" :column="1" bordered>
    <a-descriptions-item label="土地">Cloud Database</a-descriptions-item>
    <a-descriptions-item label="地址">Prepaid</a-descriptions-item>
    <a-descriptions-item label="作物">18:00:00</a-descriptions-item>
    <a-descriptions-item label="作物类型">18:00:00</a-descriptions-item>
    <a-descriptions-item label="作物图像"><a-button>查看图像</a-button></a-descriptions-item>
    <a-descriptions-item label="生长周期">18:00:00</a-descriptions-item>
    <a-descriptions-item label="适宜温度">18:00:00</a-descriptions-item>
    <a-descriptions-item label="适宜土壤湿度">18:00:00</a-descriptions-item>
    <a-descriptions-item label="状态">
      <a-badge status="processing" text="Running" />
    </a-descriptions-item>
  
  </a-descriptions>
    </a-modal>
    <a-modal v-model:visible="addshow"  title="添加土地" @ok="addlandNow">
     <div style="display: flex;flex-wrap: wrap;">
     <p> 土地名称：<a-input v-model:value="addLand.landName" style="width: 200px;margin-left: 10px;"></a-input></p>
     
     <p> 土地成本：<el-input-number v-model="addLand.price"  :min="1000" :max="100000" :step="1000" label="描述文字" style="margin-left: 10px;"></el-input-number></p>
     <p> 土地规模：<a-input v-model:value="addLand.scale" style="width: 200px;margin-left: 10px;"></a-input></p>
     <p> 土地面积：<a-input v-model:value="addLand.area" style="width: 200px;margin-left: 10px;"></a-input></p>
     <p> 土地详情：<a-input v-model:value="addLand.detail" style="width: 200px;margin-left: 10px;"></a-input></p> 
     <p> 土地期限：<a-date-picker v-model:value="addLand.landTime" style="margin-left: 10px;"  picker="year"/></p>
    </div>
    </a-modal>
  </div>
</template>

<script>
import { reactive,onMounted,ref } from 'vue';
import developApis from '@/api/request';
const columns = [
  {
    title: '土地',
    dataIndex: 'name',
    key: 'name',
    slots: {
      customRender: 'name',
    },
  },
 
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address 1',
    ellipsis: true,
  },
  {
    title: '详情',
    dataIndex: 'detail',
    key: 'detail',
    slots: {
      customRender: 'detail',
    },
  },
 

];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New a',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'Londona',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney a',
    tags: ['cool', 'teacher'],
  },
];
export default {
  name: "EButton",
  
  setup(){
    let detailVisible=ref(false)
    let addshow=ref(false)
    let addLand=reactive({
      landName:'',
      landPosition:'',
      scale:'',
     area:1,
     detail:'',
     landTime:'',
     price:1000,

    })
    let farmData=reactive({
      name:'',
      city:'',
      cropName:'',
      cropType:'',
      cropVariety:'',
      growthCycle:'',
      
      recommendedTemperature:'',
      recommendedHumidity:'',
      size:''
    })
   let visible=ref(false)
   let pagination=reactive({
    hideOnSinglePage: true
   })
   let formState=reactive({
    landName:'',
    landPosition:'',
      plantName:'',
      plantType:'',
      cropImg:'',
      cycle:'',
      Recommandtemperature:'',
      humidity:'',
      status:''
   })
   let datas=ref([]);
   let deleteBlock=(id)=>{
    developApis.deleteBlocks({id:id}).then((res)=>{
      if (res.status){
        getLandData()
      }
    })
   }
    let showDetail=(id)=>{
      detailVisible.value=true
      developApis.getBlockDetail({id:id}).then((res)=>{
            farmData.name=res.data.data.landName
            formState.city=res.data.data.landPosition
            formState.cropName=res.data.data.suitableCrop

      })
      developApis.checkTheLand({id:id}).then()
     
    }
    let addlandNow=()=>{
      if (addLand.landName==''||addLand.scale==''||addLand.area==''||addLand.detail==''||addLand.landTime==''){
        alert("请填写完整信息")
        return
      }
      else
       
   developApis.addLand({
      landName:addLand.landName,
      scale:addLand.scale,
      allArea:addLand.area,
      details:addLand.detail,
      landTime:addLand.landTime.year().toString(),
      price:addLand.price
    }).then((res)=>{
      if (res.status){
        addshow.value=false
        getLandData()
      }
    })
    } 
   let getLandData=()=>{
    datas.value=[];
developApis.getAllBlocks().then((res)=>{
    res.data.data.map((item)=>{
   
      datas.value.push({
        key: item.id,
        name: item.landName,
        address: item.landPosition,
        
      
      })
   
    })

})
developApis.getuserInfo().then()
   }
   onMounted(()=>{
    getLandData();
    
   })
    return{
      data,
      columns,
      pagination,
      datas,
      showDetail,
      getLandData,
      visible,
      formState,
      deleteBlock,
      detailVisible,
      farmData,
      addshow,
      addLand,
      addlandNow
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