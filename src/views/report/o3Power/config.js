// import {apiGetDeviceList} from '@/api/interface/device'


export const formColumns =(deviceList)=> [
  {
    label: '校准时间',
    prop: 'startTime,endTime',
    el: 'date-picker',
    type:"daterange",
    placeholder: '请选择校准时间',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    clearable: true,
    span: 8
  },{
    prop:'btns',
    span:8
  }
]
export const tableColumns = (that) => [
  {
    label: '量值传递日期',
    prop: 'dataDay',
    width: 180,
    'show-overflow-tooltip': true
  },
  {
    label: "传递标准溯源日期",
    prop:'dataName',
    // width: 180,
    'show-overflow-tooltip': true
  },
  {
    label: '仪器名称',
    prop: 'deviceName'
  },
  {
    label: "序列号",
    prop:'dataCode',
    // width: 140
  },{
    label: '标气来源',
    prop: 'gasSource',
    // width: 180,
    'show-overflow-tooltip': true
  },
  {
    label: '标气编号',
    prop:'gasCode',
    // width: 140
  },
  // {
  //   label: '标气浓度',
  //   prop: 'gasStd',
  //   // width: 180,
  //   'show-overflow-tooltip': true,
  //   render: (h, { row }) => {
  //     return (
  //       <span>{ row.gasStd}{ row.gasStd ? 'ppb' : ''}</span>
  //     )
  //   }
  // },
  // {
  //   label: '使用满量程',
  //   prop: 'gasFull',
  //   width: 140,
  //   'show-overflow-tooltip': true,
  //   render: (h, { row }) => {
  //     return (
  //       <span>{ row.gasFull}{ row.gasFull ? 'ppb' : ''}</span>
  //     )
  //   }
  // },
  {
    label: "操作",
    width: 160,
    fixed: 'right',
    render: (h, { row }) => {
      return [
        <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.$refs.editDialog.openDialog(row.id, true)}}>编辑</el-link>,
        <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.handleExport(row)}}>导出</el-link>,
        // <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.onDelete([row.id])}}>删除</el-link>,
      ];
    },
  },
];