export const formColumns = [{
  label: '序列号',
  prop: 'instrumentSerial',
  el: 'input',
  placeholder: '请输入序列号',
  clearable: true,
  span: 6
},{
  label: '名称',
  prop: 'instrumentName',
  el: 'input',
  placeholder: '请输入名称',
  clearable: true,
  span: 6
// },{
//   label: '状态',
//   prop: 'instrumentState',
//   el: 'select',
//   options:[
//     {
//       label:'离线',
//       value:0
//     },
//     {
//       label:'在线',
//       value:1
//     },
//     {
//       label:'告警',
//       value:2
//     },
//     {
//       label:'故障',
//       value:3
//     },
//   ],
//   placeholder: '请选择',
//   clearable: true,
//   span: 6
},{
  prop:'btns',
  span:6
}
]
export const tableColumns = (that) => [
  {
    label: '名称',
    prop: 'instrumentName'
  },
  // {
  //   label: '仪器类型',
  //   prop: 'instrumentType'
  // },
  {
    label: '型号',
    prop: 'instrumentMode'
  },
  {
    label: '序列号',
    prop: 'instrumentSerial'
  },
  // {
  //   label: '状态',
  //   render(h,{row}) {
  //     // return (<el-tag size="mini" type={row.state==='IN_OPERATION'?'success':'danger'}>
  //     //   <span>{stationStateObj[row.instrumentstateName]}</span>
  //     // </el-tag>
  //     // )
  //     return (
  //       <span>
  //         {row.instrumentState == 0
  //           ? "离线"
  //           : row.instrumentState == 1
  //             ? "在线"
  //             : row.instrumentState == 2
  //               ? "告警"
  //               : row.instrumentState == 3
  //                 ? "故障"
  //                 : "--"}
  //       </span>
  //     );
  //   },
  // },
  {
    label: '功能说明',
    prop: 'descInChinese'
  },
  // {
  //   label: '更新时间',
  //   prop: 'gmtModified',
  //   width: 200,
  // },
  {
    label: "操作",
    width: 220,
    // fixed:'right',
    render: (h, { row }) => {
      return [
        <el-link style="margin-right:16px;" type="primary" underline={false} onClick={()=>{that.$refs.editDialog.openDialog(true,row)}}>编辑</el-link>,
        <el-link type="primary" underline={false} onClick={()=>{that.handleDelete([row.id],"ids")}}>删除</el-link>,
      ];
    },
  },
];