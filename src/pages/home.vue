<template>
    <div id="bg" >

      <a-menu
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          theme="light"
          
          style="width:18%;height: 100%;box-shadow:5px 0px 10px #6b7070;z-index: 1000000"
      >
        <div style="height: 80px;text-align: center;padding-top: 20px"><img :src="require('../assets/Hunter.jpg')" width="50" height="50" style="border-radius: 50px" /></div>
        <hr style="background-color:rgba(85, 85, 85, 0.36); height: 1px;border: none;margin-bottom: 30px" />
        <a-menu-item key="1" @click="gotoBlock">
          <template #icon>
            <img :src="require('../assets/土地.svg')">
        </template>
          <span style="font-size: 20px;">土地管理</span>
        </a-menu-item>
        <a-menu-item key="2" @click="gotoDatav">
          <template #icon>
            <img :src="require('../assets/数据监管.svg')">
        </template>
          <span  style="font-size: 20px;">数据总览</span>
        </a-menu-item>
        <a-menu-item key="3" @click="gotoEquiment">
          <template #icon>
            <img :src="require('../assets/设备管理.svg')">
        </template>
          <span  style="font-size: 20px;">设备管理</span>
        </a-menu-item>
        <a-menu-item key="4" @click="gotoPersonal">
          <template #icon>
            <img :src="require('../assets/个人中心.svg')">
        </template>
          <span  style="font-size: 20px;">个人中心</span>
        </a-menu-item>

      </a-menu>
      <div class="header">
         <div style="margin-left: 23%;font-size: 18px;margin-top: 1.3%;"> <IdcardTwoTone style="margin-right: 1%;" />你好,{{ username }}</div>
         <div class="logout" @click="islogout"><LoginOutlined /></div>
        </div>
       <div class="content">
        <router-view />
       </div>
   </div>
</template>

<script>


import {  reactive, toRefs,ref } from 'vue';
import { IdcardTwoTone,LoginOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import developApis from '@/api/request';

export default {
    components:{
     IdcardTwoTone,
     LoginOutlined
    },
    setup () {
      let router=useRouter();
let username=ref('')
      username.value=window.localStorage.getItem('username')
     let sureExit=()=>{
       console.log("退出力")
     }
      const state = reactive({
        rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
        openKeys: [],
        selectedKeys: [],
      });
      const onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);
        if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          state.openKeys = openKeys;
        } else {
          state.openKeys = latestOpenKey ? [latestOpenKey] : [];
        }
      };
      let gotoDatav=()=>{
        router.push('/datav')
      }
      let gotoPersonal=()=>{
        router.push('personalInfo')
      }
      let gotoBlock=()=>{
        router.push('equitmentButton')
      }
      let gotoEquiment=()=>{
        router.push('equitmentManagement')
      }
      let islogout=()=>{
        if (window.confirm('确认退出登录吗？')) {
             developApis.logout().then((res)=>{
              if (res.status){
                router.replace('/login');
                window.localStorage.removeItem('token');
              }
             })
        } 
        else {
    
        }
      }


return {
  username,
  sureExit,
  ...toRefs(state),
  onOpenChange,
  gotoDatav,
  gotoBlock,
  gotoEquiment,
  islogout,
  gotoPersonal
}
    }
}
</script>

<style  scoped>
.logout{
  position: absolute;
  left: 95%;
  top: 30%;
  font-size: 20px;
}
.logout :hover{
  cursor: pointer;
}
.content{
  position: absolute;
  top: 15%;
  left: 23%;
  width: 80%;
}
.header{
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  background-color: rgba(255, 255, 255, 0.363);
  z-index: -100;
  box-shadow:0px 5px 10px #6b7070  ;
  
}
#bg{
    position: absolute;
    background-image: url(../assets/Agri.jpg);
    margin:0px;
   position: fixed;
  overflow-x: scroll;
  

background-size:100% 100%;
background-attachment:fixed;
top:0;
  bottom: 0;
  left: 0;
  right: 0;
    background-repeat: no-repeat;




}
</style>