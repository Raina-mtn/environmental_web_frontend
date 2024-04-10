// import {apiGetDeviceList} from '@/api/interface/device'


export const formColumns =(deviceList)=> [
  {
    label: '巡检日期',
    prop: 'startTime,endTime',
    el: 'date-picker',
    type:"daterange",
    placeholder: '请选择巡检日期',
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
    label: '巡检日期',
    prop: 'dataDay',
    width: 180,
    'show-overflow-tooltip': true
  },
  // {
  //   label: '任务编号',
  //   prop: 'planId'
  // },
  {
    label: "站点名称",
    prop:'dataName',
    // width: 180,
    'show-overflow-tooltip': true
  },
  {
    label: 'PM₂.₅序列号',
    prop:'gasCode',
    // width: 140
  },
  {
    label: '巡检人',
    prop: 'gasSource',
    // width: 180,
    'show-overflow-tooltip': true
  },
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