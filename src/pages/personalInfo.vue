<template>
    <div>
      <div id="bg">
        <a-button type="primary" style="position: absolute;left:70%" @click="showUpdateDialog">编辑信息</a-button>
        <a-button type="primary" style="position: absolute;left:62%" @click="passwordChangeDialogshow">修改密码</a-button>
        <a-modal v-model:visible="visible" title="修改用户信息" @ok="handleok">
            <p> 用户名：<a-input v-model:value="formdata.username" style="width: 200px;margin-left: 10px;"></a-input></p>
     
     
     <p> 邮箱：<a-input v-model:value="formdata.email" style="width: 200px;margin-left: 25px;"></a-input></p>
     <p> 手机号：<a-input v-model:value="formdata.phone" style="width: 200px;margin-left: 10px;"></a-input></p>
     
    
    </a-modal>
    <a-modal v-model:visible="passwordChangeDialog" title="修改密码" @ok="updatePassword">
    <p> 旧密码：<a-input v-model:value="passwordFormData.oldPassword" type="password" style="width: 200px;margin-left: 10px;"></a-input></p>
     
     
     <p> 新密码：<a-input v-model:value="passwordFormData.newPassword" type="password" style="width: 200px;margin-left: 10px;"></a-input></p>
    
     
    
    </a-modal>

        <el-descriptions title="用户信息" :column="2"   direction="vertical" border>
            <el-descriptions-item label="用户头像" label-align="center" align="center" width="150px"
      ><a-button type="text">查看</a-button></el-descriptions-item
    >
            <el-descriptions-item
      label="用户名"
      label-align="center"
      align="center"
      label-class-name="my-label"
      class-name="my-content"
      width="100px"
      >{{ userInfo.username }}</el-descriptions-item
    >
    <el-descriptions-item label="手机号" label-align="center" align="center" width="150px"
      >{{ userInfo.phone }}</el-descriptions-item
    >
    <el-descriptions-item label="邮箱地址" label-align="center" align="center" width="150px"
      >{{ userInfo.email }}</el-descriptions-item
    >
    
  
   
  </el-descriptions>
      </div>
    </div>
</template>

<script>
import { onMounted, reactive,ref } from 'vue';
import developApis from '@/api/request';
import { message } from 'ant-design-vue';
import encodes from '@/utils/encryptor';
export default {
    setup () {
        let visible=ref(false);
        let passwordChangeDialog=ref(false);
        let PublicKeys='';
        let userInfo=reactive({
            username:'',
            phone:'',
            email:'',
            icon:''
        })
        let formdata=reactive({
            username:'',
            phone:'',
            email:'',
         
        })
        let passwordFormData=reactive({
            oldPassword:'',
            newPassword:''
        })
        let updatePassword=()=>{
            
            if (passwordFormData.oldPassword===''||passwordFormData.newPassword==='')
            {
                alert('信息未填写完整')
                return;
            }
            if (passwordFormData.newPassword.length>8)
            {
                alert('密码长度不能超过8位')
                return;
            }
            let oldPassword=encodes(PublicKeys,passwordFormData.oldPassword);
            let newPassword=encodes(PublicKeys,passwordFormData.newPassword);
            developApis.passwordChange({oldPassword:oldPassword,newPassword:newPassword}).then((res)=>{
                if (res.status){
                    passwordChangeDialog.value=false
                    message.success('修改成功')
                }
            }).catch((error)=>{
                message.error('修改错误,'+error+",请重试")
            })
        }
        let getPublicKeys=async()=>{
    try {
const response = await developApis.getPublicKeys();
PublicKeys= response.data.data;
console.log(PublicKeys.value);
} catch (error) {
console.error(error);
}
  }
      getPublicKeys();
        let getdata=()=>{
            developApis.getPersonalInfo().then((res)=>{
                userInfo.username=res.data.data.username;
                userInfo.phone=res.data.data.phone;
                userInfo.email=res.data.data.email;
                formdata.username=res.data.data.username;
                formdata.phone=res.data.data.phone;
                formdata.email=res.data.data.email;
            })
        }
        onMounted(()=>{
            getdata()
        })
        let passwordChangeDialogshow=()=>{
            passwordChangeDialog.value=true;
        }
        let showUpdateDialog=()=>{
            formdata.username=userInfo.username;
                formdata.phone=userInfo.phone;
                formdata.email=userInfo.email;
            visible.value=true;

        }
        let handleok=()=>{
            if (formdata.username==''||formdata.email==''||formdata.phone==''){
                message.error('信息未填写完整')
                return
            }
        developApis.updatePersonalInfo(formdata).then((res)=>{
            if (res.status){
                message.success('修改成功')
                visible.value=false;
                getdata()
            }
        })
        }
        return {
            userInfo,
            handleok,
            visible,
            formdata,
            getdata,
            showUpdateDialog,
            passwordChangeDialog,
            passwordChangeDialogshow,
            passwordFormData,
            updatePassword
        }
    }
}
</script>

<style  scoped>
#bg{
    margin-top:10%;
    margin-left:13%;
    width:65%;
}
.my-label {
  background: var(--el-color-success-light-9);

}
.my-content {
  background: var(--el-color-danger-light-9);
}
</style>