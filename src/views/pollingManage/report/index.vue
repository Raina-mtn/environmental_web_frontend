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
        <div class="font-bold text-xl">
          监测报告列表
        </div>
      </div>
      <WTable
        ref="mtable"
        class="h-4/5"
        show-num
        :table-data="tableData"
        :stripe="false"
        :border="false"
        :columns="columns"
        :page="formData"
        :size="'mini'"
        :total="total"
        height="100%"
        @pageChange="getList"
      />
    </div>
    <day-detail-dialog ref="daydetailDialog" />
    <day-edit-dialog ref="dayeditDialog" @refresh="refresh" />
    <week-detail-dialog ref="weekdetailDialog" />
    <week-edit-dialog ref="weekeditDialog" @refresh="refresh" />
  </div>
</template>
<script>
import {apiGetReportList,apiConfirmReport,apiExportList} from '@/api/interface/pollingManage'
import { listMixin } from "@/mixin/list";
import { WForm, WTable } from "@common-ui/w-form";
import { formColumns, tableColumns } from "./config.js";
import dayDetailDialog from './dayDetailDialog.vue';
import dayEditDialog from './dayEditDialog.vue';
import weekDetailDialog from './weekDetailDialog.vue';
import weekEditDialog from './weekEditDialog.vue';
export default {
  components: {
    WForm,
    WTable,
    dayDetailDialog,
    dayEditDialog,
    weekDetailDialog,
    weekEditDialog,
  },
  mixins: [listMixin],
  data() {
    return {
      formColumns,
      columns:tableColumns(this),
      tableData:[],
      total:0,
      formData: {
        'minStatDate,maxStatDate':[],
        pageNum: 1,
        pageSize: 10
      },
      dateKey:'minStatDate,maxStatDate'
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
      apiGetReportList({...this.formData,stationId:this.stationId}).then(res=>{
        this.tableData = res.data
        this.total = res.totalCount
      })
    },
    confirm(id){
      this.$confirm('是否确认该报告?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        apiConfirmReport({id}).then(()=>{
          this.refresh()
          this.$message({
            type: 'success',
            message: '确认成功!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消确认'
        });          
      });
    },
    exportFile(id,name){
      const params={id}
      this.$confirm('确认导出该文件？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        // inputValidator:(value)=>value?true:'请输入导出文件名！'
      }).then(()=>{
        const url = '/robot-patrol/report/export'
        // const token = this.$store?.state?.user?.token
        apiExportList({url, params, name})
      })
    },
  }
}
</script>

<style lang="scss" scoped>
</style>