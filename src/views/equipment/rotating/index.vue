<template>
  <div class="h-full wrapper">
    <WForm
      class="form-bg"
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
    <div class="mt-16px p-21px bg-white" style="height: calc(100% - 80px);">
      <div class="flex flex-row w-full mb-16px justify-between">
        <div class="font-bold text-xl">
          仪器列表
        </div>
        <div class="relative">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="$refs.editDialog.openDialog()">
            新增
          </el-button>
          <el-button size="mini" icon="el-icon-delete" @click="handleDelete($refs.mtable.$children[0].selection.map(i=>i.id),'ids')">
            删除
          </el-button>
        </div>
      </div>
      <WTable
        ref="mtable"
        class="h-4/5"
        :selectable="()=>true"
        :selection="true"
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
    <editDialog ref="editDialog" @refresh="refresh" />
  </div>
</template>
<script>
// import {apiGetStationList} from '@/api/interface/station'
import { list,deletes } from '@/api/interface/rotating'
import { listMixin } from "@/mixin/list";
import { WForm, WTable } from "@common-ui/w-form";
import { formColumns, tableColumns } from "./config.js";
import editDialog from "./editDialog.vue";
export default {
  components: {
    WForm,
    WTable,
    editDialog,
  },
  mixins: [listMixin],
  data() {
    return {
      formColumns,
      deleteAPi:deletes,
      columns:tableColumns(this),
      tableData:[],
      total:1,
      formData: {
        pageNum: 1,
        pageSize: 10
      },
    }
  },
  computed:{
    stationId(){
      return this.$store.state.station.station.id
    }
  },
  mounted() {
    this.getList()
  },
  methods:{
    getList(){
      this.formData.pageNum = this.formData.pageIndex?this.formData.pageIndex:1
      list({...this.formData,stationId:this.stationId}).then(res=>{
        this.tableData = res.data
        this.total = res.totalCount
      })
    },
    reset(){
      this.formData = {
        pageNum: 1,
        pageIndex: 1,
        pageSize: 10,
      }
      this.getList()
    },
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
</style>