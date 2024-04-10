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
          <el-button type="primary" size="small" icon="el-icon-plus" @click="$refs.chooseType.openDialog()">
            新增
          </el-button>
          <el-button size="small" icon="el-icon-delete" @click="handleDelete($refs.mtable.$children[0].selection.map(i=>i.id),'ids')">
            删除
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
import {list,deleted} from '@/api/interface/quality-plan'
import { listMixin } from "@/mixin/list";
import { WForm, WTable } from "@common-ui/w-form";
import { formColumns, tableColumns } from "./config.js";
import editDialog from "./components/editDialog.vue";
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
        pageNum: 1,
        pageSize: 10,
        'startTime,endTime':[]
      },
      dateKey:'startTime,endTime',
      deleteAPi:deleted,
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
  mounted(){
    this.getList()
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
      })
    },

    // 处理新建任务下一步
    handleNext (props) {
      this.$refs.editdialog.openDialog(false, { generateTaskType: props })
    },
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