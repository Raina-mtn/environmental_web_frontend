import {defHttp} from '@/api/http'

// 机器人列表
export const apiGetEquipmentList = (params)=>{
  return defHttp.post({
    url:'/robot-device/equipment/listByPage',
    params
  })
}

// 机器人列表-增加
export const apiAddEquipment = (params)=>{
  return defHttp.post({
    url:'/robot-device/equipment/addEquipment',
    params
  })
}

// 机器人列表-更新
export const apiUpdateEquipment = (params)=>{
  return defHttp.post({
    url:'/robot-device/equipment/updateEquipment',
    params
  })
}

// 机器人列表-删除
export const apiDeleteEquipment = (params)=>{
  return defHttp.post({
    url:'/robot-device/equipment/delete',
    params
  })
}

// 机器人详情
export const robotDetail = (params)=>{
  return defHttp.get({
    url:'/robot-device/equipment/getEquipmentById',
    params
  })
}

// 机器人列表
export const robotList = (params)=>{
  return defHttp.post({
    url:'/robot-device/equipment/v2/listByPage',
    params
  })
}

// 机器人所有列表
export const robotAllList = (params)=>{
  return defHttp.post({
    url:'/robot-device/equipment/v2/listByQuery',
    params
  })
}
