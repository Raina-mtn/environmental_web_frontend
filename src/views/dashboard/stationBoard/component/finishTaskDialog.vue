<template>
  <div v-if="isShow" class="masking">
    <div class="detail" style="width: 50vw;">
      <div class="detail-header">
        {{ actived==='1'?'完成运维任务':'完成质控任务' }}
        <div class="close" @click="closeDialog">
          <img src="../../../../assets/images/board/header-close.png" alt="">
        </div>
      </div>
      <div class="mt-20px w-128px mb-16px flex">
        <div :class="['btn',actived==='1'?'btn-actived':'','btn-left']" @click="actived='1'">
          运维
        </div>
        <div :class="['btn',actived==='2'?'btn-actived':'','btn-right']" @click="actived='2'">
          质控
        </div>
      </div>
      <div class="detail-content">
        <el-scrollbar class="h-450px">
          <WTable
            ref="mtable"
            :cell-class-name="checkbox"
            :table-data="actived==='1'?pollingTableData:qualityTableData"
            class="mtable"
            :stripe="ture"
            :border="ture"
            :show-page="false"
            :selection="true"
            :selectable="(row) => row.executeType===2&&row.executeState===-1"
            :columns="columns"
            :size="'mini'"
            :span-method="cellMerge"
            style="height: calc(100% - 20px)"
            height="100%"
          />
        </el-scrollbar>
      </div>
      <div class="w-full flex justify-between">
        <el-button class="closebtn" size="mini" type="primary" @click="clickToOpex()">
          {{ actived==='1'?'运维任务列表':'质控任务列表' }}
        </el-button>
        <div class="flex">
          <el-button class="closebtn" size="mini" @click="closeDialog()">
            关闭
          </el-button>
          <el-button class="closebtn" size="mini" type="primary" @click="openFinishDialog()">
            批量完成
          </el-button>
        </div>
      </div>
      </divclass="detail">
    </div>
  </div>
</template>

<script>
import CheckBox from './CheckBox.vue';
import { WTable } from "@common-ui/w-form";
import { tableColumns,qualityTableColumns } from "./config";
import { apiFinishTasks } from "@/api/interface/mission";
import { apiGetOmTaskStat } from '@/api/interface/dashboard';
export default {

  components: {
    CheckBox,
    WTable,
  },
  data() {
    return {
      checkAll:false,
      record: "",
      isShow: false,
      pollingTableData: [],//运维
      qualityTableData: [],//质控
      checkes: [],
      spanArr:[],
      qcSpanArr:[],//质控
      pos:0,
      qcPos:0,

      actived:'1',
      patrolTasksData:{},
      stationId:''
    }
  },
  computed:{
    columns(){
      return this.actived==='1'?tableColumns(this):qualityTableColumns(this)
    }
  },

  methods: {
    checkbox(row){
      if(row.row.executeState === -1&&row.columnIndex === 0){
        return "mycell"
      }
    },
    async openDialog(stationId) {
      this.isShow = true
      this.stationId = stationId
      await this.getList()
    },

    closeDialog() {
      this.isShow = false
      this.spanArr = [] // 清空合并单元格信息数组
      this.qcSpanArr = [] // 清空合并单元格信息数组
      this.pollingTableData = []
      this.qualityTableData = []
      this.pos = 0
      this.qcPos = 0
      this.actived = '1'
    },
    async getList(){
      this.patrolTasksData = (await apiGetOmTaskStat({ stationId: this.stationId })).data
      
      const {mtContents,qcContents} = this.patrolTasksData
      if (mtContents.length >= 1) {
        // 运维任务
        this.spanArr = []
        this.pos = 0
        this.getSpanArr(mtContents)
        this.pollingTableData = mtContents
      }
      if (qcContents.length >= 1) {
        // 质控任务
        this.qcSpanArr = []
        this.qcPos = 0
        this.getSpanArrQc(qcContents)
        this.qualityTableData = qcContents
      }
    },

    submit(){
      this.isShow = false
      // this.tableData = []
    },
    getSpanArr(data) {
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if(data[i].taskName === data[i - 1].taskName) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
    },
    getSpanArrQc(data) {
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          this.qcSpanArr.push(1);
          this.qcPos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if(data[i].taskName === data[i - 1].taskName) {
            this.qcSpanArr[this.qcPos] += 1;
            this.qcSpanArr.push(0);
          } else {
            this.qcSpanArr.push(1);
            this.qcPos = i;
          }
        }
      }
    },

    cellMerge({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        const _row = this.actived==='1'?this.spanArr[rowIndex]:this.qcSpanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },

    clickToOpex(){
      this.$router.push(this.actived==='1'?'/opex/job':'/quality/task')
    },
    async openFinishDialog(value){
      const items = this.$refs.mtable.$children[0].selection.map(i=>i)
      if(items.length >=1 || value){
        if(this.actived==='1'){
          this.closeDialog()
          this.$emit('openFinishDialog',items.length>0 ? items :value)
        }else{
          const params = (items.length>0 ? items :value).map(i=>({taskId:i.taskId,contentId:i.contentId}))
          try {
            await apiFinishTasks(params)
            this.getList()
            this.$message.success('远程质控成功！')
          } catch (error) {
            console.log('error :>> ', error);
          }
        }
      }else{
        this.$message({
          type:'warning',
          message:'请在多选栏选择后再点击！'
        })
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.masking {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .6);
}
.mycell.el-checkbox__input {
  display: none
}
.detail {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(180deg, rgba(60,110,175,0.86) 0%, rgba(13,47,88,0.95) 100%);
  padding-bottom: 60px;
  z-index: 99;
  padding: 24px;
  &-header {
    position: relative;
    width: 100%;
    height: 32px;
    font-size: 20px;
    letter-spacing: 1px;
    color: #FFFFFF;
    background: url('../../../../assets/images/board/header_bg.png') no-repeat;
    background-size: 460px 32px;
    padding-left: 48px;

    .close {
      position: absolute;
      top: 7px;
      right: 24px;
      width: 18px;
      height: 18px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  max-height:700px;

  &-content {

    .subtitle {
      font-size: 16px;
      font-weight: 500;
      color: #E2EDFF;
    }
  }

  .closebtn {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 64px;
    height: 36px;
    background: linear-gradient(180deg, rgba(19,47,95,0.7) 0%, rgba(80,140,245,0.7) 100%);
    border-radius: 4px;
    border: 1px solid #148FF5;
    font-size: 16px;
    color: #E2EDFF;
    cursor: pointer;
  }

}


// 按钮
.btn{
  background: linear-gradient( 180deg, rgba(19,47,95,0.7) 0%, rgba(80,140,245,0.7) 100%);
  width: 64px;
  height: 36px;
  line-height: 36px;
  border: 1px solid #148FF5;
  color: #E2EDFF;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}
.btn-left{
  border-radius: 4px 0 0 4px;
  border-right: none;
}
.btn-right{
  border-radius: 0 4px 4px 0;
}
.btn-actived{
  background: linear-gradient( 180deg, rgba(5,122,213,0.7) 0%, #0B8EFA 100%);
}
</style>