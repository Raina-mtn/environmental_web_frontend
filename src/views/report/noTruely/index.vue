<template>
  <div class="wrapper">
    <WForm
      class="form-bg h-70px"
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
    <div class="mt-16px p-21px bg-white" style="height: calc(100% - 86px);">
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
    <!-- <detail-dialog ref="detailDialog" /> -->
    <edit-dialog ref="editDialog" @getList="refresh" />
  </div>
</template>
<script>
import { listMixin } from "@/mixin/list";
import { WForm, WTable } from "@common-ui/w-form";
import { formColumns, tableColumns } from "./config.js";
import { deleted } from '@/api/interface/automation'
import { gasTruelyList, gasExport } from '@/api/interface/report'
import {apiGetDeviceList} from '@/api/interface/device'
import EditDialog from './EditDialog.vue';
import dayjs from 'dayjs';
export default {
  components: {
    WForm,
    WTable,
    // detailDialog,
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
      deviceList:[]
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
      // this.getDeviceList()    
      this.refresh()
    }
  },
  created () {
    this.formData.taskCode = this.$route.params.code
  },
  mounted() {
    const {query} = this.$route
    if(Object.keys(query).length){ // 站点驾驶舱跳转过来默认条件
      const startTime = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
      const endTime =  dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
      this.formData['startTime,endTime'] = [startTime, endTime]
      this.formData.status = 2 
    }
    // this.getDeviceList()
    this.getList()
  },
  methods:{
    getList(){
      this.formData.pageNum = this.formData.pageIndex?this.formData.pageIndex:1
      this.formData.deviceIds = this.formData.deviceId?[this.formData.deviceId]:null
      gasTruelyList('nox', {...this.formData,stationId:this.stationId}).then(res=>{
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
    getDeviceList(){
      apiGetDeviceList({pageNum: 1,pageSize: 1000,stationId:this.stationId}).then(res=>{
        this.deviceList = res.data.map(i=>({
          label:i.deviceName,
          value:i.deviceId
        }))
      })
    },
    onDelete (codes) {
      this.$alert('确认删除?', '提示', {
        confirmButtonText: '确定',
        type: 'warning',
      }).then(() => {
        deleted({taskCodes: codes}).then(res => {
          this.$message.success(`删除成功！`)
          this.refresh()
        })
      })
    },
    handleExport (props) {
      // if (this.tableData.length === 0) {
      //   return this.$message.warning(`当前无可导出的记录！`)
      // }
      this.$confirm('确认导出该文件？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then((res)=>{
        gasExport('nox', {id: props.id}).then(res => {
          // const date = new Date()
          // const y = date.getFullYear()
          // const m = date.getMonth() + 1
          // const d = date.getDate()
          // const h = date.getHours()
          // const min = date.getMinutes()
          // const s = date.getSeconds()
          // const time = `${y}-${m}-${d} ${h}:${min}:${s}`
          // downloadFile(res, `${time}nox仪器运行状况校准记录`, 'application/vnd.ms-excel')
          const blob = new Blob([res], {
            type: 'application/vnd.ms-excel'
          })
          if ('download' in document.createElement('a')) { // 支持a标签download的浏览器
            const date = new Date()
            const y = date.getFullYear()
            const m = date.getMonth() + 1
            const d = date.getDate()
            const h = date.getHours()
            const min = date.getMinutes()
            const s = date.getSeconds()
            const time = `${y}-${m}-${d} ${h}:${min}:${s}`
            // const temp = res.headers['content-disposition'].split(';')[1].split('filename*=')[1]
            // 通过 decodeURI 转码汉字
            // const fileName = decodeURI(temp)
            const link = document.createElement('a')// 创建a标签
            // link.download = fileName // a标签添加属性
            link.download = time + '-nox仪器运行状况校准记录'
            link.style.display = 'none'
            link.href = URL.createObjectURL(blob)
            document.body.appendChild(link)
            link.click()// 执行下载
            URL.revokeObjectURL(link.href) // 释放url
            document.body.removeChild(link)// 释放标签
          } else { // 其他浏览器
            navigator.msSaveBlob(blob, '')
          }
        })
        // const url = '/robot-report/patrolTask/exportContentTask'
        // const token = this.$store?.state?.user?.token
        // apiExportList({url, params, name: '运维记录'})
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
