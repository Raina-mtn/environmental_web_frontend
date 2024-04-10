import {defHttp} from '@/api/http'
// 登录
export const apiLogin = (params)=>{
  return defHttp.post({
    url:'/oauth/token',
    params
  })
}

// 获取所有站点
export const apiGetStation = (params)=>{
  return defHttp.get({
    url:'/robot-device/substation/getAllStation',
    params
  })
}
// export const apiGetStation = ()=>new Promise((resolve, reject) => {
//   resolve(
//     {
//       data:[
//         {
//           id:1000000001,
//           stationName:'西溪湿地站'
//         },
//         {
//           id:100000000112312,
//           stationName:'西溪湿地站123'
//         },
//       ]
//     }
//   )
// })