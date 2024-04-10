import {taskStatusObj,taskTypeTagObj,planState,operateTypeObj,timeTypeObj} from '@/utils/config'

export const formColumns = [{
  label: '计划编号',
  prop: 'planNo',
  el: 'input',
  placeholder: '请输入计划编号',
  clearable: true,
  span: 8
},{
  label: '任务名称',
  prop: 'maintenanceTaskName',
  el: 'input',
  placeholder: '请输入任务名称',
  clearable: true,
  span: 8
},
// {
//   label: '状态',
//   prop: 'planState',
//   el:'select',
//   options:planState,
//   placeholder: '请选择状态',
//   clearable: true,
//   span: 8
// },
{
  label: '执行类型',
  prop: 'executeType',
  el:'select',
  options: [
    {
      label: '人工',
      value: '2'
    },
    {
      label: '机器人',
      value: '1'
    }
  ],
  placeholder: '请选择执行类型',
  clearable: true,
  span: 8
},
{
  label: '计划开始时间',
  prop: 'startTime,endTime',
  el: 'date-picker',
  type:"daterange",
  placeholder: '请选择计划时间',
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
    label: "计划编号",
    width: 180,
    prop:'id',
    'show-overflow-tooltip': true
  },
  {
    label: "任务名称",
    width: 180,
    prop:'maintenanceTaskName',
    'show-overflow-tooltip': true
  },
  {
    label: "任务类型",
    width: 140,
    prop:'generateTaskTypeName'
  },
  {
    label: '周期类型',
    width: 140,
    prop:'periodTypeName'
  },
  {
    label: "执行类型",
    width: 180,
    prop:'executeTypeName',
    'show-overflow-tooltip': true
  },
  // {
  //   label: '任务状态',
  //   width: 140,
  //   render(h,{row}) {
  //     return (
  //       <el-tag size="mini" type={taskTypeTagObj[row.planState]}>
  //         <span>{taskStatusObj[row.planState]}</span>
  //       </el-tag>
  //     )
  //   },
  // }, 
  {
    label: '机器人',
    width: 180,
    prop: 'equipmentName'
  },
  // {
  //   label: '附属设备',
  //   width: 180,
  //   prop: 'equipNames'
  // },
  {
    label: '备注',
    prop: 'remark'
  },
  {
    label: '执行次数',
    // prop: 'taskAllowNum'
    render:(h,{ row }) => {
      return row.executeTimes !== 0 ? row.executeTimes : ''
    }
  },
  {
    label: '计划开始时间',
    width: 180,
    prop: 'planStartTime'
  },
  {
    label: '更新时间',
    width: 180,
    prop:'gmtModified'
  },
  {
    label: "操作",
    width: 180,
    fixed: 'right',
    render: (h, { row }) => {
      // const controlFlag = !(row.planState==='CREATED') //任务状态为未执行
      // switch(row.operateType){
      //   case 'IMMEDIATE_TASK':
      //     return [
      //       <el-link type="primary" underline={false} onClick={()=>{that.$refs.editdialog.openDialog(true,row)}} disabled={true}>编辑</el-link>,
      //       <el-link class="mx-4" type="primary" underline={false} onClick={()=>{that.handleDelete([row.id],'idList')}} disabled={controlFlag}>删除</el-link>,
      //     ];
      //   case 'CYCLE_TASK':
      //     return [
      //       <el-link type="primary" underline={false} onClick={()=>{that.$refs.editdialog.openDialog(true,row)}} disabled={controlFlag}>编辑</el-link>,
      //       <el-link class="mx-4" type="primary" underline={false} onClick={()=>{that.handleDelete([row.id],'idList')}} disabled={controlFlag}>删除</el-link>,
      //     ];
      //   case 'AUTO_TASK':
      //     return [
      //       <el-link type="primary" underline={false} onClick={()=>{that.$router.push({ path: '/task-setting' })}} disabled={controlFlag}>配置</el-link>,
      //       <el-link class="mx-4" type="primary" underline={false} onClick={()=>{that.handleDelete([row.id],'idList')}} disabled={controlFlag}>删除</el-link>,
      //     ];
      // }
      return [
        <el-link type="primary" underline={false} onClick={()=>{that.$refs.editdialog.openDialog(true,row)}}>编辑</el-link>,
        <el-link class="mx-4" type="primary" underline={false} onClick={()=>{that.handleDelete([row.id],'ids')}}>删除</el-link>,
      ];
    },
  },
];