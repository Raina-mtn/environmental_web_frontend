<template>
  <el-dialog :visible="isShow" title="新建任务" width="600px" @close="closeDialog()">
    <div class="choose-type">
      <div class="choose-type__header">
        <div class="header-line" />
        <div class="header-name">
          请选择任务类型
        </div>
      </div>
      <div class="choose-type__choose">
        <el-radio-group v-model="taskType">
          <el-radio v-for="item in taskTypeList" :key="item.key" :label="item.key">
            {{ item.value }}
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <template #footer>
      <el-button size="mini" @click="isShow = false">
        关闭
      </el-button>
      <el-button type="primary" size="mini" @click="handleNext">
        下一步
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import {apiGetTaskType} from '@/api/interface/quality-plan'
export default {
  data () {
    return {
      isShow: false,
      taskType: 0,
      taskTypeList:[]
    }
  },

  mounted() {
    apiGetTaskType().then(res=>{
      this.taskTypeList = res.data
      this.taskType = res.data[0].key
    })
  },

  methods: {
    openDialog(){
      this.isShow = true
    },
    
    closeDialog(){
      this.taskType = this.taskTypeList[0].key
      this.isShow = false
    },

    handleNext () {
      this.$emit('handleNext', this.taskType)
      this.closeDialog()
    }
  }
}
</script>

<style scoped lang='scss'>
  .choose-type {
    &__header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .header-line {
        width: 3px;
        height: 14px;
        background: #0089FF;
      }

      .header-name {
        font-size: 16px;
        font-weight: 500;
        color: #000000;
        margin-left: 8px;
      }
    }

    &__choose {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
