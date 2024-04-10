import {stationStateObj} from '@/utils/config'

export const formColumns = [{
  label: '站点ID',
  prop: 'idLike',
  el: 'input',
  placeholder: '请输入站点ID',
  clearable: true,
  span: 6
},{
  label: '站点名称',
  prop: 'stationName',
  el: 'input',
  placeholder: '请输入站点名称',
  clearable: true,
  span: 6
},{
  prop:'btns',
  span:6
}
]
export const tableColumns = (that) => [
  {
    label: '站点ID',
    prop: 'stationId'
  },
  {
    label: '编号',
    prop: 'stationCode'
  },
  {
    label: '东经',
    prop: 'longitude'
  },
  {
    label: '北纬',
    prop: 'latitude'
  },
  {
    label: "站点名称",
    prop:'stationName'
  },
  {
    label: "站点类型",
    render(h,{row}) {
      return row.type === 'GAS'?'气站':'水站'
    },
  },
  {
    label: '站点状态',
    render(h,{row}) {
      return (<el-tag size="mini" type={row.state==='IN_OPERATION'?'success':'danger'}>
        <span>{stationStateObj[row.state]}</span>
      </el-tag>
      )
    },
  },
  // {
  //   label: '联系人',
  //   prop: 'contact'
  // }, 
  // {
  //   label: '电话',
  //   prop: 'mobile'
  // },
  {
    label: '所属区域',
    prop:'districtName'
  },
  {
    label: '详细地址',
    prop: 'address',
    width: 200,
  },
  {
    label: "操作",
    width: 240,
    // fixed:'right',
    render: (h, { row }) => {
      return [
        <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.$refs.editDialog.openDialog(true,row)}}>编辑</el-link>,
        <el-link type="primary" underline={false} onClick={()=>{that.handleDelete([row])}}>删除</el-link>,
      ];
    },
  },
];