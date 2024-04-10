export const tableColumns = (that) => [
  {
    label:"任务名称",
    prop:'taskName'
  },
  {
    label:"质控内容",
    prop:'content',
  },
  {
    label:"执行类型",
    prop:'executeTypeName'
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
      return [(row.executeState === -1 && row.executeTypeName !== '自动' ? <el-link  style="margin-right:10px;" type="primary" underline={false} onClick={() => {that.finishTask({taskId:row.taskId,taskCode:row.taskCode,contentId:row.contentId})}}>完成</el-link>
        :<el-link  type="primary" underline={false} onClick={() => {that.$router.push({name:'QualityRecord',params:{taskId:row.taskId,taskCode:row.taskCode,contentId:row.contentId}})}}>查看详情</el-link>)
      ];
    },
  },
]