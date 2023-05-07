<template>
    <div>
        <a-modal v-model:visible="visible" title="农田详情" :footer="null" >
            <a-page-header :title="farmData.name" :subTitle="farmData.city" />

<a-row :gutter="16" class="farm-details">
  <a-col :span="8">
    <a-card :title="'农作物信息'">
      <p>名称: {{ farmData.cropName }}</p>
      <p>类型: {{ farmData.cropType }}</p>
      <p>种类: {{ farmData.cropVariety }}</p>
      <p>生长周期: {{ farmData.growthCycle }} 天</p>
    </a-card>
  </a-col>
  <a-col :span="8">
    <a-card :title="'生长环境'">
      <p>推荐温度: {{ farmData.recommendedTemperature }} °C</p>
      <p>推荐湿度: {{ farmData.recommendedHumidity }} %</p>
    </a-card>
  </a-col>
  <a-col :span="8">
    <a-card :title="'农田信息'">
      <p>大小: {{ farmData.size }} 亩</p>
    </a-card>
  </a-col>
</a-row>
    </a-modal>
    </div>
</template>

<script>
import { reactive, ref,defineProps } from 'vue'
export default {
    props:['visibles'],
    setup (props) {
       let visible=ref(props.visibles)
       let   farmData=reactive({
        name: '美丽农田',
        city: '北京',
        cropName: '小麦',
        cropType: '谷物',
        cropVariety: '春小麦',
        growthCycle: 90,
        recommendedTemperature: 20,
        recommendedHumidity: 60,
        size: 100,
      })
        return {
            visible,
            farmData
        }
    }
}
</script>

<style lang="scss" scoped>

</style>