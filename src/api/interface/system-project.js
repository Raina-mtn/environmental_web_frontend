import {defHttp} from '@/api/http'

// 获取列表
export const list = (params)=>{
  return defHttp.post({
    url:'/robot-auto-plan/operation/listByPage',
    params
  })
}

// 新增
export const add = (params)=>{
  return defHttp.post({
    url:'/robot-auto-plan/operation',
    params
  })
}

// 编辑
export const edit = (params, id)=>{
  return defHttp.put({
    url:`/robot-auto-plan/operation/${id}`,
    params
  })
}

// 删除
export const deleted = (params)=>{
  return defHttp.post({
    url:`/robot-auto-plan/operation/batch-delete`,
    params
  })
}

// 运维内容列表
export const contents = (params)=>{
  return defHttp.get({
    url:`/robot-auto-plan/operation/list-content`,
    params
  })
}
