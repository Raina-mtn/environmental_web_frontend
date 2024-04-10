// import {apiGetDeviceList} from '@/api/interface/device'


export const formColumns =(deviceList)=> [
  {
    label: '监测时间',
    prop: 'startTime,endTime',
    el: 'date-picker',
    type:"daterange",
    placeholder: '请选择监测时间',
    'start-placeholder':"开始日期",
    'end-placeholder':"结束日期",
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    clearable: true,
    span: 8
  },{
    label: '状态',
    prop: 'dataStatus',
    el:'select',
    options: [
      {
        label: '正常',
        value: 'normal'
      },
      {
        label: '告警',
        value: 'alarm'
      }
    ],
    placeholder: '请选择状态',
    clearable: true,
    span: 8
  },{
    prop:'btns',
    span:8
  }
]
export const so2Columns = (that) => [
  {
    label: '监测时间',
    prop: 'dataTime',
  },
  {
    label: '机箱内部温度(℃)',
    prop: 'intt'
  },
  {
    label: "反应室温度(℃)",
    prop:'rctt',
  },
  {
    label: '反应室压力(mmHg)',
    prop: 'pres',
  },
  {
    label: "样气流量(L/min)",
    prop:'smplfl',
  },
  {
    label: '紫外灯强度(%)',
    prop:'lmpi',
  },
  {
    label: "紫外灯电压(V)",
    prop:'lmpv',
  },
  {
    label: '检查结果',
    render: (h, { row }) => {
      return (
        <span style={{ color: row.dataStatus === 'normal' ? '#52C41A' : '#FF4D4F'}}>{ row.dataStatusName }</span>
      )
    }
  },
  {
    label: '操作',
    render: (h, { row }) => {
      return (
        <el-link type="primary" underline={false} onClick={()=>{that.$refs.detailDialog.openDialog(that.type,row.id)}}>详情</el-link>
      )
    }
  }
];
export const noxColumns = (that) => [
  {
    label: '监测时间',
    prop: 'dataTime',
  },
  {
    label: '样气流量(L/min)',
    prop: 'smplfl'
  },
  {
    label: "臭氧流量(L/min)",
    prop:'ozonf',
  },
  {
    label: '反应室压力(mmHg)',
    prop: 'pres',
  },
  {
    label: "机箱内部温度(℃)",
    prop:'intt',
  },
  {
    label: '反应室温度(℃)',
    prop: 'rctt',
  },
  {
    label: "冷却器温度(℃)",
    prop:'pmtt',
  },
  {
    label: '转换炉温度(℃)',
    prop: 'convt',
  },
  {
    label: '检查结果',
    render: (h, { row }) => {
      return (
        <span style={{ color: row.dataStatus === 'normal' ? '#52C41A' : '#FF4D4F'}}>{ row.dataStatusName }</span>
      )
    }
  },
  {
    label: '操作',
    render: (h, { row }) => {
      return (
        <el-link type="primary" underline={false} onClick={()=>{that.$refs.detailDialog.openDialog(that.type,row.id)}}>详情</el-link>
      )
    }
  }
];
export const coColumns = (that) => [
  {
    label: '监测时间',
    prop: 'dataTime',
  },
  {
    label: '样气流量(L/min)',
    prop: 'smplfl'
  },
  {
    label: "自动增益控制强度(Hz)",
    prop:'intensity',
  },
  {
    label: '马达速度(%)',
    prop: 'speed',
  },
  {
    label: "反应室压力(mmHg)",
    prop:'pres',
  },
  {
    label: '偏置电压(V)',
    prop: 'biasv',
  },
  {
    label: "机箱内部温度(℃)",
    prop:'intt',
  },
  {
    label: '反应室温度(℃)',
    prop: 'cht',
  },
  {
    label: '检查结果',
    render: (h, { row }) => {
      return (
        <span style={{ color: row.dataStatus === 'normal' ? '#52C41A' : '#FF4D4F'}}>{ row.dataStatusName }</span>
      )
    }
  },
  {
    label: '操作',
    render: (h, { row }) => {
      return (
        <el-link type="primary" underline={false} onClick={()=>{that.$refs.detailDialog.openDialog(that.type,row.id)}}>详情</el-link>
      )
    }
  }
];
export const o3Columns = (that) => [
  {
    label: '监测时间',
    prop: 'dataTime',
  },
  {
    label: '校准流量A(L/min)',
    prop: 'flowa'
  },
  {
    label: "校准流量B(L/min)",
    prop:'flowb',
  },
  {
    label: 'A灯光强度(Hz)',
    prop: 'cellai',
  },
  {
    label: "B灯光强度(Hz)",
    prop:'cellbi',
  },
  {
    label: '反应室压力(mmHg)',
    prop: 'pres',
  },
  {
    label: "光室内温度(℃)",
    prop:'bncht',
  },
  {
    label: 'O₃灯温度(℃)',
    prop: 'lmpt',
  },
  {
    label: '检查结果',
    render: (h, { row }) => {
      return (
        <span style={{ color: row.dataStatus === 'normal' ? '#52C41A' : '#FF4D4F'}}>{ row.dataStatusName }</span>
      )
    }
  },
  {
    label: '操作',
    render: (h, { row }) => {
      return (
        <el-link type="primary" underline={false} onClick={()=>{that.$refs.detailDialog.openDialog(that.type,row.id)}}>详情</el-link>
      )
    }
  }
];
export const pmColumns = (that) => [
  {
    label: '监测时间',
    prop: 'dataTime',
  },
  {
    label: '环境温度(℃)',
    prop: 'ambtemp'
  },
  {
    label: "样气温度(℃)",
    prop:'flowtemp',
  },
  {
    label: '仪器内部温度(℃)',
    prop: 'intt',
  },
  {
    label: "环境湿度(%)",
    prop:'ambrh',
  },
  {
    label: '样气相对湿度(%)',
    prop: 'samprh',
  },
  {
    label: "仪器流量(L/min)",
    prop:'flowvol',
  },
  {
    label: '检查结果',
    prop: 'dataStatusName',
    'show-overflow-tooltip': true,
    render: (h, { row }) => {
      return (
        <span style={{ color: row.dataStatus === 'normal' ? '#52C41A' : '#FF4D4F'}}>{ row.dataStatusName }</span>
      )
    }
  },
  {
    label: '操作',
    render: (h, { row }) => {
      return (
        <el-link type="primary" underline={false} onClick={()=>{that.$refs.detailDialog.openDialog(that.type,row.id)}}>详情</el-link>
      )
    }
  }
];
