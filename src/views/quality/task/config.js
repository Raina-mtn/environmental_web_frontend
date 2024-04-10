import {apiGetTaskStateDice} from '@/api/interface/mission'

import { instrumentType } from "@/utils/config";


export const formColumns = [
  {
    label: '任务编号',
    prop: 'taskCode',
    el: 'input',
    placeholder: '请输入计划编号',
    clearable: true,
    span: 8
  }, {
    label: '任务名称',
    prop: 'taskName',
    el: 'input',
    placeholder: '请输入任务名称',
    clearable: true,
    span: 8
  },{
    label: "任务状态",
    prop: "taskStates",
    multiple:true,
    el: "wSelect",
    getList: async () => ({
      data: (await apiGetTaskStateDice()).data,
    }),
    "value-key": {
      label: "value",
      value: "key",
    },
    placeholder: "请选择任务状态",
    clearable: true,
    span: 8,
  },
  // {
  //   label: "仪器类型",
  //   prop: "instrumentType",
  //   el: 'select',
  //   options:instrumentType,
  //   placeholder: "请选择仪器类型",
  //   clearable: true,
  //   span: 8,
  // },
  {
    label: '任务开始时间',
    prop: 'startTime,endTime',
    el: 'date-picker',
    type: "daterange",
    placeholder: '请选择计划开始时间',
    'start-placeholder': "开始日期",
    'end-placeholder': "结束日期",
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    clearable: true,
    span: 8
  }
  , {
    prop: 'btns',
    span: 8
  }
]
export const tableColumns = (that) => [
  {
    label: '任务编号',
    prop: 'taskCode',
    'show-overflow-tooltip': true,
    width: 120,
  },
  {
    label: '任务名称',
    prop: 'taskName',
    width: 150,
    // 'show-overflow-tooltip': true
  },
  {
    label: "执行类型",
    prop: 'executeTypeName'
  },
  {
    label: "任务状态",
    prop: 'taskStateName',
    render:(h,{row}) => {
      return (
        <div style={{ color: row.taskStateName === '已执行' ? '#00bfbf' : (row.taskStateName === '待执行' ? '#000000' : '#8400ff') }}>
          {row.taskStateName}
        </div>)
    }
  },
  {
    label: "任务开始时间",
    prop: 'taskStartTime',
    width: 150,
  }, {
    label: '任务结束时间',
    prop: 'taskEndTime',
    width: 150,
  },
  {
    label: '总质控内容数',
    prop: 'qcAllCount',
  },
  {
    label: '已完成质控内容数',
    prop: 'qcDoneCount',
    width: 150,
  },
  {
    label: '未完成质控内容数',
    prop: 'qcUndoneCount',
    width: 150,
  },
  {
    label: '质控告警数',
    prop: 'qcAlarmCount',
  },
  {
    label: "操作",
    fixed: 'right',
    width: 300,
    render: (h, { row }) => {
      // 待执行 taskState=1
      if (row.taskState === 1) {
        return [
          // 手动任务
          row.executeType === 2 && <el-link style="margin-right:10px;color:#44cece;"  type="primary" underline={false} onClick={() => {that.$refs.finishTaskDialog.openDialog(row)}}>完成任务</el-link>,
          <el-link style="margin-right:10px;" type="primary" underline={false} onClick={() => {that.$router.push({name:'QualityRecord',params:{taskId:row.id,taskCode:row.taskCode}})}}>质控记录</el-link>,
          <el-link style="margin-right:10px;" type="primary" underline={false} onClick={() => {that.$refs.qcContentDialog.openDialog(row)}}>质控内容</el-link>,
          <el-link style="margin-right:10px;" type="primary" underline={false} onClick={() => {that.$refs.editDialog.openDialog(row)}}>编辑</el-link>,
          <el-link style="margin-right:10px;color:#d9001b;" type="primary" underline={false} onClick={() => {that.deleteTask(row)}}>删除</el-link>,
        ];
      }else if (row.taskState === 2) {
        //执行中 且 手动
        return [
          row.executeType === 2 && <el-link style="margin-right:10px;color:#44cece;"  type="primary" underline={false} onClick={() => {that.$refs.finishTaskDialog.openDialog(row)}}>完成任务</el-link>,
          <el-link style="margin-right:10px;" type="primary" underline={false} onClick={() => {that.$router.push({name:'QualityRecord',params:{taskId:row.id,taskCode:row.taskCode}})}}>质控记录</el-link>,
          <el-link style="margin-right:10px;" type="primary" underline={false} onClick={() => {that.$refs.qcContentDialog.openDialog(row)}}>质控内容</el-link>,
        ];}else{
        return [
          <el-link style="margin-right:10px;" type="primary" underline={false} onClick={() => {that.$router.push({name:'QualityRecord',params:{taskId:row.id,taskCode:row.taskCode}})}}>质控记录</el-link>,
          <el-link style="margin-right:10px;" type="primary" underline={false} onClick={() => {that.$refs.qcContentDialog.openDialog(row)}}>质控内容</el-link>,
        ];
      }
    },
  },
];