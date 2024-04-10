// 自动化运维记录接口
import {defHttp} from '@/api/http'

// 列表
export const list = (params)=>{
  return defHttp.post({
    url:'/robot-patrol/patrolContent/listByPage',
    params
  })
}

// 删除
export const deleted = (params)=>{
  return defHttp.post({
    url:'/robot-patrol/patrolContent/batch-delete',
    params
  })
}

// 编辑
export const edit = (params)=>{
  return defHttp.put({
    url:'/robot-patrol/patrolContent',
    params
  })
}

// 编辑
export const exported = (params)=>{
  return defHttp.post({
    url:'/robot-report/patrolTask/exportContentTask',
    responseType: 'blob',
    params
  })
}

//根据任务和运维内容查询运维记录
export const apiQueryByTaskAndContent = (params)=>{
  return defHttp.post({
    url:'/robot-patrol/omRecord/queryByTaskAndContent',
    params
  })
}
