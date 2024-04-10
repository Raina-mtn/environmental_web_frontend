// import {isOrNotNormalObj} from '@/utils/config'

export const formColumns = [
  {
    label: '点位编号',
    prop: 'spotCode',
    el: 'input',
    placeholder: '请输入',
    clearable: true,
    span: 6
  },
  {
    label: '运维内容',
    prop: 'content',
    el: 'input',
    placeholder: '请输入',
    clearable: true,
    span: 6
  },
  {
    label: "机器人类型",
    prop: "robotType",
    el: "select",
    options:[
      // {
      //   value: 4,
      //   label:'导轨机器人'
      // },
      // {
      //   value: 22,
      //   label:'作业机器人'
      // },
      {
        value: 3,
        label:'挂轨机器人'
      },
    ],
    // getList: async () => ({
    //   // data: (await apiGetStation()).data,
    // }),
    placeholder: "请选择机器人类型",
    clearable: true,
    span: 6,
  },
  {
    prop:'btns',
    span:6
  }
]
export const tableColumns = (that) => [
  {
    label: '机器人编号',
    prop: 'robotCode',
    // width: 160
  },
  {
    label: "机器人类型",
    prop:'robotTypeName',
    // width: 160
  },
  {
    label: "点位编号",
    prop:'spotCode',
    // width: 160
  },
  {
    label: "点位名称",
    prop:'spotName',
    // width: 160,
    'show-overflow-tooltip': true
  },
  // {
  //   label: '坐标',
  //   prop: 'coordinate',
  //   width: 160,
  //   render: (h,{row}) => {
  //     return (
  //       <div>
  //         [ {row.coordinateX || '' }, {row.coordinateY || '' } ]
  //       </div>
  //     )
  //   }
  // },
  // {
  //   label: '运维项目',
  //   prop: 'operationName',
  //   // width: 160
  // },
  {
    label: '运维内容',
    prop: 'contentList',
    // width: 160,
    'show-overflow-tooltip': true,
    render: (h, { row }) => {
      const str = row.contentList ? row.contentList.join(',') : ''
      return (
        <div>
          { str }
        </div>
      );
    },
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
    label: "操作",
    width: 160,
    fixed: 'right',
    render: (h, { row }) => {
      return [
        <el-link type="primary" underline={false} onClick={()=>{that.$refs.AddPoint.openDialog(row, true)}}>编辑</el-link>,
        <el-link style="margin-left:16px;" type="primary" underline={false} onClick={()=>{that.onDelete([row.id])}}>删除</el-link>,
      ];
    },
  },
];