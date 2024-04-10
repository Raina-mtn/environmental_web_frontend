import {defHttp} from '@/api/http'
import {exportFile} from '@/utils/util'

// 监测报告
export const apiGetReportList = (params)=>{
  return defHttp.post({
    url:'/robot-patrol/report/list',
    params
  })
}

// 监测报告-确认
export const apiConfirmReport = (params)=>{
  return defHttp.post({
    url:'/robot-patrol/report/confirm',
    params
  })
}

// 监测报告-更新
export const apiUpdateReport = (params)=>{
  return defHttp.post({
    url:'/robot-patrol/report/update',
    params
  })
}

// 监测报告-导出
export const apiExportList =  ({url, params, token,name})=> exportFile({url, params, token,name})


// 巡检结果列表
export const apiGetPatrolResult = (params)=>{
  return defHttp.post({
    url:'/robot-patrol/patrolResult/listPatrolResultsArchive',
    params
  })
}

// 任务执行列表
export const apiGetPatrolTask = (params)=>{
  return defHttp.post({
    url:'/robot-task/patrolTask/listByPage',
    params
  })
}

// 任务执行列表--新
export const apiGetPatrolTaskNew = (params)=>{
  return defHttp.post({
    url:'/robot-task/patrolTask/plansummary',
    params
  })
}

// 任务终止
export const taskPause = (taskId)=>{
  return defHttp.get({
    url: `/robot-task/taskInstance/${taskId}/stop`
  })
}
