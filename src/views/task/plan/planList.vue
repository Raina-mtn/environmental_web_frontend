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
        <div class="font-bold text-xl"></div>
        <div class="relative">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="$refs.chooseType.openDialog()">
            新增
          </el-button>
          <el-button size="small" icon="el-icon-delete" @click="handleDelete($refs.mtable.$children[0].selection.map(i=>i.id),'ids')">
            删除
          </el-button>
          <el-button-group class="ml-16px">
            <el-button size="small" class="btn">
              列表视图
            </el-button>
            <el-button size="small" @click="$router.push('/opex/calendar')">
              日历视图
            </el-button>
          </el-button-group>
        </div>
      </div>
      <WTable
        ref="mtable"
        :table-data="tableData"
        class="h-4/5"
        :stripe="false"
        :border="false"
        :selection="true"
        :selectable="() => []"
        :columns="columns"
        :page="formData"
        :size="'mini'"
        :total="total"
        style="height: calc(80% - 20px)"
        height="100%"
        @pageChange="getList"
      />
    </div>
    <edit-dialog ref="editdialog" @refresh="refresh" />
    <choose-type ref="chooseType" @handleNext="handleNext" />
  </div>
</template>
<script>
import {apiGetPlanTaskList,apiDeletePlanTaskList, apiStartPlanTask} from '@/api/interface/task'
import { list, deleted } from '@/api/interface/opex/plan'
import { listMixin } from "@/mixin/list";
import { WForm, WTable } from "@common-ui/w-form";
import { formColumns, tableColumns } from "./config.js";
import editDialog from "./editDialog.vue";
import ChooseType from './components/ChooseType.vue';
export default {
  components: {
    WForm,
    WTable,
    editDialog,
    ChooseType
  },
  mixins: [listMixin],
  data() {
    return {
      tabs:'list',
      formColumns,
      columns:tableColumns(this),
      tableData:[],
      total:0,
      formData: {
        'startTime,endTime':[],
        pageNum: 1,
        pageSize: 10,
      },
      dateKey:'startTime,endTime',
      deleteAPi: deleted,
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
  // created () {},
  mounted(){
    this.getList()
    // this.$nextTick(() => {
    //   console.log('打印数据:', this.$refs.mtable)
    //   // this.$refs.mtable.doLayout();
    // })
  },
  update () {
    
  },
  methods:{
    getList(){
      this.formData.pageNum = this.formData.pageIndex?this.formData.pageIndex:1
      this.formData.pageSize = this.formData.pageSize?this.formData.pageSize:10
      list({...this.formData,stationId:this.stationId}).then(res=>{
        this.tableData = res.data
        this.total = res.totalCount
        // this.$refs.mtable.doLayout()
      })
    },
    reset(){
      this.formData = {
        pageNum: 1,
        pageIndex: 1,
        pageSize: 10,
        'startTime,endTime':[],
        stationId:this.stationId
      }
      this.getList()
    },

    // 处理新建任务下一步
    handleNext (props) {
      this.$refs.editdialog.openDialog(false, { generateTaskType: props })
    },
    // 启动
    handleStart(id){
      apiStartPlanTask({id}).then(res=>{
        this.$message.success('启动中...')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn,.btn:hover{
  color:#1890FF;
  border-color: #1890FF;
  margin-right:0 !important;
  background: #FFFFFF;
}
// ::v-deep .el-table__fixed-body-wrapper {
//   top: 36px !important;
// }

// ::v-deep .el-table__body-wrapper {
//   height: 90% !important;
// }
</style>