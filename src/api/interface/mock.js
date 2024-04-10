import {defHttp} from '@/api/http'

// 获取监测因子数据
export const getHistory = (params)=>{
  return defHttp.post({
    url:`/robot-device/station-home-mock/monitorHistory`,
    params
  })
}

// 更新仪器内容
export const getMonitor = (params)=>{
  return defHttp.post({
    url:`/robot-device/station-home-mock/monitorData`,
    params
  })
}
