import {timeTypeObj,taskRunType,taskEndWorkObj} from '@/utils/config'
export const formColumns = [
  {
    label: '任务名称',
    prop: 'taskName',
    el: 'input',
    placeholder: '请输入任务名称',
    clearable: true,
    span: 8
  },{
    label: '任务编号',
    prop: 'taskCode',
    el: 'input',
    placeholder: '请输入任务编号',
    clearable: true,
    span: 8
  },{
    label: '任务状态',
    prop: 'taskState',
    el: 'select',
    options:taskRunType,
    placeholder: '请选择状态',
    clearable: true,
    span: 8
  },{
    label: '任务开始时间',
    prop: 'startTime,endTime',
    el: 'date-picker',
    type:"daterange",
    placeholder: '请选择任务开始时间',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    clearable: true,
    span: 8
  },{
    prop:'btns',
    span:8
  }
]
export const tableColumns = (that) => [
  // {
  //   label: '任务执行编号',
  //   // align:'left',
  //   prop: 'taskId',
  //   width:120,
  //   render: (h, scope) => {
  //     return (
  //       <div>{scope.$index + 1}</div>
  //     );
  //   },
  // },
  {
    label: "任务编号",
    // align:'left',
    width: 180,
    prop:'taskCode'
  },
  {
    label: "任务名称",
    prop:'taskName',
    width: 180,
    // align:'left',
    'show-overflow-tooltip': true
  },
  {
    label: "执行类型",
    // align:'left',
    width: 180,
    prop:'executeTypeName'
  },
  // {
  //   label: '周期类型',
  //   // align:'left',
  //   width: 140,
  //   render(h,{row}) {
  //     return timeTypeObj[row.periodicType]
  //   },
  // },
  {
    label: '机器人',
    // align:'left',
    width: 180,
    prop: 'equipmentName'
  },
  // {
  //   label: '附属设备',
  //   // align:'left',
  //   width: 180,
  //   prop: 'equipNames'
  // },
  {
    label: '任务完成后指令',
    // align:'left',
    width: 140,
    prop: 'taskEndWorkName'
  },
  {
    label: '任务状态',
    // align:'left',
    width: 140,
    prop:'taskStateName'
  },
  {
    label: '任务开始时间',
    width: 180,
    prop:'taskStartTime'
  }, 
  {
    label: '任务结束时间',
    width: 180,
    prop:'taskEndTime'
  },
  {
    label: '总运维内容数',
    width: 140,
    prop:'omAllCount'
  }, 
  {
    label: '已完成运维内容数',
    width: 160,
    prop:'omDoneCount'
  },  
  {
    label: '未完成运维内容数',
    width: 160,
    prop:'omUndoneCount'
  }, 
  {
    label: '运维告警数',
    prop:'omAlarmCount'
  }, 
  {
    label: "操作",
    width: 330,
    fixed: 'right',
    render: (h, { row }) => {
      return (
        <span>
          <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.$router.push({ name:'OpexLog', params: { taskId: row.id, taskCode: row.taskCode }})}}>运维记录</el-link>
          <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.onViewOm(row.id)}}>运维内容</el-link>
          {row.executeType === 2 && (row.taskState === 2 || row.taskState === 5) ? <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.handleComplete(row.id)}}>完成任务</el-link> : ''}
          {row.executeType === 1 && row.taskState === 2 ? <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.handlePause(row.id)}}>终止</el-link> : ''}
          {row.taskState === 5 ? <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.handleEdit(row.taskStartTime, row.id)}}>编辑</el-link> : ''}
          {row.taskState === 5 ? <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.handleDelete([row.id],'ids')}}>删除</el-link> : ''}
        </span>
      )
    },
  },
];