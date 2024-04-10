import {isOrNotConfirmedObj,isOrNotConfirmed,reportTypeObj} from '@/utils/config'
export const formColumns = [{
  label: '报告编号',
  prop: 'reportCode',
  el: 'input',
  placeholder: '请输入报告编号',
  clearable: true,
  span: 8
},{
  // label: '任务执行编号',
  // prop: 'stationId',
  // el: 'input',
  // placeholder: '请输入任务执行编号',
  // clearable: true,
  // span: 8
// },{
  label: '确认状态',
  prop: 'state',
  el: 'select',
  options:isOrNotConfirmed,
  placeholder: '请选择确认状态',
  clearable: true,
  span: 8
},{
  label: '生成时间',
  prop: 'minStatDate,maxStatDate',
  el: 'date-picker',
  type:"daterange",
  placeholder: '请选择生成时间',
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
    label: '报告编号',
    prop: 'reportCode'
  },
  {
    label: "报告类型",
    render(h,{row}) {
      return reportTypeObj[row.statType]
    },
  },
  {
    label: "报告生成时间",
    prop:'gmtCreate'
  },
  {
    label: '状态',
    render(h,{row}) {
      return <el-tag size="mini" type={row.state==='CONFIRMED'?'success':''}>{isOrNotConfirmedObj[row.state]}</el-tag>
    },
  },
  {
    label: "操作",
    width: 240,
    render: (h, { row }) => {
      return [
        row.statType === 'DAY' && <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.$refs.daydetailDialog.openDialog(row)}}>详情</el-link>,
        row.statType === 'WEEK' && <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.$refs.weekdetailDialog.openDialog(row)}}>详情</el-link>,
        row.statType === 'DAY' && <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.$refs.dayeditDialog.openDialog(row)}}>编辑</el-link>,
        row.statType === 'WEEK' && <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.$refs.weekeditDialog.openDialog(row)}}>编辑</el-link>,
        <el-link style="margin-right:16px;" disabled={row.state==='CONFIRMED'} type="primary" underline={false} onClick={()=>{that.confirm(row.id)}}>确认</el-link>,
        <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.exportFile(row.id,row.reportCode)}}>导出</el-link>,
      ];
    },
  },
];