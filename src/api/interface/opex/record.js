import {defHttp} from '@/api/http'

// 运维记录-获取列表
export const apiList = (params)=>{
  return defHttp.post({
    url: `/robot-patrol/omRecord/queryByPage`,
    params
  })
}

// 运维记录-新增
export const apiAdd = (params)=>{
  return defHttp.post({
    url: `/robot-task/maintenancePlan/add`,
    params
  })
}

// 运维记录-编辑
export const apiEdit = (params)=>{
  return defHttp.post({
    url: `/robot-patrol/omRecord/update`,
    params
  })
}

// 运维记录-删除
export const apiDeleted = (params)=>{
  return defHttp.post({
    url: `/robot-patrol/omRecord/deleteByIds`,
    params
  })
}

// 运维记录-导出
export const apiExport = (params)=>{
  return defHttp.post({
    url: `/robot-report/patrolTask/exportOmRecords`,
    responseType: 'blob',
    params
  })
}

// 运维记录-任务类型
export const apiGetTaskType = (params)=>{
  return defHttp.get({
    url: `/robot-task/maintenancePlan/executeTypeDict`,
    params
  })
}

// 运维记录-执行类型
export const apiGetExecuteType = (params)=>{
  return defHttp.get({
    url: `/robot-task/maintenancePlan/executeTypeDict`,
    params
  })
}

// 运维记录-周期类型
export const apiGetPeriodType = (params)=>{
  return defHttp.get({
    url: `/robot-task/periodType/dict`,
    params
  })
}

// 运维记录-获取指定 id 的运维详情
export const apiGetDetail = (params)=>{
  return defHttp.get({
    url: `/robot-patrol/omRecord/${params}`
  })
}
