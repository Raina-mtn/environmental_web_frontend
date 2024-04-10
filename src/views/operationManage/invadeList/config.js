export const formColumns = [{
  label: '起止时间',
  prop: 'minIntrudeTime,maxIntrudeTime',
  el: 'date-picker',
  type:"daterange",
  placeholder: '请选择起止时间',
  valueFormat: 'yyyy-MM-dd HH:mm:ss',
  clearable: true,
  span: 6
},{
  label: '入侵状态',
  prop: 'result',
  el: 'select',
  options: [
    {label: '正常', value: 'NORMAL'},
    {label: '异常', value: 'ERROR'},
  ],
  clearable: true,
  span: 6
},{
  prop:'btns',
  span:6
}
]
export const tableColumns = (that) => [
  {
    label: '预警设备',
    prop: 'equipmentName'
  },
  {
    label: "开始时间",
    prop:'intrudeTimeBegin'
  },
  // {
  //   label: "结束时间",
  //   prop:'intrudeTimeEnd'
  // },
  {
    label: "预警内容",
    prop:'alarmContent'
  },
  {
    label: '结果',
    render(h,{row}) {
      return row.result==='ERROR'?'异常':'正常'
    },
  },
  {
    label: "操作",
    width: 240,
    render: (h, { row }) => {
      return [
        <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.$refs.detailDialog.openDialog(row)}}>详情</el-link>,
      ];
    },
  },
];