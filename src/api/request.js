import axios from "axios";
const baseURL="http://119.91.218.241:2346/farm/api"

function Axiospost(data)
{
    let myaxios=axios.create({
        baseURL:baseURL,
        data:data,
        headers:{
            token:window.localStorage.getItem('token')
        }
    })
    return myaxios
}
function AxiosGet(params){
    let myaxios=axios.create({
        baseURL:baseURL,
        params:params,
        headers:{
            token:window.localStorage.getItem('token')
        }
    })
    return myaxios
}
const developApis={
    Login(data){
      return axios.post(baseURL+'/admin/login',data)
    },
    resgister(data){
       return axios.post(baseURL+'/admin/register',data)
    },
    getAllBlocks(){
      return axios.get(baseURL+'/block/getAll',{
          headers:
              {
                  token:window.localStorage.getItem('token')
              },
      }
      )
    },
    getBlockDetail(data){
        return axios.post(baseURL+'/block/getOne',data,{
            headers:
                {
                    token:window.localStorage.getItem('token')
                },
        })
    },
    checkTheLand(data){
        return axios.post(baseURL+'/block/getPlan',data,{
            headers:
                {
                    token:window.localStorage.getItem('token')
                },
        })
    },
    getuserInfo(data={}){
        return axios.post(baseURL+'/admin/userInfo',data,{
            headers:
                {
                    token:window.localStorage.getItem('token')
                },
        })
    },
deleteBlocks(data){
    return axios.post(baseURL+'/block/delete',data,{
        headers:
            {
                token:window.localStorage.getItem('token')
            },
    })
},
    checkEquiment(data){
       return axios.post(baseURL+'/equipment/getEqupmentLists',data,{
           headers:
               {
                   token:window.localStorage.getItem('token')
               },
       })
    },
    logout(data){
        return AxiosGet(data).get('/admin/logout')
    },
    passwordReset(data){
        return Axiospost(data).post('/users/resetPass')
    }
}
export default developApis