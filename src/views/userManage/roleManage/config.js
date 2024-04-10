export const formColumns = [{
  label: '角色名称',
  prop: 'roleName',
  el: 'input',
  placeholder: '请输入角色名称',
  clearable: true,
  span: 10
},{
  label: '创建时间',
  prop: 'minGmtCreate,maxGmtCreate',
  el: 'date-picker',
  type:"daterange",
  placeholder: '请选择创建时间',
  valueFormat: 'yyyy-MM-dd HH:mm:ss',
  clearable: true,
  span: 10
},{
  prop:'btns',
  span:4
}
]
export const tableColumns = (that) => [
  {
    label: "角色名称",
    prop:'roleName'
  },
  {
    label: "角色描述",
    prop:'roleDesc'
  },
  {
    label: "创建时间",
    prop:'createTime'
  },
  {
    label: "操作",
    width: 240,
    render: (h, { row }) => {
      return [
        <el-link style="margin-right:16px;color: #148AFF;"  underline={false} onClick={()=>{that.$refs.editDialog.openDialog(row)}}>编辑</el-link>,
        <el-link style="margin-right:16px;color: #148AFF;"  underline={false} onClick={()=>{that.$refs.empowerDialog.openDialog(row)}}>授权</el-link>,
        <el-link style="margin-right:16px;color: #148AFF;" underline={false} onClick={()=>{that.handleDelete(row.id)}}>删除</el-link>,
      ];
    },
  },
];