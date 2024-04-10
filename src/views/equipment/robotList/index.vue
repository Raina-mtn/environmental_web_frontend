<template>
  <div class="h-full wrapper">
    <WForm
      class="form-bg"
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
          机器人列表
        </div>
        <div class="relative">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="$refs.editDialog.openDialog({},false)">
            新增
          </el-button>
          <el-button size="mini" icon="el-icon-delete" @click="handleDelete($refs.mtable.$children[0].selection.map(i=>i.id),'idList')">
            删除
          </el-button>
        </div>
      </div>
      <WTable
        ref="mtable"
        class="h-5/6"
        :table-data="tableData"
        :selectable="()=>true"
        :selection="true"
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
import { robotList, apiDeleteEquipment } from '@/api/interface/equipment'
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
      deleteAPi:apiDeleteEquipment,
      columns:tableColumns(this),
      tableData:[],
      total:0,
      formData: {
        pageNum: 1,
        pageSize: 10
      },
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
      // 气站只需要查看挂轨机器人，对应的id是3
      robotList({...this.formData, stationId: this.stationId, equipmentTypeIdList: [3]}).then(res=>{
        this.tableData = res.data
        this.total = res.totalCount
      })
    },
    handleToDetail (row) {
      this.$router.push({ path: '/robot', query: { id: row.id } })
    },

    refresh () {
      this.getList()
    },

    reset(){
      this.formData = {
        pageNum: 1,
        pageIndex: 1,
        pageSize: 10
      }
      this.getList()
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
