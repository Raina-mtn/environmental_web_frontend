export const formColumns = [{
  label: '姓名',
  prop: 'username',
  el: 'input',
  placeholder: '请输入姓名',
  clearable: true,
  span: 10
}, {
  label: '手机号',
  prop: 'mobileLike',
  el: 'input',
  placeholder: '请输入手机号码',
  clearable: true,
  span: 10
}, {
  prop: 'btns',
  span: 4
}]
export const tableColumns = (that) => [
  {
    label: "姓名",
    prop: 'username'
  },
  {
    label: "手机号",
    prop: 'phoneNumber'
  },
  {
    label: "所属部门",
    prop: 'orgName'
  },
  {
    label: '角色',
    prop: 'roleName'
  },
  {
    label: "操作",
    width: 240,
    render: (h, {
      row
    }) => {
      return [
        <el-link style="margin-right:16px;color: #148AFF;"  underline={false} onClick={()=>{that.$refs.userDialog.openDialog(true,row)}}>编辑</el-link>,
        <el-link style="margin-right:16px;color: #148AFF;"  underline={false} onClick={()=>{that.$refs.passwordDialog.openDialog(row)}}>修改密码</el-link>,
        <el-link style="margin-right:16px;color: #148AFF;"  underline={false} onClick={()=>{that.deletUser(row)}}>删除</el-link>,
      ];
    },
  },
];