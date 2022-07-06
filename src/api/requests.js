// import axios from 'axios';
// // 导入BASE_URL
// import {BASE_URL} from '../utils/url'

// // 引入进度条
// import nprogress from 'nprogress';
// // 引入进度条样式
// import "nprogress/nprogress.css"
// // start 进度条开始  done 进度条结束
// const requests = axios.create({
//     baseURL:BASE_URL,
//     // 代表请求超时的时间5s
//     timeout:5000,
   
//     headers:{'Content-Type':'application/x-www-form-urlencoded'}
// });
// //请求拦截器
// requests.interceptors.request.use((config)=>{

//   const { url ,data:params} = config; 
//    console.log(config,params)
//     //config 配置对象 对象有一个属性很重要 headers
//     // const token = localStorage.getItem("TOKEN");
//     // if(token){
//     //   config.headers.token= token;  
//     // }
//     // console.log(config)
//     nprogress.start();
//     //添加时间戳
//     if (config.method === 'post') {
//         config.data = {
//           params,
//           _t: Date.parse(new Date()) / 1000
//         }
//       //   return new Promise((resolve, reject) => {
//       //     axios.post(BASE_URL + url, params).then(response => {
//       //         resolve(response.data);
//       //     }, err => {
//       //         reject(err);
//       //     }).catch((error) => {
//       //         reject(error)
//       //     })
//       // })
//         // console.log(config)
//       } else if (config.method === 'get') {
//         config.params = {
//           _t: Date.parse(new Date()) / 1000,
//           ...config.params
//         }
//       }
//     return config;
// },error => {
//     console.log(error)
//     return Promise.reject(error)
// });

// //响应拦截器
// requests.interceptors.response.use( response =>{
//     //成功的回调函数，服务器响应数据回来以后
//     nprogress.done(); 
//     return  response;
// },(error)=>{
//     // console.log(error);
//     return  Promise.reject(error);
// })
// // requests.post = (url, params)=> {
// //   let rootUrl = BASE_URL
// //   return new Promise((resolve, reject) => {
// //       axios.post(rootUrl + url, params).then(response => {
// //           resolve(response.data);
// //       }, err => {
// //           reject(err);
// //       }).catch((error) => {
// //           reject(error)
// //       })
// //   })
// // }

 
// export default requests;
import axios from 'axios'
import {BASE_URL} from '../utils/url'
import { getToken, removeToken } from '../utils/power'
// 封装axios,为其配置默认URL
const requests = axios.create({
    baseURL: BASE_URL
});

// 使用axios拦截器统一处理token
// 添加请求拦截器
requests.interceptors.request.use(config => {
    const { url } = config;
    // 需要请求头才添加请求头
    if (
     url.startsWith('/user/login') ||   url.startsWith('/user/registered') || url.startsWith('/user') 
     
    // &&
    // !url.startsWith('/user/logout') && 
    // !url.startsWith('/user/registered') &&
    // !url.startsWith('/user/login')
     
    ) {
        // 添加请求头
        config.headers.authorization =getToken()
    } 
   
    return config;
});

// 添加响应拦截器
requests.interceptors.response.use(res => {
    const { status } = res.data;
    if (status === 400) {
        // token 失效，直接移除本地 token
        removeToken()
    }
    // 一定要返回 res
    return res
})

export default requests