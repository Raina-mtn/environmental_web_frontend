<template>
  <div class="h-full wrapper">
    <WForm
      class="form-bg h-110px"
      :form-data="formData"
      :columns="formColumns"
      label-width="120px"
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
    <div class="mt-16px p-21px bg-white" style="height: calc(100% - 80px);">
      <div class="flex flex-row w-full mb-16px justify-between">
        <div class="font-bold text-xl">
          运维列表
        </div>
        <div class="relative">
          <el-button size="mini" icon="el-icon-delete" @click="handleDelete">
            批量删除
          </el-button>
          <el-button type="primary" size="mini" icon="el-icon-download" @click="handleExport">
            导出运维记录
          </el-button>
        </div>
      </div>
      <WTable
        ref="mtable"
        class="h-4/5"
        :table-data="tableData"
        show-num
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
    <editDialog ref="editDialog" @refresh="refresh" />
    <detailDialog ref="detailDialog" />
  </div>
</template>
<script>
import {apiGetMaintenanceList} from '@/api/interface/maintenance'
import { listMixin } from "@/mixin/list";
import { WForm, WTable } from "@common-ui/w-form"
import { formColumns, tableColumns } from "./config.js";
import editDialog from "./editDialog.vue";
import detailDialog from "./detailDialog.vue";
export default {
  components: {
    WForm,
    WTable,
    editDialog,
    detailDialog,
  },
  mixins: [listMixin],
  data() {
    return {
      // formColumns,
      columns:tableColumns(this),
      tableData:[],
      total:0,
      formData: {
        'minStartTime,maxStartTime':[],
        pageNum: 1,
        pageSize: 10
      },
      dateKey:'minStartTime,maxStartTime'
    }
  },
  computed:{
    formColumns(){
      return formColumns(this.deviceList)
    },
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
      apiGetMaintenanceList({...this.formData,stationId:this.stationId}).then(res=>{
        this.tableData = res.data
        this.total = res.totalCount
      })
    },
    handleDelete () {},
    handleExport () {},
    // reset(){
    //   this.formData = {
    //     pageNum: 1,
    //     pageIndex: 1,
    //     pageSize: 10
    //   }
    // },
  }
}
</script>

<style lang="scss" scoped>
</style>
