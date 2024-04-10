import {defHttp} from '@/api/http'

// 分页查询质控内容
export const list = (params)=>{
  return defHttp.post({
    url:'/robot-auto-plan/qcContent/queryByPage',
    params
  })
}

// 删除
export const deleted = (params)=>{
  return defHttp.post({
    url:'/robot-auto-plan/qcContent/deleteByIds',
    params
  })
}

// 质控类型字典
export const apigetDict = (params)=>{
  return defHttp.get({
    url:'/robot-auto-plan/qcType/dict',
    params
  })
}

// 仪器类型字典
export const apigetInstrumentDict = (params)=>{
  return defHttp.get({
    url:'/robot-auto-plan/qcInstrument/dict',
    params
  })
}

// 新增
export const add = (params)=>{
  return defHttp.post({
    url:'/robot-auto-plan/qcContent/save',
    params
  })
}

// 更新
export const update = (params)=>{
  return defHttp.post({
    url:'/robot-auto-plan/qcContent/update',
    params
  })
}

// 根据id查询
export const apiGetData = (params)=>{
  return defHttp.get({
    url:`/robot-auto-plan/qcContent/${params}`
  })
}
