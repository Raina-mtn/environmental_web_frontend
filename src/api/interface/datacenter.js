import {defHttp} from '@/api/http'

// 监测指标
export const apiGetDicts = (params)=>{
  return defHttp.get({
    url:'/robot-device/data-center/monitor-data/dict-type',
    params
  })
}

// 空气监测数据
export const apiGetGas = (params)=>{
  return defHttp.post({
    url:'/robot-device/data-center/monitor-gas/listByPage',
    params
  })
}

// 动环监测数据
export const apiGetEnv = (params)=>{
  return defHttp.post({
    url:'/robot-device/data-center/monitor-data/listEnvByPage',
    params
  })
}
