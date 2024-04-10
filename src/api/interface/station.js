import {defHttp} from '@/api/http'

// 站点列表
export const apiGetStationList = (params)=>{
  return defHttp.post({
    url:'/robot-device/substation/listStationByPage',
    params
  })
}

// 站点列表-更新
export const apiUpdateStation = (params)=>{
  return defHttp.post({
    url:'/robot-device/substation/updateStationInfo',
    params
  })
}
