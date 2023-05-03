<template>
    <div id="backgrounds">
    
    
    <div id="loginForm">
      <a-button type="text" style="position: absolute;top: 5%;color: #00a1ff" @click="formshow=true" v-if="!formshow">{{"\< "+'返回'}}</a-button>
        <img :src="require('@/assets/Hunter.jpg')" style=" position: absolute; width: 15%; height: 20%; top: 13px; left: 210px;border-radius:50px;" />
        <a-form v-if="formshow"
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="loginOver"
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
      :rules="[{ required: true, message:'请输入密码',trigger:'change' }]"

    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember" style="position: relative; left: 30%;">记住我</a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }" >
      <a-button type="primary" html-type="submit" style="position: relative; left: 32%;width: 80px;border-radius: 10px">登录</a-button>
      <a-button type="text" @click="formshow=false" style="position: relative; left: 32%;margin-left: 10px; color: #00a1ff">注册</a-button>
    </a-form-item>
  </a-form>
      <a-form v-if="!formshow"
              :model="formState"
              name="basic"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
              autocomplete="off"
              @finish="registerOver"

              id="reforms"
              style="position: absolute;width: 100%;left: -13%;top: 27%"

      >
        <a-form-item
            label="用户名"
            name="username"
            :rules="[{ required: true, validator:usernamevaild, trigger:'change' }]"

        >
          <a-input v-model:value="formStates.username" />
        </a-form-item>
        <a-form-item
            label="邮箱"
            name="phone"
            :rules="[{ required: true,  validator:valiEmail, trigger:'change' }]"

        >
          <a-input v-model:value="formStates.email" />
        </a-form-item>
        <a-form-item
            label="手机号"
            name="phone"
            :rules="[{ required: true, validator:phonevaild,trigger:'change' }]"

        >
          <a-input v-model:value="formStates.phone" />
        </a-form-item>
        <a-form-item
            label="密码"
            name="repassword"
            :rules="[{ required: true,validator: passwordsvalid,trigger: 'change' }]"

        >
          <a-input-password v-model:value="formStates.password" />
        </a-form-item>





        <a-form-item :wrapper-col="{ offset: 8, span: 16 }" >
          <a-button type="primary" html-type="submit" style="position: relative; left: 32%;width: 80px;border-radius: 10px">提交</a-button>

        </a-form-item>
      </a-form>
    </div>
</div>
</template>

<script>
import { reactive,ref } from 'vue';
import { useRouter } from 'vue-router';
import developApis from "@/api/request";
import {message} from "ant-design-vue";
export default {
    setup () {
        
    const router=useRouter();
    let formshow=ref(true)
        const formState = reactive({
      username: '',
      password: '',
      remember: true,
    });
      const formStates = reactive({
        username: '',
        password: '',
        remember: true,
        confirmPasswords:'',
        phone:'',
        email:''
      });

        let loginOver=()=>{
          developApis.Login({username:formState.username,password: formState.password}).then((res)=>{
            if (res.status){

              window.localStorage.setItem('token',res.data.data.token)
              window.localStorage.setItem('username',formState.username)
              router.push('home/equitmentButton')
            }
          })
        }
        let registerOver=()=>{

          developApis.resgister({username: formStates.username,password: formStates.password,phone:formStates.phone,email:formStates.email}).then((res)=>{
                if (res.status){
                  message.success("注册完成")
                  formshow.value=true
                }



          }).catch((error)=>{
            message.error("注册失败"+" "+error)
          })

        }
     let usernamevaild=async ()=>{
          if (!formStates.username){
            return Promise.reject("请输入用户名")
          }
     }
        let passwordsvalid= async()=>{
          if (formStates.password==="")
            return Promise.reject("请输入密码")
        }
        function isEmail(email){
         let re = /\S+@\S+\.\S+/;
          return re.test(email);
        }
        let valiEmail=async ()=>{
          if (!formStates.email)
          {
            return Promise.reject('请输入邮箱地址')
          }
          else {
           if (!isEmail(formStates.email)){
             return Promise.reject('请输入正确的邮箱地址')
           }
          }


        }
        function isPhone(phoneNum){
          let res= /^1[3-9]\d{9}$/
          return res.test(phoneNum)
        }
        let phonevaild=async ()=>{
        if (!formStates.phone){
            return Promise.reject('请输入手机号')
          }
          if (!isPhone(formStates.phone)){
            return Promise.reject('请输入正确的手机号')
          }
        }
        const rules={
         password:[{
           required:true,
           message:'请输入密码',
           trigger:'blur'
         }],
          username:[{
            required:true,
            message:'请输入用户名',
            trigger:'blur'
          }],
        };
    const onFinish = () => {
      router.push({
        path:'/switchs'
      })
    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    return {
      formshow,
      formState,
      onFinish,
      onFinishFailed,
      rules,
      formStates,
      registerOver,
      valiEmail,
      passwordsvalid,
      phonevaild,
      usernamevaild,
      loginOver
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