<template>
    <div>
        <el-table :data="tableData" stripe style="width: 70%">
    <el-table-column prop="equipmentName" label="设备名称" width="180" />
    <el-table-column prop="clientIp" label="设备IP" width="180" />
    <el-table-column prop="data" label="输出数据" />
    <el-table-column prop="operation" label="操作" >
        <template #default="scope">
            
            <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除设备</el-button>
        </template>
    </el-table-column>
  </el-table>
    </div>
</template>

<script>
import {ref,onMounted} from 'vue'
import developApis from '@/api/request';
export default {
    setup () {
        const tableData =ref([])
        onMounted(()=>{
            checkEquiment()
        })
let checkEquiment = () => {
    developApis.checkEquiment().then(res => {
       
        tableData.value=res.data.data
    })
}
let handleDelete=(id)=>{
developApis.deleteEquiment({id:id}).then(res=>{
    if (res.status){
        message.success('删除成功')
        checkEquiment()
    }
})
}
        return {
            tableData,
            checkEquiment,
            handleDelete
        }
    }
}
</script>

<style  scoped>

</style>