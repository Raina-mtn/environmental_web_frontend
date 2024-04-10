import {defHttp} from '@/api/http'
import {exportFile} from '@/utils/util'

// 获取仪器列表
export const list = (params)=>{
  return defHttp.post({
    url:'/robot-device/instrument-gas/listByPage',
    params
  })
}

// 仪器详情
export const detail = (id)=>{
  return defHttp.get({
    url:'/robot-device/instrument-gas/'+ id,
  })
}

// 编辑仪器
export const update = (id, params)=>{
  return defHttp.post({
    url:'/robot-device/instrument-gas/' + id,
    params
  })
}

// 添加仪器
export const create = (params)=>{
  return defHttp.post({
    url:'/robot-device/instrument-gas',
    params
  })
}

// 删除仪器
export const deletes = (params)=>{
  return defHttp.post({
    url:'/robot-device/instrument-gas/batch-delete',
    params
  })
}

// 下载附属文件
export const download =  ({url, params, token,name})=> exportFile({url, params, token,name})


// 气体仪器类型下拉字典
export const apiGetInstrumentTypeDict = (params)=>{
  return defHttp.get({
    url:'/robot-device/instrument-gas/dict/type',
    params
  })
}