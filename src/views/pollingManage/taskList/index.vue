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
      <div class="flex flex-row w-full mb-16px justify-between">
        <div class="font-bold text-xl" />
        <div class="relative">
          <el-button size="small" icon="el-icon-delete" @click="handleDelete($refs.mtable.$children[0].selection.map(i=>i.id),'ids')">
            批量删除
          </el-button>
        </div>
      </div>
      <WTable
        ref="mtable"
        :table-data="tableData"
        :stripe="false"
        :border="false"
        :selection="true"
        :selectable="(row) => row.taskState===5"
        :columns="columns"
        :page="formData"
        :size="'mini'"
        :total="total"
        style="height: calc(80% - 20px)"
        height="100%"
        @pageChange="getList"
      />
    </div>
    <om-list ref="omList" />
    <finishTaskDialog ref="finishTaskDialog" @openFinishDialog="openFinishDialog" />
    <FinishDialog ref="FinishDialog" @finishTaskClick="$refs.finishTaskDialog.openDialog(taskId)" @refresh="refresh" />
    <el-dialog
      :visible="isShowEdit"
      title="编辑"
      :destroy-on-close="false"
      append-to-body
      width="600px"
      @close="isShowEdit = false"
    >
      <div>
        <WForm
          class="form-bg"
          label-width="140px"
          :form-data="editForm"
          :columns="editColumns"
          size="mini"
        />
      </div>
      <template #footer>
        <el-button size="mini" @click="isShowEdit = false">
          关闭
        </el-button>
        <el-button type="primary" size="mini" @click="onSubmit">
          保存
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { listMixin } from "@/mixin/list";
import { WForm, WTable } from "@common-ui/w-form";
import { formColumns, tableColumns } from "./config.js";
import { apiList, apiDeleted, apiEdit, apiPause } from '@/api/interface/opex/task'
import OmList from './components/OmList.vue';
import FinishDialog from './components/FinishDialog.vue'
import finishTaskDialog from './components/finishTaskDialog.vue'

export default {
  components: {
    WForm,
    WTable,
    OmList,
    FinishDialog,
    finishTaskDialog
  },
  mixins: [listMixin],
  data() {
    return {
      formColumns,
      columns:tableColumns(this),
      tableData:[],
      total:0,
      formData: {
        'startTime,endTime':[],
        pageNum: 1,
        pageSize: 10
      },
      editForm: {
        taskStartTime: ''
      },
      editColumns: [
        {
          label: '任务开始时间',
          prop: 'taskStartTime',
          el: 'date-picker',
          type:'datetime',
          placeholder: '请选择任务开始时间',
          'pickerOptions':{
            disabledDate(i) {
              return i.getTime() < (Date.now()-(24 * 60 * 60 * 1000));
            }
          },
          rules:[{ required: true, message: "请选择任务开始时间" }],
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          clearable: true,
          span: 24
        }
      ],
      isShowEdit: false,
      // 当前编辑的id
      editId: '',
      dateKey:'startTime,endTime',
      deleteAPi: apiDeleted,
      taskId: ''
    }
  },
  computed:{
    stationId(){
      return this.$store.state.station.station.id
    }
  },
  watch:{
    stationId(){
      this.refresh()
    }
  },
  mounted() {
    this.getList()
  },
  methods:{
    getList(){
      this.formData.pageNum = this.formData.pageIndex?this.formData.pageIndex:1
      apiList({...this.formData,stationId:this.stationId}).then(res=>{
        this.tableData = res.data
        this.total = res.totalCount
      })
    },

    reset(){
      this.formData = {
        pageNum: 1,
        pageIndex: 1,
        pageSize: 10,
        'startTime,endTime':[],
      }
      this.getList()
    },

    handlePause (id) {
      this.$alert('确认终止该任务吗?', '提示', {
        confirmButtonText: '确定',
        type: 'warning',
      }).then(() => {
        apiPause(id).then(res => {
          if (res.status.code === 1) {
            this.$message.success('终止成功')
            this.getList()
          }
        })
      })
    },

    handleComplete (id) {
      this.taskId = id
      this.$refs.finishTaskDialog.openDialog(id)
    },

    openFinishDialog(items){
      this.$refs.FinishDialog.openDialog(items)
    },

    handleEdit (time, id) {
      this.editId = id
      this.editForm.taskStartTime = time
      this.isShowEdit = true
    },

    // 查看运维内容
    onViewOm (id) {
      this.$refs.omList.openDialog(id)
    },

    onSubmit () {
      if (this.editId) {
        apiEdit({ id: this.editId, taskStartTime: this.editForm.taskStartTime }).then(res => {
          if (res.status.code === 1) {
            this.$message.success('编辑成功！')
          } else {
            this.$message.error('编辑异常，请稍后再试！')
          }
          this.isShowEdit = false
          this.getList()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.container{
    width: 100%;
    height: 100%;
  .content{
    width: 100%;
    height: 100%;
    .btns{
      margin-bottom: 20px;
    }
  }
}
// ::v-deep .el-table__fixed-body-wrapper {
//   top: 36px !important;
// }
// ::v-deep .el-table__body-wrapper {
//   height: 90% !important;
// }
</style>