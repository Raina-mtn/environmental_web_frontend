import {defHttp} from '@/api/http'

// 获取设置列表
export const settingList = (params)=>{
  return defHttp.post({
    url:'/robot-auto-plan/autoplan/config/list',
    params
  })
}

// 根据配置id获取属于它的项目
export const tasksById = (params)=>{
  return defHttp.post({
    url:'/robot-auto-plan/autoplan/configoperation/list',
    params
  })
}

// 根据配置id获取属于它的项目
export const tasksByIdExclude = (params)=>{
  return defHttp.post({
    url:'/robot-auto-plan/autoplan/configoperation/otheroperations',
    params
  })
}

// 根据配置id添加项目
export const addTasksById = (params)=>{
  return defHttp.post({
    url:'/robot-auto-plan/autoplan/config/addoperations',
    params
  })
}

// 根据id删除项目
export const removeTasksById = (params)=>{
  return defHttp.post({
    url:'/robot-auto-plan/autoplan/configoperation/remove',
    params
  })
}

// 获取所有机器人列表
export const robotLists = (params)=>{
  return defHttp.get({
    url:'/robot-device/robotInfo/listRobots',
    params
  })
}

// 创建计划任务
export const createPlanTask = (params)=>{
  return defHttp.post({
    url:'/robot-auto-plan/autoplan/config/generate',
    params
  })
}
