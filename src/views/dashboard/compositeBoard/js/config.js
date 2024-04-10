// 监管情况
export const stationNumberConfig =  [
  {img: require('@/assets/images/compositeBoard/icon_normal.png'),key: 'normalCount', name: '正常',  unit: '个'},
  {img: require('@/assets/images/compositeBoard/icon_offline.png'),key: 'maintainedCount', name: '维修',  unit: '个'},
  {img: require('@/assets/images/compositeBoard/icon_warning.png'),key: 'warningCount', name: '预警',   unit: '个'},
]

//设备概况
export const equipmentConfig = [
  {img: require('@/assets/images/compositeBoard/icon_robot.png'),key: 'operationRobotCount', name: '作业机器人',  unit: '台'},
  {img: require('@/assets/images/compositeBoard/icon_robot.png'),key: 'patrolRobotCount', name: '巡检机器人',  unit: '台'},
  {img: require('@/assets/images/compositeBoard/icon_uav.png'),key: 'droneCount', name: '无人机',  unit: '台'},
  {img: require('@/assets/images/compositeBoard/icon_monitor.png'),key: 'cameraTotalCount', name: '监控摄像头',  unit: '路'},
]

// 巡检概况
export const patrolWorksConfig =  [
  {img: require('@/assets/images/board/icon_line.png'),key: 'patrolRoute', name: '运维线路',  unit: '条'},
  {img: require('@/assets/images/board/icon_time.png'),key: 'totalPatrolDuration', name: '总运维时长',  unit: 'h'},
  {img: require('@/assets/images/board/icon_work.png'),key: 'totalPatrolTaskCount', name: '总运维任务',   unit: '次'},
]

// 智能预警研判
export const warnConfig =  [
  {img: require('@/assets/images/board/icon_warn.png'),key: 'patrolDefectCount', name: '当日运维预警',  unit: '次'},
  {img: require('@/assets/images/board/icon_warning.png'),key: 'monitorErrorCount', name: '当日监测预警',  unit: '次'},
]


