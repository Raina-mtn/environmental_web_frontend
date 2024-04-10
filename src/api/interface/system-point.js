// 系统设置-点位接口
import {defHttp} from '@/api/http'

// 列表
export const list = (params)=>{
  return defHttp.post({
    url:'/robot-device/spot/listByPage',
    params
  })
}

// 设备列表
export const deviceList = (params)=>{
  return defHttp.get({
    url:'/spot/getDeviceCode',
    params
  })
}


// 删除
export const deleted = (params)=>{
  return defHttp.post({
    url:'/robot-device/spot/batch-delete',
    params
  })
}

// 新增
export const add = (params)=>{
  return defHttp.post({
    url:'/robot-device/spot',
    params
  })
}

// 编辑
export const edit = (params, id)=>{
  return defHttp.put({
    url:`/robot-device/spot/${id}`,
    params
  })
}

// 同步
export const asynced = (params)=>{
  return defHttp.get({
    url:`/robot-device/spot/sync`,
    params
  })
}

// 全部点位
export const allList = ()=>{
  return defHttp.get({
    url:`/robot-device/spot/listAll`
  })
}
