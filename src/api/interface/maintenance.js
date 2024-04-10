import {defHttp} from '@/api/http'

// 运维列表
export const apiGetMaintenanceList = (params)=>{
  return defHttp.post({
    url:'/robot-patrol/maintenance/list',
    params
  })
}

// 运维列表-新增
export const apiCreateMaintenance = (params)=>{
  return defHttp.post({
    url:'/robot-patrol/maintenance/create',
    params
  })
}

// 入侵列表
export const apiGetIntruderList = (params)=>{
  return defHttp.post({
    url:'/robot-device/intruder/list',
    params
  })
}