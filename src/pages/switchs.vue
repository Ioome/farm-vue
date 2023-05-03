<template>
    <div id="backmask" ref="buttons">
        <img id="swit" :src="require('@/assets/关闭.png')" ref="images"/>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
    setup () {
       let buttons=ref(null);
       let ispress=ref(false);
       let images=ref(null);
       let router=useRouter();

       function stylecut(){
             if (!ispress.value){ 
                images.value.src=require('@/assets/按下.png');
          
                ispress.value=true;
                

                  }
                  
            
             
       }
       function styleenlarge(){
             
             images.value.src=require('@/assets/开启.png');
             setTimeout(()=>{router.replace({
                   path:'/home'
                    
             })},1000)

       }
       onMounted(()=>{
              images.value.addEventListener('mousedown',()=>{
              stylecut();
              })
              images.value.addEventListener('mouseleave',()=>{
                images.value.style.width="16%";
                images.value.style.height="30%";
              })
              buttons.value.addEventListener('mouseup',()=>{
              styleenlarge();
              })
       })
        return {buttons,images,ispress}
    }
}
</script>

<style  scoped>
#backmask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color:rgb(73, 73, 73)
}
#swit{
 
    position: absolute;
    width: 16%;
    height: 30%;
    top: 35%;
    left: 42%;


}

.ant-switch-handle{
    
}
</style>