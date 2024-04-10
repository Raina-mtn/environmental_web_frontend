//运维
export const tableColumns = (that) => [
  {
    label:"任务名称",
    prop:'taskName'
  },
  {
    label:"运维名称",
    prop:'name',
  },
  {
    label:"运维内容",
    prop:'content',
  },
  {
    label:"执行类型",
    prop:'executeTypeName',
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
      if(row.executeState=== -1){
        //待执行且人工
        return row.executeType===2 && <el-link  style="margin-right:10px;" type="primary" underline={false} onClick={() => {that.openFinishDialog(row)}}>完成</el-link>
      }else{
        //已执行
        return <el-link  type="primary" underline={false} onClick={() => {that.$router.push({name:'OpexLog',params:{taskId:row.taskId,taskCode:row.taskCode,contentId:row.contentId}})}}>查看详情</el-link>
      }
    },
  },
]
// 质控
export const qualityTableColumns = (that) => [
  {
    label:"任务名称",
    prop:'taskName'
  },
  {
    label:"质控名称",
    prop:'name',
  },
  {
    label:"质控内容",
    prop:'content',
  },
  {
    label:"质控类型",
    prop:'executeTypeName',
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
      if(row.executeState=== -1){
        //待执行且人工
        return row.executeType===2 && <el-link  style="margin-right:10px;" type="primary" underline={false} onClick={() => {that.openFinishDialog([row])}}>完成</el-link>
      }else{
        //已执行
        return <el-link  type="primary" underline={false} onClick={() => {that.$router.push({name:'QualityRecord',params:{taskCode:row.taskCode,taskId:row.taskId,contentId:row.contentId}})}}>查看详情</el-link>
      }
    },
  },
]