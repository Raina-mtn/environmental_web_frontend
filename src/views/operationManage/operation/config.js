import {isOrNotNormalObj} from '@/utils/config'

export const formColumns = [{
  label: '运维编号',
  prop: 'idLike',
  el: 'input',
  placeholder: '请输入运维编号',
  clearable: true,
  span: 6
},{
  label: '开始时间',
  prop: 'minStartTime,maxStartTime',
  el: 'date-picker',
  type:"daterange",
  placeholder: '请选择开始时间',
  valueFormat: 'yyyy-MM-dd HH:mm:ss',
  clearable: true,
  span: 6
},{
  prop:'btns',
  span:6
}
]
export const tableColumns = (that) => [
  {
    label: '运维编号',
    prop: 'code'
  },
  {
    label: "运维项目名称",
    prop:'title'
  },
  {
    label: "运维人员",
    prop:'operator'
  },
  {
    label: "工作描述",
    prop:'content'
  },
  {
    label: '运维开始时间',
    prop: 'startTime'
  },
  {
    label: '运维结束时间',
    prop: 'endTime'
  }, 
  {
    label: '运维分析结果',
    render(h,{row}) {
      return (
        <el-tag size="small" type={row.analysisResult==='NORMAL'?'success':'danger'}>
          { isOrNotNormalObj[row.analysisResult] }
        </el-tag>
      )
    }
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