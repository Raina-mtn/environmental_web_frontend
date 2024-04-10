export const formColumns =() => [{
  label: '机器人编号',
  prop: 'equipmentCode',
  el: 'input',
  placeholder: '请输入机器人编号',
  clearable: true,
  span: 6
},{
  label: '机器人名称',
  prop: 'equipmentName',
  el: 'input',
  placeholder: '请输入机器人名称',
  clearable: true,
  span: 6
},{
  prop:'btns',
  span:6
}
]
export const tableColumns = (that) => [
  {
    label: '机器人编号',
    width: 180,
    prop: 'equipmentCode',
    'show-overflow-tooltip': true
  },
  {
    label: "机器人名称",
    prop:'equipmentName',
    width: 180,
    'show-overflow-tooltip': true
  },
  {
    label: "机器人类型",
    width: 180,
    prop:'equipmentType'
  },
  {
    label: "机器人型号",
    width: 180,
    prop:'equipmentMode',
    'show-overflow-tooltip': true
  },
  {
    label: '电量',
    width: 140,
    prop: 'battery',
    render(h,{row}) {
      return (
        <span>
          { row.battery ? Number(row.battery).toFixed(2) : '' }
        </span>
      )
    }
  },
  {
    label: '状态',
    render(h,{row}) {
      return (
        <el-tag size="small" type={row.connectState ? 'success' : 'danger'}>
          { row.connectState ? '在线' : '离线' }
        </el-tag>
      )
    }
  },
  {
    label: '是否充电',
    prop: 'chargeState',
    render(h,{row}) {
      return (
        <span>{ row.chargeState ? '是' : '否' }</span>
      )
    }
  }, 
  {
    label: '功能说明',
    prop: 'descInChinese',
    width: 180,
    'show-overflow-tooltip': true
  }, 
  {
    label: '更新时间',
    prop: 'gmtModified',
    width: 180,
    'show-overflow-tooltip': true
  }, 
  {
    label: "操作",
    width: 180,
    fixed: 'right',
    render: (h, { row }) => {
      return [
        <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.handleToDetail(row)}}>详情</el-link>,
        <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.$refs.editDialog.openDialog(row)}}>编辑</el-link>,
        <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.handleDelete([row.id],"idList")}}>删除</el-link>,
      ];
    },
  },
];