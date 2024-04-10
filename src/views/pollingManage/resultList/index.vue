<template>
  <div class="wrapper">
    <WForm
      class="form-bg h-150px"
      :form-data="formData"
      :columns="formColumns"
      label-width="100px"
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
    <div class="mt-16px p-21px bg-white" style="height: calc(100% - 156px);">
      <div class="flex flex-row w-full mb-16px justify-between">
        <div>
          <el-button
            size="mini"
            @click="handleDelete($refs.mtable.$children[0].selection.map(i=>i.id),'ids')"
          >
            批量删除
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleExport"
          >
            导出运维记录
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
    <detail-dialog ref="detailDialog" />
    <edit-dialog ref="editProject" @getList="refresh" />
  </div>
</template>
<script>
import { listMixin } from "@/mixin/list";
import { downloadFile } from '@/utils/util'
import { WForm, WTable } from "@common-ui/w-form";
import { formColumns, tableColumns } from "./config.js";
import { list, deleted, exported,apiQueryByTaskAndContent } from '@/api/interface/automation'
import { apiList, apiDeleted, apiExport } from '@/api/interface/opex/record'
import detailDialog from './detailDialog.vue';
import EditDialog from './EditDialog.vue';
import dayjs from 'dayjs';
export default {
  components: {
    WForm,
    WTable,
    detailDialog,
    EditDialog
  },
  mixins: [listMixin],
  data() {
    return {
      columns:tableColumns(this),
      tableData:[],
      total:0,
      formData: {
        'startTime,endTime':[],
        pageNum: 1,
        pageSize: 10,
        taskCode: ''
      },
      dateKey:'startTime,endTime',
      deleteAPi: apiDeleted,
    }
  },
  computed:{
    formColumns(){
      return formColumns()
    },
    stationId(){
      return this.$store.state.station.station.id
    }
  },
  watch:{
    stationId(){
      this.getDeviceList()      
      this.refresh()
    }
  },
  created () {
    this.formData.taskCode = this.$route.query ? this.$route.query.code : ''
  },
  mounted() {
    // const {query} = this.$route
    // if(Object.keys(query).length){ // 站点驾驶舱跳转过来默认条件
    //   const startTime = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    //   const endTime =  dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    //   this.formData['startTime,endTime'] = [startTime, endTime]
    //   this.formData.status = 2 
    // }
    if (Object.keys(this.$route.params).length) {
      this.formData.taskCode = this.$route.params.taskCode || ''
      this.queryByTaskAndContent();
    }else{
      this.getList()
    }
  },
  methods:{
    getList(){
      this.formData.pageNum = this.formData.pageIndex?this.formData.pageIndex:1
      apiList({...this.formData,stationId:this.stationId}).then(res=>{
        this.tableData = res.data?res.data:[]
        this.total = res.totalCount
      })
    },
    reset () {
      this.formData = {
        'startTime,endTime':[],
        pageNum: 1,
        pageSize: 10,
      },
      this.getList()
    },
    onDelete (codes) {
      this.$alert('确认删除?', '提示', {
        confirmButtonText: '确定',
        type: 'warning',
      }).then(() => {
        apiDeleted({ids: codes}).then(res => {
          this.$message.success(`删除成功！`)
          this.refresh()
        })
      })
    },
    handleExport () {
      if (this.tableData.length === 0) {
        return this.$message.warning(`当前无可导出的记录！`)
      }
      const params = { 
        stationId: this.stationId, 
        startTime: this.formData['startTime,endTime'][0], 
        endTime: this.formData['startTime,endTime'][1], 
        omType: this.formData.omType,
        taskCode: this.formData.taskCode,
        taskName: this.formData.taskName,
        omResult: this.formData.omResult,
        omContent: this.formData.omContent,
        pageSize: this.formData.pageSize,
        pageNum: this.formData.pageIndex?this.formData.pageIndex:1
      }
      this.$confirm('确认导出该文件？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        // inputValidator:(value)=>value?true:'请输入导出文件名！'
      }).then((res)=>{
        apiExport(params).then(res => {
          downloadFile(res, '运维记录', 'application/vnd.ms-excel')
        })
        // const url = '/robot-report/patrolTask/exportContentTask'
        // const token = this.$store?.state?.user?.token
        // apiExportList({url, params, name: '运维记录'})
      })
    },
    queryByTaskAndContent(){
      const {params} = this.$route
      console.log('打印数据:', params)
      apiQueryByTaskAndContent(params).then((res)=>{
        this.tableData = res.data?res.data:[]
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