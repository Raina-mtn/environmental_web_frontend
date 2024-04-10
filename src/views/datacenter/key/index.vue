<template>
  <div class="wrapper">
    <div class="choose-btn">
      <div v-for="item in tabList" :key="item.value" class="btn-item" :class="type === item.value ? 'active' : ''" @click="type = item.value">
        {{ item.label }}
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
        :key="new Date().getTime()"
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
    <detail-dialog ref="detailDialog" />
  </div>
</template>
<script>
import { listMixin } from "@/mixin/list";
import { WForm, WTable } from "@common-ui/w-form";
import { formColumns, so2Columns, noxColumns,coColumns,o3Columns,pmColumns } from "./config.js";
import { list } from '@/api/interface/datacenter-key'
import DetailDialog from './detailDialog.vue'
export default {
  components: {
    WForm,
    WTable,
    DetailDialog
  },
  mixins: [listMixin],
  data() {
    return {
      tableData:[],
      total:0,
      formData: {
        'startTime,endTime':[],
        pageNum: 1,
        pageSize: 10
      },
      dateKey:'startTime,endTime',
      type: 'so2',
      tabList:[
        {
          label:'SO₂',
          value:'so2'
        },
        {
          label:'NOx',
          value:'nox'
        },
        {
          label:'CO',
          value:'co'
        },
        {
          label:'O₃',
          value:'o3'
        },
        {
          label:'PM₂.₅',
          value:'pm25'
        },
        {
          label:'PM₁₀',
          value:'pm10'
        },
      ]
    }
  },
  computed:{
    formColumns(){
      return formColumns()
    },
    columns(){
      switch(this.type){
        case 'so2':
          return so2Columns(this)
        case 'nox':
          return noxColumns(this)
        case 'co':
          return coColumns(this)
        case 'o3':
          return o3Columns(this)
        default:
          return pmColumns(this)
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
    type () {
      this.onReset()
    }
  },
  async created () {
    this.getList()
  },
  methods:{
    getList () {
      this.formData.pageNum = this.formData.pageIndex ? this.formData.pageIndex : 1
      list({...this.formData,stationId:this.stationId},this.type).then(res => {
        this.tableData = [...res.data]
        this.total = res.totalCount
      })
    },
    onReset () {
      this.formData = {
        pageNum: 1,
        pageSize: 10,
        'startTime,endTime':[]
      },
      this.getList()
    },
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
