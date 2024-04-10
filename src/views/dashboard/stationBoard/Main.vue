<template>
  <div class="h-full flex-1 mx-8">
    <FlowChart />
    <!-- <HKMonitor class="mb-4" style="height: calc(100% - 20px)" :camera-list="cameraList" :station-id="stationId" /> -->
    <HKMonitor class="mt-42px" :camera-list="cameraList" :station-id="stationId" />
  </div>
</template>
<script>
import FlowChart from './component/FlowChart.vue'
import HKMonitor from './component/Hk.vue'
import { apiAuthoriseIntruDer } from '@/api/interface/dashboard.js'
export default {
  components: {
    HKMonitor,
    FlowChart
  },
  props: {
    stationId: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      cameraList: [],
      cameraCheckedGroup: [],
      noticeVisible: false,
      noticeId: '',
      robotWarnNoticeId: '',
      noticeInstance: null,
      robotWarnNoticeInstance: null,
      cameraBottomChecked: {
        camera1: 2,
        camera2: 3,
        camera3: 4,
      }
    };
  },
  mounted() {
    // this.showRobotNotice({ deviceId: '102', diffRatio: 96 })
    // this.showNotice({ id: 30 })
  },
  beforeDestroy() {
    this.noticeInstance && this.noticeInstance.close()
  },
  methods: {
    setCameraList({ cameraList }) {
      this.cameraList = cameraList
    },
    showNotice(data = {}) {
      if (data.id === this.noticeId) return;// 说明报警已存在
      this.noticeId = data.id
      if (this.noticeInstance) {
        this.noticeInstance.close()
      }
      if (this.noticeId) {
        this.noticeInstance = this.$notify({
          title: '',
          dangerouslyUseHTMLString: true,
          customClass: 'dashboard-notice',
          position: 'top-left',
          duration: 0,
          offset: 300,
          onClose: () => this.noticeId = '',
          message: ` <div>
      <h3><i class="iconfont icon-gantanhao" ></i>人员入侵预警</h3>
      <p>${data.equipmentName}  ${data.intrudeTimeBegin}</p>
      <p>${data.alarmContent}<span class="text-red-400 ml-2">未授权</span></p>
      <div class="flex">
        <label>预警图片：</label>
          <image src="${data.resource}" class="el-image" style="display: ${data.resource ? 'block' : 'none'}" ></image>
          <span  style="display: ${data.resource ? 'none' : 'flex'};"  class="el-image items-center justify-center">暂无图片</span>
      </div>
      <button id="permissionButton" class="el-button">
        授权
      </button>
    </div>`
        });
        setTimeout(() => {
          document.getElementById('permissionButton').addEventListener('click', this.allowPermission)
        }, 500)
      }
    },
    showRobotNotice(data) {
      if (data) {
        if (this.robotWarnNoticeInstance) {
          this.robotWarnNoticeInstance.close()
        }
        this.robotWarnNoticeInstance = this.$notify({
          title: '',
          dangerouslyUseHTMLString: true,
          customClass: 'dashboard-notice ',
          position: 'top-left',
          duration: 30 * 1000, // 
          offset: 300,
          onClose: this.closeRobotWarn,
          message: ` <div>
      <h3 class="text-2rem !mb-10"><i class="iconfont icon-gantanhao mr-2 " ></i>运维作业预警</h3>
      <p class='flex '><label>机器人</label> ${data.robotName}</p>
      <p class='flex '><label>巡检点</label>${data.deviceName}</p>
      <p class='flex '><label>巡检结果</label>${data.resultStr}</p>
      <p class='flex' style="display: ${data.deviceId === '102' || data.deviceId === '105' ? 'flex' : 'none'}"><label>检测数据</label>${data.data ?? '--'}</p>
      <p class='flex' style="display: ${data.deviceId === '102' || data.deviceId === '105' ? 'flex' : 'none'}"><label>第三方检测结果</label>${data.thirdResult ?? '--'}</p>
      <p class='flex' style="display: ${data.deviceId === '102' || data.deviceId === '105' ? 'flex' : 'none'}"><label>结果比值</label>${data.diffRatio}%</p>
      <p class='flex '><label>预警时间</label>${data.devicePatrolTime}</p>
      <div class="flex !mt-6 !mb-10">
        <label>预警图片</label>
          <image src="${data.visibleImgPath}" class="el-image" style="display: ${data.visibleImgPath ? 'block' : 'none'}" ></image>
          <span  style="display: ${data.visibleImgPath ? 'none' : 'flex'};"  class="el-image items-center justify-center">暂无图片</span>
      </div>
    </div>`
        });
      }
    },
    closeRobotWarn() {
      this.robotWarnNoticeId = null
    },
    allowPermission() {
      apiAuthoriseIntruDer({ id: this.noticeId }).then(res => {
        if (res.status.code === 1) {
          this.$message.success('授权成功')
          this.noticeInstance.close()
        }
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.monitor-bottom {
  height: 200px;
}
</style>
<style  lang="scss">
.dashboard-notice {
  left: 50% !important;
  top: 50% !important;
  transform: translate(-50%, -60%);
  font-size: 14px;
  background: linear-gradient(180deg,
      rgba(159, 57, 20, 0.9) 0%,
      rgba(28, 10, 3, 0.9) 100%);
  border: 1px solid;
  border-image: linear-gradient(180deg,
      rgba(255, 92, 67, 1),
      rgba(255, 92, 67, 0.06)) 1 1;
  width: 30%;
  z-index: 1000;

  .el-notification__group,
  .el-notification__content {
    width: 100%;
  }

  .el-icon-close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #999;
    cursor: pointer;

    &:hover {
      color: #fff;
    }
  }

  h3 {
    color: #E2EDFF;

    .icon-gantanhao {
      color: rgb(255, 92, 67);
    }
  }

  p {
    color: #E2EDFF;
    white-space: nowrap;
    margin-bottom: 5px;

    label {
      flex: 0 0 100px;
      width: 100px;
      display: block;
      text-align: justify;
      text-align-last: justify;

      &::after {
        content: '';
        display: inline-block;
        width: 100%;
      }
    }

    .el-image {
      display: block;
      width: 90%;
      height: 240px;
      background: #f0f0f0;
      color: #ccc;
    }
  }

  .el-button {
    width: 68px;
    height: 32px;
    background: linear-gradient(360deg, rgba(159, 57, 20, 0.9) 0%, rgba(28, 10, 3, 0.9) 100%);
    border-radius: 2px;
    border: 1px solid #FF5C43;
    color: #fff;
    padding: 0;
    float: right;
    margin-top: 10px;

    &:hover {
      background: linear-gradient(360deg, rgba(197, 56, 5, 0.9) 0%, rgba(73, 23, 3, 0.9) 100%);
    }
  }
}

.monitor-check {
  margin-bottom: 1rem;

  .el-checkbox-button__inner {
    height: 32px;
    line-height: 32px;
    padding-top: 0;
    padding-bottom: 0;
    background: linear-gradient(180deg, rgba(19, 47, 95, 0.1) 0%, rgba(80, 140, 245, 0.2) 100%);
    color: #fff;
    border-color: #148FF5;
  }

  .el-checkbox-button.is-checked .el-checkbox-button__inner,
  .el-checkbox-button.is-disabled .el-checkbox-button__inner {
    border-color: #148FF5;
    background: linear-gradient(180deg, rgba(19, 47, 95, 0.7) 0%, rgba(80, 140, 245, 0.7) 100%);
  }
}
</style>