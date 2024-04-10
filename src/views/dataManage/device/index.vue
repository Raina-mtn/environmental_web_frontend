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
          巡检点列表
        </div>
        <div class="relative">
          <el-button size="mini" icon="el-icon-refresh" @click="synchronousDevice">
            同步
          </el-button>
          <!-- <el-button type="primary" size="mini" icon="el-icon-plus" @click="$refs.editDialog.openDialog()">
            新增
          </el-button> -->
        </div>
      </div>
      <WTable
        ref="mtable"
        class="h-4/5"
        :table-data="tableData"
        :show-num="true"
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
import {apiGetDeviceList,apiDeleteDevice,apiSynchronousDevice} from '@/api/interface/device'
import {apiGetEquipmentList} from '@/api/interface/equipment'
import {apiGetStationList} from '@/api/interface/station'
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
      columns:tableColumns(this),
      tableData:[],
      total:0,
      formData: {
        pageNum: 1,
        pageSize: 10,
        stationId:''
      },
      deleteAPi:apiDeleteDevice,
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
    // this.getStation()
    this.getList()
  },
  methods:{
    // getStation(){
    //   apiGetStationList().then(res=>{
    //     if(res.data && Array.isArray(res.data)){
    //       this.formData.stationId = res.data[0]?.id
    //       this.getList()
    //     }
    //   })
    // },
    getList(){
      this.formData.pageNum = this.formData.pageIndex?this.formData.pageIndex:1
      apiGetDeviceList({...this.formData,stationId:this.stationId}).then(res=>{
        this.tableData = res.data
        this.total = res.totalCount
      })
    },
    reset(){
      this.formData = {
        pageNum: 1,
        pageSize: 10,
        stationId:'1000000033',
      }
    },
    handleDelete(deleteList){
      if(Array.isArray(deleteList) && !deleteList.length){
        this.$message.error('请至少选择一条记录！')
      }else{
        this.$alert('确认删除?', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        }).then(() => {
          this.deleteAPi(deleteList).then(() => {
            this.$message.success('删除成功')
          }).finally(() => {
            this.refresh()
          })
        })
      }
    },
    synchronousDevice(){
      apiGetEquipmentList({equipmentTypeId:4,pageNum:1,pageSize:1}).then(res=>{
        console.log('res.data[0] :>> ', res.data[0]);
        let {equipmentCode:robotCode,stationId}=res.data[0]
        apiSynchronousDevice({robotCode,stationId}).then(res=>{
        
        })
      })
      
      
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
</style>