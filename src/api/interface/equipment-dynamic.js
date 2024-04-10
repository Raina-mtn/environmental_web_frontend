import {defHttp} from '@/api/http'

// 最新监测数据
export const list = (params)=>{
  return defHttp.get({
    url:'/robot-device/data-center/monitor-data/latest-monitor',
    params
  })
}

// 空调-遥控器状态
export const apiGetAirCondition = (params)=>{
  return defHttp.get({
    url:'/robot-device/data-center/monitor-data/air-condition',
    params
  })
}

// 门禁-门禁状态
export const apiGetDoor = (params)=>{
  return defHttp.get({
    url:'/robot-device/data-center/monitor-data/door',
    params
  })
}

// 空调-命令下送
export const apiSetAirCondition = (params)=>{
  return defHttp.post({
    url:'/robot-device/instrument-control/air-condition-control',
    params
  })
}

// 门禁-命令下送
export const apiSetDoor = (params)=>{
  return defHttp.post({
    url:'/robot-device/instrument-control/door-control',
    params
  })
}