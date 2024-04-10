<template>
  <el-dialog width="40%" :visible="isShow" title="质控内容" :destroy-on-close="true" @close="closeDialog()">
    <div class="h-min-300px">
      <WTable
        ref="mtable"
        :table-data="tableData"
        :stripe="false"
        :border="false"
        :columns="columns"
        :page="formData"
        :size="'mini'"
        :total="total"
        style="height: calc(100% - 20px)"
        height="100%"
        @pageChange="getList"
      />
    </div>
    <template #footer>
      <el-button size="mini" type="primary" @click="closeDialog()">
        关闭
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import { WTable } from "@common-ui/w-form";
import {apiGetContentList} from "@/api/interface/mission"
export default {
  components:{
    WTable
  },
  data() {
    return {
      isShow:false,
      columns:[
        {
          label:"编号",
          prop:'qcExternalCode'
        },
        {
          label:"质控类型",
          prop:'qcType',
          render:(h,{row}) => {
            return <div>
              {row.qcType === 1 ? '检查' : (row.qcType === 2 ? '精度' : '多点')}
            </div>
          }
        },
        {
          label:"质控仪器",
          prop:'instrumentName'
        },
        {
          label:"质控周期（天/次）",
          prop:'qcCycleTime'
        },
        {
          label:"质控名称",
          prop:'qcName'
        },
        {
          label:"质控内容",
          prop:'qcContent'
        },
      ],
      total:0,
      tableData:[],
      formData: {
        pageNum: 1,
        pageSize: 10,
      },
    }
  },
  methods:{
    openDialog(record){
      // this.getList(record.id)
      apiGetContentList(record.id).then((res) => {
        this.tableData = res.data
      })
      this.isShow = true
    },
    getList(record){
      
    },
    closeDialog(){
      this.isShow = false
      this.tableData = []
    },
  }
}
</script>

<style scoped>

</style>