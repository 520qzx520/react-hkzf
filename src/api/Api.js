import requests from "./requests"

const api = {
    //登录
    goLogin(params){
        
        return requests.post(`/user/login`,params); 
    },
    goRegister(params){
      return requests.post(`/user/registered`,params); 
    },
     //发送请求获取轮播图片
     getSwiper(){
         return requests.get('/home/swiper');
     },
     //获取 租房数据
     getGroups(){
         return requests.get('/home/groups',{
            params: {
              area: 'AREA%7C88cff55c-aaa4-e2e0',
            },
          })
     },
     // 获取咨询数据
     getConsult(){
         return requests.get('/home/news',{
            params: {
              area: 'AREA%7C88cff55c-aaa4-e2e0',
            },
          })
     },
      //获取城市房数信息
      getCityRooms(params){
        return requests.get(`/area/map`,params)
      },
         //获取小区房源信息
         getHouseList(params){
        return requests.get(`/houses`,params)
      }
}

export default api