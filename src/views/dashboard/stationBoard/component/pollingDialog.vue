<template>
  <div v-if="isShow" class="masking">
    <div class="detail" style="width: 500px;">
      <div class="detail-header">
        一键运维
        <div class="close" @click="closeDialog">
          <img src="../../../../assets/images/board/header-close.png" alt="">
        </div>
      </div>
      <div class="detail-content">
        <el-radio-group v-model="type">
          <el-radio :label="1">
            机器人巡视
          </el-radio>
          <el-radio :label="2">
            巡视确认 + 仪器质控
          </el-radio>
        </el-radio-group>
      </div>
      <div class="float-right">
        <div class="flex">
          <el-button class="closebtn" size="mini" @click="closeDialog()">
            关闭
          </el-button>
          <el-button class="closebtn" size="mini" type="primary" @click="submit()">
            确定
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {apiOneKeyOperate,apiOneKeyQc} from '@/api/interface/dashboard'
export default {
  data() {
    return {
      record: "",
      isShow: false,
      type:1
    }
  },
  computed:{
    stationId(){
      return this.$store.state.station.station.id
    }
  },
  methods: {
    openDialog() {
      this.isShow = true
    },
    closeDialog() {
      this.isShow = false
    },
    async submit(){
      if(this.type===1){
        // 机器人巡视
        try {
          const params = {
            prefix:  "一键运维",
            keyword:"机器人巡视",
            stationId:this.stationId
          }
          await apiOneKeyOperate(params)
          this.$message.success('一键运维成功！')
        } catch (error) {
          console.log('error :>> ', error);
        }
      }else{
        // 巡视确认+仪器质控
        try {
          const paramsOperate = {
            prefix:  "一键运维",
            keyword:"巡视确认",
            stationId:this.stationId
          }
          const paramsQc = {
            prefix:  "一键运维",
            keyword:"仪器质控",
            stationId:this.stationId
          }
          await apiOneKeyOperate(paramsOperate)
          await apiOneKeyQc(paramsQc)
          this.$message.success('一键运维成功！')
        } catch (error) {
          console.log('error :>> ', error);
        }
      }
      this.isShow = false
    },
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
  top: 30%;
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
    margin:30px;

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

.el-radio{
  color:#fff;
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