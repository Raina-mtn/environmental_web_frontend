import {apiGetExecuteType} from '@/api/interface/quality-plan'


export const formColumns = [
  {
    label: '计划编号',
    prop: 'planNo',
    el: 'input',
    placeholder: '请输入计划编号',
    clearable: true,
    span: 8
  },{
    label: '任务名称',
    prop: 'qcTaskName',
    el: 'input',
    placeholder: '请输入任务名称',
    clearable: true,
    span: 8
  },{
    label: '执行类型',
    prop: 'executeType',
    el: "wSelect",
    getList: async () => ({
      data: (await apiGetExecuteType()).data,
    }),
    "value-key": {
      label: "value",
      value: "key",
    },
    placeholder: '请选择执行类型',
    clearable: true,
    span: 8
  },{
    label: '计划开始时间',
    prop: 'startTime,endTime',
    el: 'date-picker',
    type:"daterange",
    placeholder: '请选择计划开始时间',
    'start-placeholder':"开始日期",
    'end-placeholder':"结束日期",
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
    label: '任务编号',
    prop: 'id'
  },
  {
    label: '任务名称',
    prop: 'qcTaskName',
    width: 180,
    'show-overflow-tooltip': true
  },
  {
    label: "任务类型",
    prop:'generateTaskTypeName',
    // width: 180,
    'show-overflow-tooltip': true
  },
  {
    label: "周期类型",
    prop:'periodTypeName',
    // width: 140
  },{
    label: '执行类型',
    prop: 'executeTypeName',
    // width: 180,
    'show-overflow-tooltip': true
  },
  {
    label: '执行次数',
    prop: 'executeTimes',
    'show-overflow-tooltip': true,
  },
  {
    label: '计划开始时间',
    prop: 'planStartTime',
  },
  {
    label: '更新时间',
    prop: 'gmtModified',
  },
  {
    label: '备注',
    prop: 'remark',
  },
  {
    label: "操作",
    render: (h, { row }) => {
      return [
        <el-link type="primary" underline={false} onClick={()=>{that.$refs.editdialog.openDialog(true,row)}}>编辑</el-link>,
        <el-link class="mx-4" type="primary" underline={false} onClick={()=>{that.handleDelete([row.id],'ids')}}>删除</el-link>
      ];
      
    },
  },
];