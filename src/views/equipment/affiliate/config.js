// import {isOnlineObj,isOnline} from '@/utils/config'

export const formColumns = [{
  label: '设备编号',
  prop: 'equipmentCode',
  el: 'input',
  placeholder: '请输入设备编号',
  clearable: true,
  span: 6
},{
  label: '设备名称',
  prop: 'equipmentName',
  el: 'input',
  placeholder: '请输入设备名称',
  clearable: true,
  span: 6
// },{
//   label: '设备状态',
//   prop: 'connectState',
//   el: 'select',
//   options:isOnline,
//   // 'popper-append-to-body':false,
//   placeholder: '请选择设备状态',
//   clearable: true,
//   span: 6
},{
  prop:'btns',
  span:6
}
]
export const tableColumns = (that) => [
  {
    label: '设备编号',
    prop: 'equipmentCode'
  },
  {
    label: "设备名称",
    prop:'equipmentName'
  },
  // {
  //   label: "巡检点位",
  //   prop:'stationName'
  // },
  {
    label: "设备类型",
    prop:'equipmentType'
  },
  {
    label: '安装位置',
    prop: 'installedLocation'
  },
  {
    label: '状态',
    render(h,{row}) {
      return (<el-tag size="mini" type={row.connectState?'success':'danger'}>
        <span>{row.connectState?'在线':'离线'}</span>
      </el-tag>
      )
    },
  },
  {
    label: '功能说明',
    prop: 'descInChinese'
  }, 
  {
    label: '图片',
    render(h,{row}) {
      return (
        <div>
          { row.url ? <el-image
            style="width: 40px; height: 40px"
            src={row.url}
            fit="fill"
          /> : ''}
        </div>
      )
    },
  },
  {
    label: '更新时间',
    prop: 'gmtModified'
  },
  // {
  //   label: '更新人',
  //   prop: 'manufacturer'
  // },
  {
    label: "操作",
    width: 240,
    // fixed:'right',
    render: (h, { row }) => {
      return [
        <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.$refs.editDialog.openDialog(true,row)}}>编辑</el-link>,
        <el-link type="primary" underline={false} onClick={()=>{that.handleDelete([row.id],"idList")}}>删除</el-link>,
      ];
    },
  },
];