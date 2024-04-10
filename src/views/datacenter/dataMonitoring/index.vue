<template>
  <div class="wrapper">
    <div class="choose-btn">
      <div class="btn-item" :class="type === '1' ? 'active' : ''" @click="type = '1'">
        空气
      </div>
      <div class="btn-item" :class="type === '2' ? 'active' : ''" @click="type = '2'">
        动环
      </div>
    </div>
    <WForm
      class="form-bg"
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
          @click="onReset"
        >
          重置
        </el-button>
      </template>
    </WForm>
    <div class=" p-16px bg-white" style="height: calc(100% - 106px);">
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
  </div>
</template>
<script>
import { listMixin } from "@/mixin/list";
import { WForm, WTable } from "@common-ui/w-form";
import { formColumns, gasTableColumns, envTableColumns } from "./config.js";
import { deleted } from '@/api/interface/automation'
import { gasList, gasExport } from '@/api/interface/report'
import { apiGetDicts, apiGetGas, apiGetEnv } from '@/api/interface/datacenter'
import dayjs from 'dayjs';
export default {
  components: {
    WForm,
    WTable
  },
  mixins: [listMixin],
  data() {
    return {
      columns:gasTableColumns(this),
      tableData:[],
      total:0,
      formData: {
        'startTime,endTime':[],
        pageNum: 1,
        pageSize: 10
      },
      dateKey:'startTime,endTime',
      deleteAPi: deleted,
      deviceList:[],
      type: '1'
    }
  },
  computed:{
    formColumns(){
      if (this.type === '1') {
        return [
          {
            label: '监测时间',
            prop: 'startTime,endTime',
            el: 'date-picker',
            type:"daterange",
            placeholder: '请选择监测时间',
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
            clearable: true,
            span: 8
          },
          {
            prop:'btns',
            span:8
          }
        ]
      } else {
        return formColumns(this.deviceList)
      }
      
    },
    stationId(){
      return this.$store.state.station.station.id
    }
  },
  watch:{
    stationId(){
      this.refresh()
    },
    type (val) {
      this.onGetDictList()
      this.getList()
      if (val === '1') {
        this.columns = gasTableColumns(this)
      } else {
        this.columns = envTableColumns(this)
      }
    }
  },
  async created () {
    await this.onGetDictList()
    this.getList()
  },
  methods:{
    getList () {
      this.formData.pageNum = this.formData.pageIndex ? this.formData.pageIndex : 1
      if (this.type === '1') {
        apiGetGas({...this.formData,stationId:this.stationId}).then(res => {
          this.tableData = [...res.data]
          this.total = res.totalCount
        })
      } else {
        apiGetEnv({...this.formData,stationId:this.stationId}).then(res => {
          this.tableData = res.data
          this.total = res.totalCount
        })
      }
    },
    async onGetDictList () {
      await apiGetDicts({ dataType: this.type }).then(res => {
        this.deviceList = res.data.map(i=>({
          label: i.dataName,
          value: i.dataCode
        }))
      })
    },
    onReset () {
      this.formData = {
        'startTime,endTime':[],
        pageNum: 1,
        pageSize: 10,
        dataCode:''
      }
      this.getList()
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
        gasExport('so2', {id: props.id}).then(res => {
          // const date = new Date()
          // const y = date.getFullYear()
          // const m = date.getMonth() + 1
          // const d = date.getDate()
          // const h = date.getHours()
          // const min = date.getMinutes()
          // const s = date.getSeconds()
          // const time = `${y}-${m}-${d} ${h}:${min}:${s}`
          // downloadFile(res, `${time}SO2仪器运行状况校准记录`, 'application/vnd.ms-excel')
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
            link.download = time + '-SO2仪器运行状况校准记录'
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
.choose-btn {
  display: flex;
  .btn-item {
    padding: 9px 24px;
    background: #F0F0F0;
    border-radius: 2px 2px 0px 0px;
    font-size: 14px;
    color: rgba(0,0,0,0.65);
    cursor: pointer;
  }
  .active {
    background-color: #fff;
    color: #148AFF;
  }
}
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
