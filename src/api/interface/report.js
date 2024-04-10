import {defHttp} from '@/api/http'

// 根据类型获取仪器内容
export const getInstrumentByType = (dataType)=>{
  return defHttp.get({
    url:`/robot-external/gas-instrument/${dataType}`
  })
}

// 更新仪器内容
export const updateInstrument = (dataType, params)=>{
  return defHttp.post({
    url:`/robot-external/gas-instrument/${dataType}`,
    params
  })
}

// 获取列表
export const gasList = (type, params)=>{
  return defHttp.post({
    url: `/robot-external/huanmao/${type}/listByPage`,
    params
  })
}

// 查看明细
export const gasDetail = (type, params)=>{
  return defHttp.get({
    url: `/robot-external/huanmao/${type}/detail`,
    params
  })
}

// 查看明细-驾驶舱
export const gasDetailLast = (type)=>{
  return defHttp.get({
    url: `/robot-device/data-center/key-param/latest/${type}`
  })
}

// 导出列表
export const gasExport = (type, params)=>{
  return defHttp.post({
    url: `/robot-report/huanmao/report/${type}`,
    responseType: 'blob',
    params
  })
}

// 更新
export const gasUpdate = (type, params)=>{
  return defHttp.post({
    url: `/robot-external/huanmao/${type}/update`,
    params
  })
}


// 获取精密度列表
export const gasPrecisionList = (type, params)=>{
  return defHttp.post({
    url: `/robot-external/huanmao/precision/${type}/listByPage`,
    params
  })
}

// 查看精密度明细
export const gasPrecisionDetail = (type, params)=>{
  return defHttp.get({
    url: `/robot-external/huanmao/precision/${type}/detail`,
    params
  })
}

// 更新精密度
export const gasPrecisionUpdate = (type, params)=>{
  return defHttp.post({
    url: `/robot-external/huanmao/precision/${type}/update`,
    params
  })
}

// 获取多点校准列表
export const gasPointList = (type, params)=>{
  return defHttp.post({
    url: `/robot-external/huanmao/calibration/${type}/listByPage`,
    params
  })
}

// 查看多点校准明细
export const gasPointDetail = (type, params)=>{
  return defHttp.get({
    url: `/robot-external/huanmao/calibration/${type}/detail`,
    params
  })
}

// 更新多点校准
export const gasPointUpdate = (type, params)=>{
  return defHttp.post({
    url: `/robot-external/huanmao/calibration/${type}/update`,
    params
  })
}

// 获取准确度列表
export const gasTruelyList = (type, params)=>{
  return defHttp.post({
    url: `/robot-external/huanmao/accuracy/${type}/listByPage`,
    params
  })
}

// 查看准确度明细
export const gasTruelyDetail = (type, params)=>{
  return defHttp.get({
    url: `/robot-external/huanmao/accuracy/${type}/detail`,
    params
  })
}

// 更新准确度
export const gasTruelyUpdate = (type, params)=>{
  return defHttp.post({
    url: `/robot-external/huanmao/accuracy/${type}/update`,
    params
  })
}
