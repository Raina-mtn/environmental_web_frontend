/**
 * 将枚举值数组转换成key-value形式
 * @param {*} arr
 * @param {*} format 要处理的键值对{label:'name', value:'value'}
 * @returns obj
 */
export const arrToObj = function (
  arr,
  format = {
    key: "value",
    label: "label",
  }
) {
  return arr.reduce(function (acc, cur, i) {
    const curkey = cur[format.key];
    acc[curkey] = cur[format.label];
    return acc;
  }, {});
};

export const isOrNotConfirmed = [
  {
    label: "已确认",
    value: 'CONFIRMED',
  },
  {
    label: "待确认",
    value: 'CREATED',
  },
];
export const isOrNotConfirmedObj = arrToObj(isOrNotConfirmed);

//监视结果
export const isOrNotNormal = [
  {
    label: "正常",
    value: 'NORMAL',
  },
  {
    label: "异常",
    value: 'ERROR',
  },
];
export const isOrNotNormalObj = arrToObj(isOrNotNormal);

//周期类型
export const timeType = [
  {
    label: "周",
    value: "WEEK",
  },
  {
    label: "日",
    value: "DAY",
  },
];
export const timeTypeObj = arrToObj(timeType);

//是否在线
export const isOnline = [
  {
    label: "在线",
    value: 1,
  },
  {
    label: "离线",
    value: 0,
  },
];
export const isOnlineObj = arrToObj(isOnline);

//任务状态
export const taskStatus = [
  {
    label: "已执行",
    value: 'FINISHED',
  },
  {
    label: "已暂停",
    value: 'SUSPEND',
  },
  {
    label: "执行中",
    value: 'RUNNING',
  },
  {
    label: "待执行",
    value: 'CREATED',
  },
  {
    label: "已超时",
    value: 'overtime',
  },
];
export const taskStatusObj = arrToObj(taskStatus);

//机器人状态
export const robotStatus = [
  {
    label: "在线",
    value: 'FINISHED',
  },
  {
    label: "离线",
    value: 'SUSPEND',
  },
  {
    label: "告警",
    value: 'CREATED',
  },
  {
    label: "故障",
    value: 'overtime',
  },
];
export const robotStatusObj = arrToObj(robotStatus);

//任务状态-tag
export const taskTypeTag = [
  {
    label: "success",
    value: 'FINISHED',
  },
  {
    label: "danger",
    value: 'SUSPEND',
  },
  {
    label: "warning",
    value: 'RUNNING',
  },
  {
    label: "",
    value: 'CREATED',
  },
  {
    label: "info",
    value: 'overtime',
  },
];
export const taskTypeTagObj = arrToObj(taskTypeTag);

//任务类型
export const taskType = [
  {
    label: "周期任务",
    value: 'CYCLE_TASK',
  },
  {
    label: "临时任务",
    value: 'IMMEDIATE_TASK',
  },
  {
    label: "自动任务",
    value: 'AUTO_TASK',
  }
];
export const taskTypeObj = arrToObj(taskType);

//报告类型
export const reportType = [
  {
    label: "日报",
    value: 'DAY',
  },
  {
    label: "周报",
    value: 'WEEK',
  }
];
export const reportTypeObj = arrToObj(reportType);

//设备类型
export const equipmentType = [
  {
    label: "室外机器人",
    value: "1",
  },
  {
    label: "开关室机器人",
    value: "2",
  },
  {
    label: "配网机器人",
    value: "3",
  },
  {
    label: "导轨机器人",
    value: "4",
  },
  {
    label: "开关室操作机器人",
    value: "5",
  },
  {
    label: "无人机",
    value: "6",
  },
  {
    label: "摄像机",
    value: "7",
  },
  {
    label: "声纹",
    value: "8",
  },
  {
    label: "硬盘录像机",
    value: "9",
  },
];
export const equipmentTypeObj = arrToObj(equipmentType);

