export const equimentStaticConfig = {
  robot: {
    img: require('@/assets/images/board/icon_robot.png'),
    datasource: [{ name: '待命中', key: 'waiting', valueKey: 'robotIdleCount' }, { name: '任务中', key: 'running', valueKey: 'robotWorkCount' }, { name: '离线', key: 'offline', valueKey: 'robotOfflineCount' }]
  },
  monitor: {
    img: require('@/assets/images/board/icon_monitor.png'),
    datasource: [{ name: '在线', key: 'waiting', valueKey: 'cameraWorkCount' }, { name: '离线', key: 'offline', valueKey: 'cameraOfflineCount' }]
  }
}

export const patrolWorksConfig = [
  { img: require('@/assets/images/board/icon_line.png'), key: 'patrolRoute', name: '运维线路', unit: '条' },
  { img: require('@/assets/images/board/icon_time.png'), key: 'totalPatrolDuration', name: '总运维时长', unit: 'h', defaultValue: 45 },
  { img: require('@/assets/images/board/icon_work.png'), key: 'totalPatrolTaskCount', name: '总运维任务', unit: '次' },
]

export const patrolTasksConfig = [
  { img: require('@/assets/images/board/icon_task.png'), key: 'totalTask', name: '今日总运维', defaultValue: 11},
  { img: require('@/assets/images/board/icon_work.png'), key: 'finishTask', name: '已完成',  defaultValue: 2 },
  { img: require('@/assets/images/board/icon_unfinish.png'), key: 'unFinishTask', name: '待完成',  defaultValue: 9},
]
// 实时监测
export const monitorConfig = [
  {
    img: require("@/assets/images/board/icon_so.png"),
    // key: "so2", // 公司接口
    key: "101", // 现场接口
    name: "二氧化硫(SO₂)",
    unit: "ug/m³",
    // defaultValue: 110
  },
  {
    img: require("@/assets/images/board/icon_no.png"),
    // key: "co2", // 公司接口
    key: "141", // 现场接口
    name: "二氧化氮(NOx)",
    unit: "ug/m³",
    // defaultValue: 60
  },
  {
    img: require("@/assets/images/board/icon_pm10.png"),
    // key: "pm10", // 公司接口
    key: "107", // 现场接口
    name: "PM₁₀",
    unit: "ug/m³",
    // defaultValue: 60
  },
  {
    img: require("@/assets/images/board/icon_pm25.png"),
    // key: "pm25", // 公司接口
    key: "121", // 现场接口
    name: "PM₂.₅",
    unit: "ug/m³",
    // defaultValue: 45
  },
  {
    img: require("@/assets/images/board/icon_co.png"),
    // key: "co", // 公司接口
    key: "106", // 现场接口
    name: "一氧化碳(CO)",
    unit: "ug/m³",
    // defaultValue: 6
  },
  {
    img: require("@/assets/images/board/icon_o3.png"),
    // key: "o3", // 公司接口
    key: "108", // 现场接口
    name: "臭氧(O₃)",
    unit: "ug/m³",
    // defaultValue: 65
  }
];

// 智能预警
export const preWarnConfig = [{
  img: require("@/assets/images/board/icon_warn.png"),
  key: "totalPatrolDefectCount",
  name: "当日运维预警",
  unit: "次",
}, {
  img: require("@/assets/images/board/icon_warning.png"),
  key: "totalCount",
  name: "当日人员入侵",
  unit: "次",
},]

// 今日运维任务
export const tableColumns = (that) => [
  
  {
    label: "运维项目",
    width: 300,
    render(h,{row}) {
      return (
        <input type='checkbox'></input>,
        <span>{row.omProject}</span>
      )
    },
  },
  {
    label: "运维内容",
    render(h,{row}) {
      return (
        <input type='checkbox' checked={row.omContents.isFinish === 1}></input>,
        <span>{row.omContents.omContent}</span>
      )
    },
    'show-overflow-tooltip': true
  },
  
]