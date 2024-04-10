<template>
  <div class="wrapper">
    <WForm
      class="form-bg h-110px"
      label-width="100px"
      :form-data="formData"
      :columns="formColumns"
      size="mini"
    >
      <template slot="btns">
        <el-button
          size="mini"
          type="primary"
          @click="refresh"
        >
          查询
        </el-button>
        <el-button
          size="mini"
          @click="reset"
        >
          重置
        </el-button>
      </template>
    </WForm>
    <div class="mt-16px p-21px bg-white" style="height: calc(100% - 126px);">
      <div class="w-full mb-16px">
        <div class="text-right">
          <el-button size="small" icon="el-icon-delete" @click="handleDelete($refs.mtable.$children[0].selection.map(i=>i.id),'ids')">
            批量删除
          </el-button>
        </div>
      </div>
      <WTable
        ref="mtable"
        :table-data="tableData"
        class="h-4/5"
        :stripe="false"
        :border="false"
        :selection="true"
        :selectable="(row) => row.taskState===1"
        :columns="columns"
        :page="formData"
        :size="'mini'"
        :total="total"
        style="height: calc(80% - 20px)"
        height="100%"
        @pageChange="getList"
      />
    </div>
    <qcContentDialog ref="qcContentDialog" />
    <editDialog ref="editDialog" @refresh="refresh" />
    <finishTaskDialog ref="finishTaskDialog" @refresh="refresh" />
  </div>
</template>

<script>
import { apiGetTaskList,apiDelTask,apiDelTasks,apiGetTaskStateDice } from '@/api/interface/mission'
import { listMixin } from "@/mixin/list";
import qcContentDialog from "./components/qcContentDialog.vue"
import editDialog from "./components/editDialog.vue"
import finishTaskDialog from "./components/finishTaskDialog.vue"
import { WForm, WTable } from "@common-ui/w-form";
import { formColumns, tableColumns } from "./config.js";
export default {
  components: {
    WForm,
    WTable,
    qcContentDialog,
    editDialog,
    finishTaskDialog
  },
  mixins: [listMixin],
  data() {
    return {
      deleteAPi:apiDelTasks,
      tabs:'list',
      formColumns,
      columns:tableColumns(this),
      tableData:[],
      total:0,
      formData: {
        'startTime,endTime':[],
        pageNum: 1,
        pageSize: 10,
        instrumentType:'',
        taskStates:[],
      },
      dateKey:'startTime,endTime',
    }
  },
  computed:{

  },
  watch:{

  },
  mounted(){
    const {query} = this.$route
    if(Object.keys(query).length){ // 站点驾驶舱跳转过来默认条件
      // const startTime = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
      // const endTime =  dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
      // this.formData['startTime,endTime'] = [startTime, endTime]
      this.formData.instrumentType = query.type
      this.formData.taskStates = ['1']
    }
    this.getList()
  },
  methods:{
    getList(){
      this.formData.pageNum = this.formData.pageIndex?this.formData.pageIndex:1
      this.formData.pageSize = this.formData.pageSize?this.formData.pageSize:10
      apiGetTaskList({...this.formData}).then(res=>{
        this.tableData = res.data
        this.total = res.totalCount

      })
      // }
      
    },
    deleteTask(row){
      this.$alert('确认删除?', '提示', {
        confirmButtonText: '确定',
        type: 'warning',
      }).then(() => {
        apiDelTask(row.id).then(()=> {
          this.$message({
            type:'success',
            message:'删除成功'
          })
          this.getList();
        }).catch(() =>{
          this.$message({
            type:'error',
            message:'删除失败，请重试！'
          })
        })
      })
    },
  }
}
</script>

<style scoped>

</style>