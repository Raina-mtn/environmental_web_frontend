import {defHttp} from '@/api/http'

// 质控任务分页查询
export const apiGetTaskList = (params)=>{
  return defHttp.post({
    url:'/robot-task/qcTask/queryByPage',
    params
  })
}
//更新任务开始时间
export const apiUpdateStartTime = (params)=>{
  return defHttp.post({
    url:'/robot-task/qcTask/updateTaskStartTime',
    params
  })
}
//删除质控任务
export const apiDelTask = (params) => {
  return defHttp.delete({
    url:'/robot-task/qcTask/'+ params
  })
}
//批量删除质控任务
export const apiDelTasks = (params) => {
  return defHttp.post({
    url:'/robot-task/qcTask/deleteByIds',
    params
  })
}
//查询当前任务的质控内容
export const apiGetContentList = (params) => {
  return defHttp.get({
    url:'/robot-task/qcTask/qcContentList/'+ params,
  })
}
//操作栏完成任务接口
export const apiGetFinishedContent = (params) => {
  return defHttp.get({
    url:'/robot-task/qcTask/queryFinishTaskContent/'+ params,
  })
}
//返回任务状态枚举字典()
export const apiGetTaskStateDice = () => {
  return defHttp.get({
    url:'/robot-task/qcTask/instrumentTaskStateDict',
  })
}
//完成任务
export const apiFinishTask = (params)=>{
  return defHttp.post({
    url:'/robot-task/qcTask/finishContent',
    params
  })
}
//批量完成任务
export const apiFinishTasks = (params)=>{
  return defHttp.post({
    url:'/robot-task/qcTask/finishContents',
    params
  })
}
//根据id查询质控任务(暂时没用)
export const apiGetTaskById = (params) => {
  return defHttp.get({
    url:'/robot-task/qcTask/'+ params,
  })
}
