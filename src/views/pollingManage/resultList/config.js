// import {apiGetDeviceList} from '@/api/interface/device'


export const formColumns =(deviceList)=> [
  {
    label: 'ID',
    prop: 'id',
    el: 'input',
    placeholder: '请输入ID',
    clearable: true,
    span: 6
  },
  {
    label: '任务编号',
    prop: 'taskCode',
    el: 'input',
    placeholder: '请输入任务编号',
    clearable: true,
    span: 6
  },
  {
    label: '任务名称',
    prop: 'taskName',
    el: 'input',
    placeholder: '请输入任务名称',
    clearable: true,
    span: 6
  },{
    label: '运维结果',
    prop: 'omResult',
    el: 'select',
    options:[
      {
        label:'正常',
        value:0
      },
      {
        label:'未识别',
        value:1
      },
      {
        label:'异常',
        value:2
      },
    ],
    placeholder: '请选择运维结果',
    clearable: true,
    span: 6
  },{
    label: '运维类型',
    prop: 'omType',
    el: 'select',
    options:[
      {
        label:'运维作业',
        value:1
      },
      {
        label:'运维巡检',
        value:2
      },
    ],
    placeholder: '请选择运维类型',
    clearable: true,
    span: 6
  },
  {
    label: '运维内容',
    prop: 'omContent',
    el: 'input',
    placeholder: '请输入运维内容',
    clearable: true,
    span: 6
  },
  {
    label: '运维时间',
    prop: 'startTime,endTime',
    el: 'date-picker',
    type:"daterange",
    placeholder: '请选择运维时间',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    clearable: true,
    span: 6
  },{
    prop:'btns',
    span:8
  }
]
export const tableColumns = (that) => [
  {
    label: '任务ID',
    prop: 'id',
  },
  {
    label: '任务编号',
    prop: 'taskCode',
    width: 240,
    'show-overflow-tooltip': true
  },
  // {
  //   label: '任务编号',
  //   prop: 'planId'
  // },
  {
    label: "任务名称",
    prop:'taskName',
    width: 180,
    'show-overflow-tooltip': true
  },
  {
    label: "执行类型",
    prop:'executeTypeName',
    width: 140
  },
  {
    label: '机器人',
    prop: 'equipmentName',
    width: 140
  },
  {
    label: '运维类型',
    prop:'omTypeName',
    width: 140
  },
  {
    label: '运维名称',
    prop: 'omName',
    width: 180,
    'show-overflow-tooltip': true
  },
  {
    label: '运维内容',
    prop: 'omContent',
    width: 180,
    'show-overflow-tooltip': true
  },
  {
    label: '运维开始时间',
    prop: 'omStartTime',
    width: 180,
  },
  {
    label: '运维结束时间',
    prop: 'omEndTime',
    width: 180,
  },
  {
    label: '运维结果',
    prop: 'omResultName',
    width: 180,
    'show-overflow-tooltip': true
  },
  {
    label: '备注说明',
    prop: 'remark'
  },
  {
    label: "操作",
    width: 200,
    fixed: 'right',
    render: (h, { row }) => {
      return [
        <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.$refs.detailDialog.openDialog(row.id)}}>运维详情</el-link>,
        <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.$refs.editProject.openDialog(row, true)}}>编辑</el-link>,
        <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.onDelete([row.id])}}>删除</el-link>,
      ];
    },
  },
];