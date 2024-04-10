import {apiGetExecuteType} from '@/api/interface/quality-plan'
import {apiQcInstrumentType} from '@/api/interface/quality-record'


export const formColumns =(dictList)=> [
  {
    label: 'ID',
    prop: 'id',
    el: 'input',
    placeholder: '请输入ID',
    clearable: true,
    span: 8
  },
  {
    label: '任务编号',
    prop: 'taskCode',
    el: 'input',
    placeholder: '请输入任务编号',
    clearable: true,
    span: 8
  },{
    label: '任务名称',
    prop: 'taskName',
    el: 'input',
    placeholder: '请输入任务名称',
    clearable: true,
    span: 8
  },{
    label: '仪器类型',
    prop: 'instrumentType',
    el: "wSelect",
    getList: async () => ({
      data: (await apiQcInstrumentType()).data,
    }),
    "value-key": {
      label: "value",
      value: "key",
    },
    placeholder: '请选择仪器类型',
    clearable: true,
    span: 8
  },{
    label: '质控结果',
    prop: 'qcResult',
    el: 'select',
    options: [
      {
        label: '正常',
        value: 'true'
      },
      {
        label: '异常',
        value: 'false'
      }
    ],
    placeholder: '请选择质控结果',
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
    label: '质控开始时间',
    prop: 'startTime,endTime',
    el: 'date-picker',
    type:"daterange",
    'start-placeholder':"开始日期",
    'end-placeholder':"结束日期",
    placeholder: '请选择质控开始时间',
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
    label: 'ID',
    prop: 'id',
  },
  {
    label: '任务编号',
    prop: 'taskCode',
    'show-overflow-tooltip': true
  },
  {
    label: '任务名称',
    prop: 'taskName',
    'show-overflow-tooltip': true
  },
  {
    label: "执行类型",
    prop:'executeTypeName',
  },{
    label: "质控仪器",
    prop:'instrumentName',
    'show-overflow-tooltip': true
  },{
    label: "仪器类型",
    prop:'instrumentTypeName',
  },{
    label: '质控类型',
    prop: 'qcTypeName',
  },
  {
    label: '质控名称',
    prop:'qcName',
    'show-overflow-tooltip': true
  },{
    label: "质控内容",
    prop:'qcContent',
    'show-overflow-tooltip': true
  },{
    label: '质控开始时间',
    prop: 'qcStartTime',
    'show-overflow-tooltip': true
  },
  {
    label: '质控结束时间',
    prop:'qcEndTime',
    'show-overflow-tooltip': true
  },
  {
    label: '质控结果',
    prop: 'qcResult',
    render: (h, { row }) => {
      return (
        <span style={{ color: row.qcResult ? '#63E7B7' : '#FF5C43' }}>{ row.qcResult ? '正常' : '异常'}</span>
      )
    }
  },
  {
    label: '备注',
    prop:'remark',
    // width: 140
  },
  {
    label: "操作",
    width: 160,
    render: (h, { row }) => {
      return [
        <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.$refs.editDialog.openDialog(row, true)}}>质控详情</el-link>,
        <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.onDelete(row.id)}}>删除</el-link>,
      ];
    },
  },
];