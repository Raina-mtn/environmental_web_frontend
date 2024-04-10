<template>
  <div>
    <div class="all">
      <div class="left" style="margin-left: 10px;">
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" style="color: #fff;" @change="handleCheckAllChange">{{ projectName }}</el-checkbox>
      </div>
      <div class="right" style="display: inline-block;">
        <el-checkbox-group v-model="checkes" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="item in chooseList" :label="item.omContentId" :key="item.omContentId" :checked="item.isFinish === 1 ? true : false"
          style="color: #fff;display: block;">{{item.omContent}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chooseList: {
      type: Array,
      default: () => []
    },
    projectName: {
      type: String,
      default: () => ''
    }
  },
  data () {
    return {
      checkAll: false,
      isIndeterminate: false,
      // 已选择
      checkes: [],
      // 选项列表
      // chooseList: []
    }
  },

  created () {

  },
  mounted(){
    this.handleCheckAll()
  },

  methods: {
    handleCheckAllChange(val) {
      const list = this.chooseList.map(item => item.omContentId)
      this.checkes = val ? list : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.chooseList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.chooseList.length;
    },
    handleCheckAll(){
      const countFinish = this.chooseList.filter(item => item.isFinish === 1).length;
      this.checkAll = countFinish === this.chooseList.length;
    }
  }
}
</script>

<style scoped lang='scss'>
.container{
  position: relative;
  font-size: 14px;
  color: #FFFFFF;
  border: 1px solid #295599;

  .content{
    width: 100%;
    height: 400px;
    // padding-top: 10px;
    overflow-y: auto;
  }
  .left{
    // position: absolute;
    width: 200px;
    margin-left: 10px;
    height: 100%;
    margin: auto 0;



    //  .el-checkbox__label {
    //     display: inline-grid;
    //     width:200px;
    //     white-space: pre-line;
    //     word-wrap: break-word;
    //   }

  }
  .right{
    padding-left: 10px;
    border-left: 1px solid #295599;
    padding: 12px 24px;
  }

  li{
    height: 40px;
    line-height: 40px;
  }

  .all{
    position: relative;
    border-bottom: 1px solid #295599;
    white-space: nowrap;
    display: flex;
  }

}
</style>
