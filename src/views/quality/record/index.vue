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
    <div class="mt-16px p-21px bg-white" style="height: calc(100% - 150px);">
      <WTable
        ref="mtable"
        :table-data="tableData"
        class="h-4/5"
        :stripe="false"
        :border="false"
        :columns="columns"
        :page="formData"
        :size="'mini'"
        :total="total"
        style="height: calc(90% - 20px)"
        height="100%"
        @pageChange="getList"
      />
    </div>
    <edit-dialog ref="editDialog" />
  </div>
</template>
<script>
import { listMixin } from "@/mixin/list";
import { WForm, WTable } from "@common-ui/w-form";
import { formColumns, tableColumns } from "./config.js";
import { list,deleted, apiDeviceQueryByTaskAndContent} from '@/api/interface/quality-record'
import EditDialog from './EditDialog.vue';
export default {
  components: {
    WForm,
    WTable,
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
        pageSize: 10
      },
      dateKey:'startTime,endTime',
      deleteAPi: deleted,
      dictList:[]
    }
  },
  computed:{
    formColumns(){
      return formColumns(this.dictList)
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
    if(this.$route.params.code){
      this.formData.taskCode = this.$route.params.code
    }
  },
  mounted() {
    // const {query} = this.$route
    // if(Object.keys(query).length){ // 站点驾驶舱跳转过来默认条件
    //   const startTime = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    //   const endTime =  dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    //   this.formData['startTime,endTime'] = [startTime, endTime]
    //   this.formData.status = 2 
    // }
    // console.log(query.row);
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
      list({...this.formData, stationId:this.stationId}).then(res=>{
        this.tableData = res.data?res.data:[]
        this.total = res.totalCount
      })
    },
    onDelete (ids) {
      this.$alert('确认删除?', '提示', {
        confirmButtonText: '确定',
        type: 'warning',
      }).then(() => {
        deleted(ids).then(res => {
          this.$message.success(`删除成功！`)
          this.refresh()
        })
      })
    },
    queryByTaskAndContent(){
      const {params} = this.$route
      apiDeviceQueryByTaskAndContent(params).then((res)=>{
        this.tableData = res.data?res.data:[]
      })
    }
  },
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
