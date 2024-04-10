<template>
  <div class="h-full wrapper">
    <WForm
      class="form-bg"
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
    <div class="mt-16px p-21px bg-white" style="height: calc(100% - 80px);">
      <div class="flex flex-row w-full mb-16px justify-between">
        <div class="font-bold text-xl">
          入侵列表
        </div>
        <!-- <div class="relative">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="$refs.editDialog.openDialog()">
            新增
          </el-button>
        </div> -->
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
    <detailDialog ref="detailDialog" />
  </div>
</template>
<script>
import {apiGetIntruderList} from '@/api/interface/maintenance'
import { listMixin } from "@/mixin/list";
import { WForm, WTable } from "@common-ui/w-form";
import { formColumns, tableColumns } from "./config.js";
import detailDialog from "./detailDialog.vue";
export default {
  components: {
    WForm,
    WTable,
    detailDialog,
  },
  mixins: [listMixin],
  data() {
    return {
      formColumns,
      columns:tableColumns(this),
      tableData:[],
      total:0,
      formData: {
        'minIntrudeTime,maxIntrudeTime':[],
        pageNum: 1,
        pageSize: 10
      },
      dateKey:'minIntrudeTime,maxIntrudeTime'
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
    const {beginTime, endTime } = this.$route.query
    if(beginTime&&endTime){
      this.formData['minIntrudeTime,maxIntrudeTime'] = [beginTime, endTime]
      this.formData.result = 'ERROR'
    }
    this.getList()
  },
  methods:{
    getList(){
      this.formData.pageNum = this.formData.pageIndex?this.formData.pageIndex:1
      apiGetIntruderList({...this.formData,stationId:this.stationId}).then(res=>{
        this.tableData = res.data
        this.total = res.totalCount
      })
    },
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