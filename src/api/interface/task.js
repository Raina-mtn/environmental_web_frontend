import {defHttp} from '@/api/http'

// 计划任务
export const apiGetPlanTaskList = (params)=>{
  return defHttp.post({
    url:'/robot-task/patrolTask/listPlan',
    params
  })
}

// 计划任务-新建
export const apiCreatePlanTaskList = (params)=>{
  return defHttp.post({
    url:'/robot-task/patrolTask/createPlan',
    params
  })
}

// 计划任务-编辑
export const apiEditPlanTaskList = (params)=>{
  return defHttp.post({
    url:'/robot-task/patrolTask/editPlan',
    params
  })
}

// 计划任务-删除
export const apiDeletePlanTaskList = (params)=>{
  return defHttp.post({
    url:'/robot-task/patrolTask/deletePlan',
    params
  })
}

// 计划任务-启动
export const apiStartPlanTask = (params)=>{
  return defHttp.post({
    url:'/robot-task/patrolTask/start',
    params
  })
}

// 获取计划下的任务
export const planTaskById = (params)=>{
  return defHttp.post({
    url:'/robot-task/patrolTask/operations',
    params
  })
}

// 获取非计划下的任务
export const planTaskExceptId = (params)=>{
  return defHttp.post({
    url:'/robot-task/patrolTask/otheroperations',
    params
  })
}

// 获取运维内容
export const opexList = (params)=>{
  return defHttp.post({
    url:'/robot-auto-plan/operation/listByPage',
    params
  })
}

// 编辑任务时获取附属设备详情
export const ecquDetail = (params)=>{
  return defHttp.post({
    url:'/robot-task/patrolTask/plan/equips/detail',
    params
  })
}
