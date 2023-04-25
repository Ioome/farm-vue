<template>
    <div id="backgrounds">
    
    
    <div id="loginForm">
        <img :src="require('@/assets/Hunter.jpg')" style=" position: absolute; width: 15%; height: 20%; top: 13px; left: 210px;border-radius:50px;" />
        <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
    id="forms"
  >
    <a-form-item
      label="用户名"
      name="username"
      :rules="[{ required: true, message: '用户名不可为空!' }]"
     
      >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="密码"
      name="password"
      :rules="[{ required: true, message: '密码不可为空!' }]"
     
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember" style="position: relative; left: 30%;">记住我</a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit" style="position: relative; left: 32%;">登录</a-button>
    </a-form-item>
  </a-form>
    </div>
</div>
</template>

<script>
import { reactive } from 'vue';
import { useRouter,useRoute } from 'vue-router';
export default {
    setup () {
        
    const router=useRouter();

        const formState = reactive({
      username: '',
      password: '',
      remember: true,
    });
    const onFinish = values => {
      router.push({
        path:'/switchs'
      })
    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    return {
      formState,
      onFinish,
      onFinishFailed,
    };
    }
}
</script>

<style  scoped>
*{
  margin: 0;
  padding: 0;
 
}
#loginForm{
  position: relative;
   
  border-radius:30px;
   width: 500px;
   left: 37%;
   top:30%;
   height: 400px;
   padding-top:130px;
   padding-left: 5px;
  background-color: rgba(255,255,255,0.3);

   
}


#forms{
    position:relative;
    left: -60px;
   
}
#backgrounds{
  position:absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(../assets/Agri.jpg);
  margin:0px;
  
background-size:100% 100%;
background-attachment:fixed;
}
</style>