<template>
  <div class="station-board">
    <header class="flex justify-between">
      <div class="tempure ml-4" />
      <h1>
        在线监测智能运维管控驾驶舱
      </h1>
      <div class="time mr-4">
        <i class="iconfont icon-houtaituichu ml-4" @click="goback()" />
      </div>
    </header>
    <div class="main-wrapper flex justify-between">
      <LeftPanel ref="leftPanel" class="w-1/4 ml-1" />
      <Main ref="main" class="flex-1" />
      <RightPanel ref="rightPanel" class="w-1/4 mr-1" />
    </div>
  </div>
</template>
<script>
import LeftPanel from './leftPanel.vue';
import RightPanel from './rightPanel.vue';
import Main from './Main.vue';
import {apiGetCompreStat, apiGetCompreWarning} from '@/api/interface/dashboard'
export default {
  components:{
    LeftPanel,
    RightPanel,
    Main
  },
  data(){
    return {
      statTimer: null,
      type:'WATER'
    }
  },
  mounted(){
    this.getStat()
    this.getWarn()
    this.requestHttpInterval()
    this.$bus.$on('scatter-type',type => {
      this.type = type
      this.getStat()
    })
  },
  beforeDestroy(){
    this.clearTimer()
  },
  methods:{
    clearTimer(){
      clearInterval(this.statTimer)
      this.statTimer = null
    },
    // 轮询请求接口
    requestHttpInterval(){
      this.clearTimer()
      this.statTimer = setInterval(()=>{
        this.getStat()
        this.getWarn()
      }, 1 * 60 * 1000)
    },
    getStat(){
      apiGetCompreStat().then(res=>{
        const {stationStat,taskProfile, deviceProfile, monitorDataStat , warningDayStat} = res.data || {}
        this.$refs.leftPanel.setData({stationStat, taskProfile, deviceProfile})
        // 右边
        const {waterCount} = stationStat
        const {totalPatrolDefectCount} = taskProfile
        this.$refs.rightPanel.setData({waterCount, monitorDataStat, warningDayStat, totalPatrolDefectCount,type:this.type })
      })
    },
    getWarn(){
      apiGetCompreWarning({ pageNum:1, pageSize:3}).then(res=>{
        const {warningList, monitorErrorCount, patrolDefectCount} = res.data || {}
        this.$refs.rightPanel.setWarnData({monitorErrorCount, patrolDefectCount })
        this.$refs.main.setData(warningList)
      })
    },
    // 退出大屏
    goback(){
      this.$router.back()
      // window.location.reload()
    }
  }
}
</script>
    <style lang="scss" scoped>
    $light-color: #6BF2FF;
    .station-board{
        width: 100vw;
        height: 100vh;
        position: relative;
        background: url('~@/assets/images/compositeBoard/bg.png') center no-repeat;
        background-size: 100vw 100vh;
        padding-bottom: 2rem;
        header{
          width: 100vw;
          height: 8rem;
          background: url('~@/assets/images/board/titlebg.png') center no-repeat;
          background-size: 100% 8rem;
          color: #fff;
          padding: 0 1rem;
          .tempure, .time{
              font-size: 2rem;
              color: #fff;
              line-height: 4.5rem;
          }
          h1{
              font-size: 3rem;
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              top: 1rem;
          }
          .iconfont{
            font-size: 2rem;
            cursor: pointer;
            &:hover{
              color: $light-color;
            }
          }
        }
        .main-wrapper{
          height: calc(100% - 8rem);
        }
    }
    .info_tips{
        // position: absolute;
        width: 300px;
        height: 200px;
        background: #f00;
        z-index: 999;
        top:300px;
        left: 30%;
      }
    </style>