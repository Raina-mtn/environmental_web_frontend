// 系统设置-点位接口
import {defHttp} from '@/api/http'

// 获取所有分类
export const getAllClass = ()=>{
  return defHttp.get({
    url:'/robot-device/alarm-config/class'
  })
}

// 获取分类下实体
export const getClassEntity = (params)=>{
  return defHttp.get({
    url:'/robot-device/alarm-config/class-entity',
    params
  })
}

// 获取实体规则
export const getEntityRule = (params)=>{
  return defHttp.get({
    url:'/robot-device/alarm-config/rule-content',
    params
  })
}

// 编辑规则
export const editRule = (params)=>{
  return defHttp.post({
    url:'/robot-device/alarm-config/save',
    params
  })
}
