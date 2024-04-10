import {defHttp} from '@/api/http'

// 关键参数
export const list = (params,dataCode)=>{
  return defHttp.post({
    url:`/robot-device/data-center/key-param/listByPage/${dataCode}`,
    params
  })
}

// 关键参数-详情
export const detail = (dataCode,id)=>{
  return defHttp.get({
    url:`/robot-device/data-center/key-param/detail/${dataCode}/${id}`
  })
}
