// import {apiGetDeviceList} from '@/api/interface/device'


export const formColumns =(deviceList)=> [
  {
    label: '监测指标',
    prop: 'dataCode',
    el: 'select',
    options: deviceList,
    placeholder: '请选择',
    clearable: true,
    span: 8
  },
  {
    label: '监测时间',
    prop: 'startTime,endTime',
    el: 'date-picker',
    type:"daterange",
    placeholder: '请选择监测时间',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    clearable: true,
    span: 8
  },{
    prop:'btns',
    span:8
  }
]
export const gasTableColumns = (that) => [
  {
    label: '时间',
    prop: 'dataTime',
    width: 180,
    'show-overflow-tooltip': true
  },
  {
    label: '一氧化氮(μg/m³)',
    prop: 'no',
    width: 160
  },
  {
    label: "二氧化氮(μg/m³)",
    prop:'no2',
    width: 160,
    'show-overflow-tooltip': true
  },
  {
    label: '氮氧化物(μg/m³)',
    prop: 'nox',
    width: 160,
    'show-overflow-tooltip': true
  },
  {
    label: "臭氧(μg/m³)",
    prop:'o3',
    width: 160
  },
  {
    label: '一氧化碳(mg/m³)',
    prop:'co',
    width: 160
    // width: 140
  },
  {
    label: '二氧化硫(μg/m³)',
    prop: 'so2',
    width: 160
  },
  {
    label: '甲烷(ppb)',
    prop: 'ch4',
    width: 160,
    'show-overflow-tooltip': true
  },
  {
    label: "非甲烷(ppb)",
    prop:'nmhc',
    width: 160
  },
  {
    label: '气象_气温(℃)',
    prop:'temperature',
    width: 160
  },
  {
    label: '气象_气压(kPa)',
    prop: 'pressure',
    width: 160
  },
  {
    label: '气象_湿度(%)',
    prop: 'humidity',
    width: 160
  },
  {
    label: "气象_风速(m/s)",
    prop:'windSpeed',
    width: 160
  },
  {
    label: '颗粒物PM2.5(μg/m³)',
    prop:'pm25',
    width: 160
  },
  {
    label: '气象_风向(deg)',
    prop: 'windDirection',
    width: 160
  },
  {
    label: '颗粒物PM10(μg/m³)',
    prop:'pm10',
    width: 160
  },
];

export const envTableColumns = (that) => [
  {
    label: '监测时间',
    prop: 'dataTime',
    width: 180,
    'show-overflow-tooltip': true
  },
  // {
  //   label: '任务编号',
  //   prop: 'planId'
  // },
  {
    label: "监测指标",
    prop:'dataName',
    // width: 180,
    'show-overflow-tooltip': true
  },
  {
    label: '监测值',
    prop: 'dataValue',
    // width: 180,
    'show-overflow-tooltip': true
  },
  {
    label: '监测状态',
    prop: 'dataStatusName',
    // width: 180,
    'show-overflow-tooltip': true,
    render: (h, { row }) => {
      return (
        <span style={{ color: row.dataStatus === 'normal' ? '#52C41A' : '#FF4D4F'}}>{ row.dataStatusName }</span>
      )
    }
  }
];
