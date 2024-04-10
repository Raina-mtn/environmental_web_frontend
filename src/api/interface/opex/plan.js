import {defHttp} from '@/api/http'

// 运维计划-获取列表
export const list = (params)=>{
  return defHttp.post({
    url: `/robot-task/maintenancePlan/queryByPage`,
    params
  })
}

// 运维计划-新增
export const add = (params)=>{
  return defHttp.post({
    url: `/robot-task/maintenancePlan/add`,
    params
  })
}

// 运维计划-编辑
export const edit = (params)=>{
  return defHttp.post({
    url: `/robot-task/maintenancePlan/update`,
    params
  })
}

// 运维计划-删除
export const deleted = (params)=>{
  return defHttp.post({
    url: `/robot-task/maintenancePlan/deleteByIds`,
    params
  })
}

// 运维计划-任务类型
export const apiGetTaskType = (params)=>{
  return defHttp.get({
    url: `/robot-task/maintenancePlan/executeTypeDict`,
    params
  })
}

// 运维计划-执行类型
export const apiGetExecuteType = (params)=>{
  return defHttp.get({
    url: `/robot-task/maintenancePlan/executeTypeDict`,
    params
  })
}

// 运维计划-周期类型
export const apiGetPeriodType = (params)=>{
  return defHttp.get({
    url: `/robot-task/periodType/dict`,
    params
  })
}

// 运维计划-获取指定 id 的运维计划
export const apiGetPlanDetail = (params)=>{
  return defHttp.get({
    url: `/robot-task/maintenancePlan/${params}`,
    params
  })
}
