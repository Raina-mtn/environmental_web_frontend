<template>
  <div class="station-board">
    <header class="flex justify-between">
      <div class="tempure ml-4">
        <!-- 多云 32℃ -->
      </div>
      <h1>
        环境在线监测站点驾驶舱
      </h1>
      <div class="time mr-4">
        <span>{{ curTime }}</span>
        <i class="iconfont icon-houtaituichu ml-4" @click="goback()" />
      </div>
    </header>
    <div class="main-wrapper flex justify-between">
      <LeftPanel ref="leftPanel" class="w-1/4 ml-1" />
      <Main ref="main" class="flex-1" :station-id="stationId" />
      <RightPanel ref="rightPanel" class="w-1/4 mr-1" :station-id="stationId" />
    </div>
  </div>
</template>
<script>
import LeftPanel from './leftPanel.vue';
import RightPanel from './rightPanel.vue';
import Main from './Main.vue';
import { apiGetStat, apiGetIntruDer, apiGetCamera } from '@/api/interface/dashboard'
// import {cameraList} from './mock.js'
import dayjs from 'dayjs';
export default {
  components: {
    LeftPanel,
    RightPanel,
    Main
  },
  data() {
    return {
      stationId: 0,
      curTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      curTimerInterval: null,
      intruTimer: null,
      statTimer: null
    }
  },
  watch: {
    'stationId'(val) {
      if (val) {
        this.getCameraList()
        this.getStat()
        this.getIntruDer()
        this.getIntruDer('ERROR')
        this.requestHttpInterval()
      }
    }
  },
  mounted() {
    const { stationId } = this.$route.query
    if (stationId) {
      this.stationId = stationId
    } else {
      this.stationId = this.$store.state.station.station.id
      this.getCameraList()
      this.getStat()
      this.getIntruDer()
      this.getIntruDer('ERROR')
      this.requestHttpInterval()
    }
    this.curTimerInterval = setInterval(() => {
      this.curTime = dayjs().add(1, 's').format('YYYY-MM-DD HH:mm:ss')
    }, 1000);
  },
  beforeDestroy() {
    this.clearTimer()
    clearInterval(this.curTimerInterval)
    this.curTimerInterval = null
  },
  methods: {
    clearTimer() {
      clearInterval(this.intruTimer)
      clearInterval(this.statTimer)
      this.intruTimer = null
      this.statTimer = null
    },
    // 轮询请求接口
    requestHttpInterval() {
      this.clearTimer()
      this.intruTimer = setInterval(() => {
        if (this.stationId) {
          this.getIntruDer()
          this.getIntruDer('ERROR')
          // this.getWarnIntru()
        }
      }, 1000 * 60 * 3)
      this.statTimer = setInterval(() => {
        if (this.stationId) {
          this.getStat()
        }
      }, 5 * 1000)
    },
    getCameraList() {
      apiGetCamera({ stationId: this.stationId }).then(res => {
        const cameraList = res.data.filter(v => v.equipmentTypeId === 7)
        // const nvr = res.data.find(v=>v.equipmentTypeId === 9)
        this.$refs.main.setCameraList({ cameraList })
      })
    },
    // 获取统计
    getStat() {
      apiGetStat({ stationId: this.stationId }).then(res => {
        const { lastMonitorData, taskProfile, deviceProfile, monitorHistory, station, meteorologicalProfile } = res.data
        const { dataJson, judgeLevel } = lastMonitorData || {} // 实时监测信息
        if (dataJson && typeof dataJson === 'string') {
          const formatData = JSON.parse(dataJson)
          this.$refs.rightPanel.setMonitorData(formatData)
        }
        this.$refs.leftPanel.setData({ taskProfile, deviceProfile, judgeLevel, station, meteorologicalProfile })
        this.$refs.rightPanel.setWarnData((taskProfile && taskProfile.totalPatrolDefectCount) || 0)
        this.$refs.rightPanel.setChartData(monitorHistory)
      })
    },
    getIntruDer(ifError) {
      const params = {
        stationId: this.stationId,
        pageSize: 1,
        pageNum: 1,
        result: ifError
      }
      apiGetIntruDer(params).then(res => {
        if (ifError) { // 设置弹窗报警
          Array.isArray(res.data) && this.$refs.main.showNotice(res.data[0])
        } else {
          this.$refs.rightPanel.setIntruData(res)
        }
      })
    },
    // getWarnIntru() {
    //   apiGetIntruWarnDefect().then(res => {
    //     this.$refs.main.showRobotNotice(res.data)
    //   })
    // },
    // 退出大屏
    goback() {
      if(window.history.length <= 1){
        this.$router.push('/robot-list')
      }else{
        this.$router.back()
      // window.location.reload()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$light-color: #6BF2FF;

.station-board {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: url('~@/assets/images/board/bg.png') center no-repeat;
  background-size: 100vw 100vh;
  padding-bottom: 2rem;

  header {
    width: 100vw;
    height: 92px;
    background: url('~@/assets/images/board/titlebg.png') center no-repeat;
    background-size: 100% 92px;
    color: #fff;
    padding: 0 1rem;

    .tempure,
    .time {
      font-size: 2rem;
      color: #fff;
      line-height: 4.5rem;
    }

    h1 {
      font-size: 3rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 1rem;
    }

    .iconfont {
      font-size: 2rem;
      cursor: pointer;

      &:hover {
        color: $light-color;
      }
    }
  }

  .main-wrapper {
    height: calc(100% - 8rem);
  }
}

.info_tips {
  // position: absolute;
  width: 300px;
  height: 200px;
  background: #f00;
  z-index: 999;
  top: 300px;
  left: 30%;
}
</style>