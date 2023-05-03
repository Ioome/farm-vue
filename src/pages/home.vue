<template>
    <div id="bg" >
      <div class="headBar">
        <div class="userAvatar">
          <a-popconfirm
              title="确定退出登录吗"
              ok-text="是"
              cancel-text="否"
              @confirm="sureExit"

          >
          <span><user-outlined /></span>
      <span>{{username}}</span>
          </a-popconfirm>
        </div>
        <div class="headerElement">
            <router-link to="/home/equitmentButton" class="router" >土地管理</router-link>
        </div>
        <div class="headerElement">
          数据总览
        </div>


      </div>
      <div>
        <router-view />
      </div>
   </div>
</template>

<script>


import {ref} from "vue";
import { UserOutlined } from '@ant-design/icons-vue';
export default {
    components:{UserOutlined},
    setup () {
let username=ref('')
      username.value=window.localStorage.getItem('username')
     let sureExit=()=>{
       console.log("退出力")
     }



return {
  username,
  sureExit
}
    }
}
</script>

<style  scoped>

.headBar{
  position: fixed;
  background-color: rgba(255,255,255,0.3);
  height: 60px;
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0,0,0,0.5);
 display: flex;
  flex-wrap: nowrap;
}
.router:hover{
  color: white;
}
.userAvatar{
  width: 200px;
  text-align: center;
  padding-top: 15px;
}
.userAvatar :hover{
  cursor: pointer;
  text-decoration: underline;
}
.headerElement{
  height: 100%;
  font-size: 20px;
  width: 100px;
  padding-top: 13px;
  text-align: center;
  font-family: "DejaVu Math TeX Gyre";
  margin-left: 20px;
}
.headerElement:hover {
  background-color: #00a1ff;
  color: white;
  cursor: pointer;
  border-radius: 10px;
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