import {defHttp} from '@/api/http'

// 质控记录-获取列表
export const list = (params)=>{
  return defHttp.post({
    url: `/robot-device/qcArchive/queryByPage`,
    params
  })
}

// 质控记录-删除
export const deleted = (params)=>{
  return defHttp.delete({
    url: `/robot-device/qcArchive/${params}`,
    params
  })
}

// 质控记录-详情
export const detail = (params)=>{
  return defHttp.get({
    url: `/robot-device/qcArchive/${params}`
  })
}
//根据任务和质控内容查询质控记录
export const apiDeviceQueryByTaskAndContent = (params)=>{
  return defHttp.post({
    url:'/robot-device/qcArchive/queryByTaskAndContent',
    params
  })
}
//获取所有质控仪器类型字典
export const apiQcInstrumentType = (params)=>{
  return defHttp.get({
    url:'/robot-auto-plan/qcInstrument/type/dict',
    params
  })
}