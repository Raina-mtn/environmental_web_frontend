export const tableColumns = (that) => [
  {
    label:"任务名称",
    prop:'taskName'
  },
  {
    label:"运维内容",
    prop:'content',
  },
  {
    label:"执行类型",
    prop:'executeType',
    // options: [
    //   {
    //     label: '人工',
    //     value: '2'
    //   },
    //   {
    //     label: '机器人',
    //     value: '1'
    //   }
    // ],
    render:(h,{row}) => {
      return (
      <div>
        {row.executeType === 1 ? '机器人' : '人工'}
      </div>)
    }
  },
  {
    label:"状态",
    prop:'executeState',
    render:(h,{row}) => {
      return (
      <div style={{ color: row.executeState !== -1 ? '#69EF00' : '#FF0000' }}>
        {row.executeState === -1 ? '待执行' : '已执行'}
      </div>)
    }
  },
  {
    label: "操作",
    fixed: 'right',
    width: 155,
    render: (h, { row }) => {
      return [(row.executeState === -1 ? <el-link  style="margin-right:10px;" type="primary" underline={false} onClick={() => {that.openFinishDialog(row)}}>完成</el-link>
        :<el-link  type="primary" underline={false} onClick={() => {that.$router.push({name:'OpexLog',params:{taskId:row.taskId, taskCode:row.taskCode, contentId:row.contentId}})}}>查看详情</el-link>)
      ];
    },
  },
]