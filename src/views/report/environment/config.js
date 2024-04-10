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
    'show-overflow-tooltip': true
  },
  {
    label: "操作",
    // width: 600,
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