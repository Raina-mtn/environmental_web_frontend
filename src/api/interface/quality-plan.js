import {defHttp} from '@/api/http'

// 质控计划-获取列表
export const list = (params)=>{
  return defHttp.post({
    url: `/robot-task/qcPlan/queryByPage`,
    params
  })
}

// 质控计划-新增
export const add = (params)=>{
  return defHttp.post({
    url: `/robot-task/qcPlan/add`,
    params
  })
}

// 质控计划-编辑
export const edit = (params)=>{
  return defHttp.post({
    url: `/robot-task/qcPlan/update`,
    params
  })
}

// 质控计划-删除
export const deleted = (params)=>{
  return defHttp.post({
    url: `/robot-task/qcPlan/deleteByIds`,
    params
  })
}

// 质控计划-任务类型
export const apiGetTaskType = (params)=>{
  return defHttp.get({
    url: `/robot-task/generateTaskType/dict`,
    params
  })
}

// 质控计划-执行类型
export const apiGetExecuteType = (params)=>{
  return defHttp.get({
    url: `/robot-task/executeType/dict`,
    params
  })
}

// 质控计划-周期类型
export const apiGetPeriodType = (params)=>{
  return defHttp.get({
    url: `/robot-task/periodType/dict`,
    params
  })
}

// 质控计划-获取指定 id 的质控计划
export const apiGetPlanDetail = (params)=>{
  return defHttp.get({
    url: `/robot-task/qcPlan/${params}`,
    params
  })
}
