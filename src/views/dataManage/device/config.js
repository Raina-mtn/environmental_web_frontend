import {deviceStateObj} from '@/utils/config'
export const formColumns = [{
  label: '巡检点名称',
  prop: 'deviceName',
  el: 'input',
  placeholder: '请输入巡检点名称',
  clearable: true,
  span: 6
},{
  prop:'btns',
  span:6
}
]
export const tableColumns = (that) => [
  {
    label: '编号',
    prop: 'deviceId'
  },
  {
    label: "名称",
    prop:'deviceName'
  },
  {
    label: "检测项目",
    prop:'project'
  },
  {
    label: "坐标",
    render(h,{row}) {
      return `${row.coordinateX},${row.coordinateY}`
    },
  },
  {
    label: '巡检周期',
    render(h,{row}) {
      return deviceStateObj[row.periodicType]
    },
  },
  {
    label: '巡检结果类型',
    render(h,{row}) {
      // return isOrNotNormalObj[row.patrolTypeName]
      return '正常/异常'
    },
  }, 
  {
    label: "操作",
    width: 240,
    render: (h, { row }) => {
      return [
        <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.$refs.editDialog.openDialog(true,row)}}>编辑</el-link>,
        <el-link type="primary" underline={false} onClick={()=>{that.handleDelete([row.deviceId])}}>删除</el-link>,
      ];
    },
  },
];