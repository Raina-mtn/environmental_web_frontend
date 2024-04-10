import {defHttp} from '@/api/http'

// 运维任务-获取列表
export const apiList = (params)=>{
  return defHttp.post({
    url: `/robot-task/maintenanceTask/queryByPage`,
    params
  })
}

// 运维任务-编辑
export const apiEdit = (params)=>{
  return defHttp.post({
    url: `/robot-task/maintenanceTask/updateTaskStartTime`,
    params
  })
}

// 运维任务-删除
export const apiDeleted = (params)=>{
  return defHttp.post({
    url: `/robot-task/maintenanceTask/deleteByIds`,
    params
  })
}

// 运维任务-任务类型
export const apiGetTaskType = (params)=>{
  return defHttp.get({
    url: `/robot-task/maintenancePlan/executeTypeDict`,
    params
  })
}

// 运维任务-执行类型
export const apiGetExecuteType = (params)=>{
  return defHttp.get({
    url: `/robot-task/maintenancePlan/executeTypeDict`,
    params
  })
}

// 运维任务-周期类型
export const apiGetPeriodType = (params)=>{
  return defHttp.get({
    url: `/robot-task/periodType/dict`,
    params
  })
}

// 运维任务-完成任务列表
export const apiOverList = (params)=>{
  return defHttp.get({
    url: `/robot-task/maintenanceTask/finishContent/${params}`
  })
}

// 运维任务-获取指定 id 的运维内容
export const apiGetPlanList = (params)=>{
  return defHttp.get({
    url: `/robot-task/maintenanceTask/maintenanceContent/${params}`
  })
}

// 运维任务-终止任务
export const apiPause = (params)=>{
  return defHttp.post({
    url: `/robot-task/maintenanceTask/terminalTask/${params}`
  })
}

