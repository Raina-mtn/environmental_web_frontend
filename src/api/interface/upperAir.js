import {defHttp} from '@/api/http'
import {exportFile} from '@/utils/util'

// 获取仪器列表
export const list = (params)=>{
  return defHttp.post({
    url:'/robot-device/instrument-sentry/listByPage',
    params
  })
}

// 编辑仪器
export const update = (id, params)=>{
  return defHttp.post({
    url:'/robot-device/instrument-sentry/' + id,
    params
  })
}

// 添加仪器
export const create = (params)=>{
  return defHttp.post({
    url:'/robot-device/instrument-sentry',
    params
  })
}

// 删除仪器
export const deletes = (params)=>{
  return defHttp.post({
    url:'/robot-device/instrument-sentry/batch-delete',
    params
  })
}

// 下载附属文件
export const download =  ({url, params, token,name})=> exportFile({url, params, token,name})
