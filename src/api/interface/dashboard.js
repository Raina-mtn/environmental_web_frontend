// 统计接口
import {defHttp} from '@/api/http'

// 统计
export const apiGetStat = (params)=>{
  return defHttp.post({
    url:'/robot-device/station-home/stat',
    params
  })
}

// 获取相机接口
export const apiGetCamera = (params)=>{
  return defHttp.post({
    url:'/robot-device/station-home/camera',
    params
  })
}

// 入侵预警
export const apiGetIntruDer = (params)=>{
  return defHttp.post({
    url:'/robot-device/station-home/intruder',
    params
  })
}
// 授权
export const apiAuthoriseIntruDer = (params)=>{
  return defHttp.post({
    url:'/robot-device/intruder/authoriseIntrude',
    params
  })
}

// 屏柜门开
export const apiOpenCabinet = (params)=>{
  return defHttp.post({
    url:'/robot-control/cabinet/open',
    params
  })
}
// 屏柜门关
export const apiCloseCabinet = (params)=>{
  return defHttp.post({
    url:'/robot-control/cabinet/close',
    params
  })
}

// 综合驾驶舱
// 统计
export const apiGetCompreStat = (params)=>{
  return defHttp.post({
    url:'/robot-device/comprehensive-home/stat',
    params
  })
}
// 获取站点信息
export const apiGetCompreStationInfo = (params)=>{
  return defHttp.post({
    url:'/robot-device/comprehensive-home/station',
    params
  })
}
// // 设备预警
// export const apiGetIntruWarnDefect = (params) => {
//   return defHttp.post({
//     url: '/robot-patrol/patrol/warn-defect',
//     params
//   })
// }
// 全局预警
export const apiGetCompreWarning = (params)=>{
  return defHttp.post({
    url:'/robot-device/comprehensive-home/warning',
    params
  })
}
// 全局预警
export const apiGetCompreWarningCalendar = (params)=>{
  return defHttp.post({
    url:'/robot-device/comprehensive-home/warning-stat',
    params
  })
}

// 正在运行的任务
export const apiGetRunningTask = (params)=>{
  return defHttp.post({
    url:'/robot-device/station-home/runningtasks',
    params
  })
}

// 下发运维项目任务
export const apiGetIssueOmContent = (params) => {
  return defHttp.post({
    url:'/robot-task/flexibleTask/issueOmContent',
    params
  })
}

// 查询今日运维任务统计
export const apiGetOmTaskStat = (params) => {
  return defHttp.post({
    url:'/robot-device/station-home/omTaskStat',
    params
  })
}
//批量完成运维内容
export const apiFinishContents = (params) => {
  return defHttp.post({
    url:'/robot-task/maintenanceTask/finishContents',
    params
  })
}
//图片上传
export const apiUploadFile = (params) => {
  return defHttp.post({
    url:'/robot-file/uploadFile',
    params
  })
}
// 拓扑监测数据
export const apiGetTopo = (params) => {
  return defHttp.post({
    url:'/robot-device/station-home/topology',
    params
  })
}

// 查询今日运维任务-运维内容
export const apiGetOmTaskContent = (params) => {
  return defHttp.post({
    url:'/robot-device/station-home/omTaskContent',
    params
  })
}
// 
export const apiGetOmTaskProject = (params) => {
  return defHttp.post({
    url:'/robot-device/station-home/omTaskProject',
    params
  })
}
// 环境监测数据
export const apiGetVibe = (params) => {
  return defHttp.post({
    url:'/robot-device/station-home/env',
    params
  })
}

// 质控监测图表一
export const apiGetQualityOne = (params) => {
  return defHttp.post({
    url:'/robot-device/gasQc/qcChart1ByDevice',
    params
  })
}

// 质控监测图表二
export const apiGetQualityTwo = (params) => {
  return defHttp.post({
    url:'/robot-device/gasQc/qcChart2ByDevice',
    params
  })
}

// 健康监测字典
export const apiGetHealthDict = () => {
  return defHttp.get({
    url:'/robot-device/dict/healthTypeDict'
  })
}

// 健康监测数据
export const apiGetHealthData = (params) => {
  return defHttp.post({
    url:'/robot-device/healthScore/scoreChart',
    params
  })
}

// 查询质控内容
export const apiGetQcContents = (params) => {
  return defHttp.get({
    url:`/robot-auto-plan/qcContents?instrumentType=${params}`
  })
}

// 远程质控
export const apiRemoteQc = (id) => {
  return defHttp.post({
    url: `/robot-task/qcPlan/remoteQc?contentId=${id}`,
  })
}


// 一键运维
export const apiOneKeyOperate = (params) => {
  return defHttp.post({
    url:'/robot-device/station-home/oneKeyOperate',
    params
  })
}

// 一键质控
export const apiOneKeyQc = (params) => {
  return defHttp.post({
    url:'/robot-device/station-home/oneKeyQc',
    params
  })
}