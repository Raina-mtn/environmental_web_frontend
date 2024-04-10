import {defHttp} from '@/api/http'

// 巡检点管理
export const apiGetDeviceList = (params)=>{
  return defHttp.post({
    url:'/robot-device/device/listByPage',
    params
  })
}

// 巡检点管理-更新
export const apiUpdateDevice = (params)=>{
  return defHttp.post({
    url:'/robot-device/device/updateProject',
    params
  })
}

// 巡检点管理-删除
export const apiDeleteDevice = (params)=>{
  return defHttp.post({
    url:'/robot-device/device/deleteDeviceByIds',
    params
  })
}

// 巡检点管理-同步
export const apiSynchronousDevice = (params)=>{
  return defHttp.post({
    url:'/robot-device/synchronousDevice',
    params
  })
}