//站点状态
export const stationState = [
  {
    label: "运行中",
    value: 'IN_OPERATION',
  },
  {
    label: "维修中",
    value: 'IN_MAINTENANCE',
  },
];
export const stationStateObj = arrToObj(stationState);

//站点类型
export const stationType = [
  {
    label: "水站",
    value: 'WATER',
  },
  {
    label: "气站",
    value: 'GAS',
  },
];
export const stationTypeObj = arrToObj(stationType);

//站点状态
export const deviceState = [
  {
    label: "日检",
    value: 'DAY',
  },
  {
    label: "周检",
    value: 'WEEK',
  },
];
export const deviceStateObj = arrToObj(deviceState);

//任务状态
export const planState = [
  {
    label: "待执行",
    value: 'CREATED',
  },
  {
    label: "暂停",
    value: 'SUSPEND',
  },
  {
    label: "执行中",
    value: 'RUNNING',
  },
  {
    label: "已执行",
    value: 'FINISHED',
  },
];
export const planStateObj = arrToObj(planState);

//任务类型
export const operateType = [
  {
    label: "临时任务",
    value: 'IMMEDIATE_TASK',
  },
  // {
  //   label: "定期任务",
  //   value: 'PERIODIC_TASK',
  // },
  {
    label: "周期任务",
    value: 'CYCLE_TASK',
  },
  {
    label: "自动任务",
    value: 'AUTO_TASK',
  }
];
export const operateTypeObj = arrToObj(operateType);

//任务类型
export const taskOperateType = [
  {
    label: "临时任务",
    value: 1,
  },
  // {
  //   label: "定期任务",
  //   value: 2,
  // },
  {
    label: "周期任务",
    value: 3,
  },
  // {
  //   label: "自动任务",
  //   value: 4,
  // }
];
export const taskOperateTypeObj = arrToObj(taskOperateType);
//任务完成后动作
export const taskEndWork = [
  {
    label: "返回充电",
    value: 0,
  },
  {
    label: "返回原点",
    value: 1,
  },
  {
    label: "待在原地",
    value: 2,
  },
];
export const taskEndWorkObj = arrToObj(taskEndWork);
//任务周期
export const periodSetting = [
  {
    label: "周一",
    value: '1',
  },
  {
    label: "周二",
    value: '2',
  },
  {
    label: "周三",
    value: '3',
  },
  {
    label: "周四",
    value: '4',
  },
  {
    label: "周五",
    value: '5',
  },
  {
    label: "周六",
    value: '6',
  },
  {
    label: "周日",
    value: '7',
  },
];
export const periodSettingObj = arrToObj(periodSetting);

//任务执行状态
export const taskRunType = [
  {
    label: "已执行",
    value: 1,
  },
  {
    label: "正在执行",
    value: 2,
  },
  {
    label: "暂停",
    value: 3,
  },
  {
    label: "终止",
    value: 4,
  },
  {
    label: "待执行",
    value: 5,
  },
  {
    label: "超期",
    value: 6,
  },
];
export const taskRunTypeObj = arrToObj(taskRunType);


//质控计划-任务类型
export const planTask = [
  {
    label:'临时任务',
    value:1
  },
  {
    label:'周期任务',
    value:2
  },
  {
    label:'规则任务',
    value:3
  }
];
export const planTaskObj = arrToObj(planTask);

//质控计划-执行类型
export const executeType = [
  {
    label:'手动',
    value:'Auto'
  },
  {
    label:'自动',
    value:'Manual'
  }
];
export const executeTypeObj = arrToObj(executeType);

//动环监控-状态
export const dynamicStatus = [
  {
    label:'正常',
    value:'0'
  },
  {
    label:'告警',
    value:'1'
  }
];
export const dynamicStatusObj = arrToObj(dynamicStatus);


//仪器类型
export const instrumentType = [
  {
    label:'SO₂',
    value:'1'
  },
  {
    label:'NO₂',
    value:'2'
  },
  {
    label:'CO',
    value:'3'
  },
  {
    label:'O₃',
    value:'4'
  },
];
export const instrumentTypeObj = arrToObj(instrumentType);

