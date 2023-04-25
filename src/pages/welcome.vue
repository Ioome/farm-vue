<template>
    <div id="backgrounds">
       <h1>欢迎使用亨特农业系统</h1>
       <a-button type="primary" @click="enter">进入系统</a-button>
    </div>
</template>

<script>
import { reactive,ref } from 'vue';
import { useRouter,useRoute } from 'vue-router';
export default {
    
    setup () {
        let router=useRouter();
        let route=useRoute();
      function enter(){
        if (window.localStorage.getItem("users"))
       {
        router.push({
            path:'/home'
        })
       }
       else{
        router.push({
            path:'/login'
        })
       }
      }
      return{
        router,
        route,
        enter
      };
    }
}
</script>

<style  scoped>
#backgrounds{
  position:relative;
  top:300px;
  text-align: center;
}
</style>