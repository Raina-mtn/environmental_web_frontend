import {apigetDict} from '@/api/interface/system-quality'

export const formColumns = [{
  label: '编号',
  prop: 'qcExternalCode',
  el: 'input',
  placeholder: '请输入',
  clearable: true,
  span: 6
},{
  label: "质控类型",
  prop: "qcType",
  el: "wSelect",
  getList: async () => ({
    data: (await apigetDict()).data,
  }),
  "value-key": {
    label: "value",
    value: "key",
  },
  placeholder: "请选择质控类型",
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
    prop: 'qcExternalCode'
  },
  {
    label: "质控类型",
    prop:'qcTypeName'
  },
  {
    label: "质控仪器",
    prop:'instrumentName'
  },
  {
    label: "质控周期(天/次)",
    prop:'qcCycleTime'
  },
  {
    label: "质控名称",
    prop:'qcName'
  },
  {
    label: '质控内容',
    prop: 'qcContent'
  },
  {
    label: "操作",
    width: 120,
    render: (h, { row }) => {
      return [
        <el-link type="primary" underline={false} onClick={()=>{that.$refs.addQuality.openDialog(row.id, true)}}>编辑</el-link>,
        <el-link style="margin-left:16px;" type="primary" underline={false} onClick={()=>{that.onDelete([row.id])}}>删除</el-link>,
      ];
    },
  },
];