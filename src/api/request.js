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
    deleteEquiment(data){
        return axios.post(baseURL+'/equipment/delete',data,{
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
    },
    addLand(data){
        return axios.post(baseURL+'/block/add',data,{
            headers:
                {
                    token:window.localStorage.getItem('token')
                },
        })
    },
    getPlantById(data){
        return axios.post(baseURL+'/planting/getPlanting',data,{
            headers:{
                token:window.localStorage.getItem('token')
            }
        })
    },
    getTemperature(data){
        return axios.post(baseURL+'/data/getTemperature',data,{
            headers:{
                token:window.localStorage.getItem('token')
            }
        })
    },
    getSunshine(data){
        return axios.post(baseURL+'/data/getSunShine',data,{
            headers:{
                token:window.localStorage.getItem('token')
            }
        })},
        getRainfall(data){
    return axios.post(baseURL+'/data/getRailfall',data,{
        headers:{
            token:window.localStorage.getItem('token')
        }
    })
        },
        getairWet(data){
            return axios.post(baseURL+'/data/getAirHumidity',data,{
                headers:{
                    token:window.localStorage.getItem('token')
                }
            })
        },
        getEarthTem(data){
            return axios.post(baseURL+'/data/getLandHumidity',data,{
                headers:{
                    token:window.localStorage.getItem('token')
                }
            })
        },
        getTemX(){
            return axios.get(baseURL+'/data/getWeek',{
                headers:
                    {
                        token:window.localStorage.getItem('token')
                    },
            }
            )
        },
        updatePersonalInfo(data){
            return axios.post(baseURL+'/admin/updateInfo',data,{
                headers:{
                    token:window.localStorage.getItem('token')
                }
            })
        },
        getPersonalInfo(data){
            return axios.post(baseURL+'/admin/userInfo',data,{
                headers:{
                    token:window.localStorage.getItem('token')
                }
            })
        },
        logout(data){
            return axios.post(baseURL+'/admin/logout',data,{
                headers:{
                    token:window.localStorage.getItem('token')
                }
            })
        },
        getTemY(){
            return axios.get(baseURL+'/data/getWeekY',{
                headers:
                    {
                        token:window.localStorage.getItem('token')
                    },
            }
            )
        },
        getFunnel(){
            return axios.get(baseURL+'/data/getFunualx',{
                headers:
                    {
                        token:window.localStorage.getItem('token')
                    },
            }
            )
        },
        getWetY(){
            return axios.get(baseURL+'/data/getY',{
                headers:
                    {
                        token:window.localStorage.getItem('token')
                    },
            }
            )
        },
        passwordChange(data){
            return axios.post(baseURL+'/admin/updatePassword',data,{
                headers:{
                    token:window.localStorage.getItem('token')
                }
            })
        },
        getPublicKeys(){
            return axios.get(baseURL+'/admin/getPublicKey')
        }

}
export default developApis