import {defHttp} from '@/api/http'

//  环境监测
export const apiGetEnvironment = (params)=>{
  return defHttp.post({
    url:'/robot-device/monitor-data/list',
    params
  })
}

export const apiGetCameraList = (params)=>{
  return defHttp.post({
    url:'/robot-device/camera/listCamera',
    params
  })
}