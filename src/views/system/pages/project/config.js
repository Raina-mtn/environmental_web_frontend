// import {isOrNotNormalObj} from '@/utils/config'

export const formColumns = [{
  label: '编号',
  prop: 'no',
  el: 'input',
  placeholder: '请输入',
  clearable: true,
  span: 6
},
{
  label: "运维类型",
  prop: "omType",
  'multiple-limit':1,
  el: "select",
  options:[
    {
      value:'1',
      label:'运维作业'
    },
    {
      value:'2',
      label:'运维巡检'
    }
  ],
  // getList: async () => ({
  //   // data: (await apiGetStation()).data,
  // }),
  // "value-key": {
  //   label: "stationName",
  //   value: "id",
  // },
  placeholder: "请选择运维类型",
  clearable: true,
  span: 6,
},{
  prop:'btns',
  span:6
}
]
export const tableColumns = (that) => [
  {
    label: '编号',
    prop: 'no'
  },
  {
    label: "运维类型",
    prop:'omTypeName'
  },
  {
    label: "运维周期(天/次)",
    prop:'cycleTime'
  },
  {
    label: "运维名称",
    prop:'operation'
  },
  {
    label: '运维内容',
    prop: 'content'
  },
  // {
  //   label: '运维分析结果',
  //   render(h,{row}) {
  //     return (
  //       <el-tag size="small" type={row.analysisResult==='NORMAL'?'success':'danger'}>
  //         { isOrNotNormalObj[row.analysisResult] }
  //       </el-tag>
  //     )
  //   }
  // }, 
  {
    label: '点位数量',
    prop:'deviceCount'
  },
  {
    label: "操作",
    width: 120,
    render: (h, { row }) => {
      return [
        <el-link type="primary" underline={false} onClick={()=>{that.$refs.addProject.openDialog(row, true)}}>编辑</el-link>,
        <el-link style="margin-left:16px;" type="primary" underline={false} onClick={()=>{that.onDelete([row.id])}}>删除</el-link>,
      ];
    },
  },
];