<template>
  <el-dialog width="40%" :visible="isShow" title="完成任务" :destroy-on-close="true" @close="closeDialog()">
    <div>
      <WTable
        ref="mtable"
        :cell-class-name="checkbox"
        :table-data="tableData"
        :stripe="false"
        :border="false"
        :selection="true"
        :selectable="(row) =>row.executeState===-1"
        :columns="columns"
        :page="formData"
        :size="'mini'"
        :total="total"
        style="height: calc(100% - 20px)"
        @pageChange="getList"
      />
    </div>
    <template #footer>
      <el-button size="mini" @click="closeDialog()">
        关闭
      </el-button>
      <el-button size="mini" type="primary" @click.once="finishTasks()">
        批量完成
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import { WTable } from "@common-ui/w-form";
import {apiGetFinishedContent,apiFinishTask,apiFinishTasks} from "@/api/interface/mission";
import { tableColumns } from "./config";
export default {
  components:{
    WTable
  },
  data() {
    return {
      isShow:false,
      columns:tableColumns(this),
      total:0,
      tableData:[],
      formData: {
        pageNum: 1,
        pageSize: 10,
      },
      taskId:null,
      isSend: false
    }
  },
  methods:{
    checkbox(row){
      if(row.row.executeState === -1&&row.columnIndex === 0){
        return "mycell"
      }
    },
    openDialog({id}){
      this.taskId = id
      this.getList()
      
      this.isShow = true
    },
    async getList(){
      await apiGetFinishedContent(this.taskId).then((res) => {
        this.tableData = res.data
      })
    },
    closeDialog(){
      this.isShow = false
      this.tableData = []
    },
    finishTask(value){
      if (!this.isSend) {
        this.isSend = true
        apiFinishTask(value).then(async () => {
          this.$message({
            type:'success',
            message:'任务完成'
          }) 
          await this.getList()
          this.$emit('refresh')
          this.isSend = false
        }).catch(() => {
          this.isSend = false
        })
      }
    },
    finishTasks(){
      const taskIds = this.$refs.mtable.$children[0].selection.map(({taskId,contentId,taskCode})=>({taskId,contentId,taskCode}))
      if (taskIds.length !== 0) {
        apiFinishTasks(taskIds).then(() => {
          this.$message({
            type:'success',
            message:'任务完成'
          })
          this.getList()
          this.$emit('refresh')
        })
      }else{
        this.$message({
          type:'error',
          message:'请在多选栏处选择后再点击此按钮'
        })
      }
      
    },
  }
}
</script>

<style scoped lang="scss">
.mycell.el-checkbox__input {
  display: none
}
</style>