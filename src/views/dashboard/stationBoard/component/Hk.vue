<template>
  <div style="height: 100%; width: 100%" class="hk-select pt-16px">
    <div v-if="false" class="flex justify-between mb-16px">
      <el-select v-model="camera0" placeholder="请选择" size="mini" @change="changeCamera(0)">
        <el-option v-for="item in cameraList" :key="item.id" :label="item.equipmentName" :value="item.id" />
      </el-select>
      <!-- <div>
        <span class="text-white mr-4">屏柜门</span>
        <el-switch v-model="doorOpen" />
      </div> -->
    </div>
    <!-- <div style="width: 100%; min-height: 540px;">
      <iframe
        id="monitorWindow"
        style="height: 100%; width: 100%;min-height: 540px;"
        class="windows"
        src="./hknginx/demo.html"
        frameborder="0"
        @load="onload"
      /> -->
    <div class="flex">
      <div class="iframeVideo">
        <div class="video-change">
          <el-select v-model="camera0" placeholder="请选择" size="mini" style="width: 130px;" @change="changeCamera(0)">
            <el-option v-for="item in cameraList" :key="item.id" :label="item.equipmentName" :value="item.id" />
          </el-select>
        </div>
        <iframe
          id="monitorWindowOne"
          class="windows iframe_video"
          src="./webrtc/index.html"
          frameborder="0"
          @load="onload('One')"
        />
      </div>
      <div class="iframeVideo">
        <div class="video-change">
          <el-select v-model="camera1" placeholder="请选择" size="mini" style="width: 130px;" @change="changeCamera(1)">
            <el-option v-for="item in cameraList" :key="item.id" :label="item.equipmentName" :value="item.id" />
          </el-select>
        </div>
        <iframe
          id="monitorWindowTwo"
          class="windows iframe_video"
          src="./webrtc/index1.html"
          frameborder="0"
          @load="onload('Two')"
        />
      </div>
      <div class="iframeVideo">
        <div class="video-change">
          <el-select v-model="camera2" placeholder="请选择" size="mini" style="width: 130px;" @change="changeCamera(2)">
            <el-option v-for="item in cameraList" :key="item.id" :label="item.equipmentName" :value="item.id" />
          </el-select>
        </div>
        <iframe
          id="monitorWindowThree"
          class="windows iframe_video"
          src="./webrtc/index2.html"
          frameborder="0"
          @load="onload('Three')"
        />
      </div>
    </div>
    <div v-if="false">
      <ul class="table" style="max-height: calc(100% - 30px); overflow: hidden;">
        <li class="th">
          <span v-for="item in columns" :key="item.prop" class="text-center">{{ item.label }}</span>
        </li>
        <li v-for="(item, index) in tableData" :key="index" class="td">
          <template v-for="column in columns">
            <!-- <span v-if="column.prop !== 'picPath' && column.prop !== 'statusName'" :key="`${column.prop}_${index}`" class="text-center"> -->
            <span
              v-if="column.prop !== 'picPath' && column.prop !== 'taskResultName'"
              :key="`${column.prop}_${index}`"
              class="text-center"
            >
              <span v-if="column.prop === 'taskName' && getStrLength(item[column.prop]) > 20" class="text-center">
                <el-tooltip :content="item[column.prop]" placement="top">
                  <span>{{ item[column.prop] }}</span>
                </el-tooltip>
              </span>
              <span v-else class="text-center">
                {{ item[column.prop] }}
              </span>
            </span>
             
            <!-- <span v-if="column.prop === 'statusName'" :key="`${column.prop}_${index}`" class="text-center" :style="{color: item[column.prop]==='异常'?'#f56c6c':'#52C41A'}"> -->
            <span
              v-if="column.prop === 'taskResultName'"
              :key="`${column.prop}_${index}`"
              class="text-center"
              :style="{ color: item[column.prop] === '正常' ? '#52C41A' : '#f56c6c' }"
            >
              {{ item[column.prop] }}
            </span>
            <!-- <span
              v-if="column.prop === 'picPath'"
              :key="`${column.prop}_${index}_button`"
              class="text-center text-blue-500 cursor-pointer"
              @click="showImg(item)"
            > -->
            <span
              v-if="column.prop === 'picPath'"
              :key="`${column.prop}_${index}_button`"
              class="text-center text-blue-500 cursor-pointer"
              @click="showImg(item)"
            >
              查看
            </span>
          </template>
        </li>
      </ul>
      <div class="text-center">
        <el-button v-show="tableData.length !== 0" type="text" style="color: #6BF2FF;" @click="open">
          查看更多...
        </el-button>
      </div>
      <NoData v-show="tableData.length === 0" />
    </div>
    <imgShow ref="imgShow" />
  </div>
</template>
<script>
import { apiOpenCabinet, apiCloseCabinet } from '@/api/interface/dashboard.js'
import { apiGetEquipmentList } from '@/api/interface/equipment'
import NoData from "@/components/NoData.vue";
import dayjs from 'dayjs'
import { list } from '@/api/interface/automation'
import imgShow from './imgShow.vue';
export default {
  components: {
    NoData,
    imgShow
  },
  props: {
    cameraList: {
      type: Array,
      default: () => []//相机设备
    },
    stationId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {

      activeButton: null,
      iframeWindow: null,
      iframeWindowConfig: {
        iframeWindowOne: null,
        iframeWindowTwo: null,
        iframeWindowThree: null,
      },
      camera0: '',
      camera1: '',
      camera2: '',
      camera3: '',
      timer: null,
      doorOpen: false,
      reloadFrameTimer: null,
      reloadPageTimer: null,
      patrolTimer: null,
      tableData: [],
      formData: {
        'minStartTime,maxStartTime':[],
        pageNum: 1,
        pageSize: 10
      },
      columns: [
        {
          label: "任务名称",
          prop: 'taskName'
        },
        {
          label: "机器人",
          prop: 'robotName'
        },
        {
          label: "点位",
          prop: 'spotName'
        },
        {
          label: '运维项目',
          prop: 'omProjectTitle'
        },
        {
          label: '运维内容',
          prop: 'omContent'
        },
        {
          label: '运维结果',
          prop: 'taskResultName',
        },
        {
          label: '详情',
          prop: 'picPath',

        },
      ],
      tableStyle: {
        rowStyle: ({ row, rowIndex }) => {
          if (rowIndex % 2 !== 0) {
            return { background: 'rgba(22,56,86,0.85) !important', color: "#fff" };
          }
          return { background: "transparent", color: "#fff" };
        },
        headerCellStyle: {
          background: "rgba(22,56,86,0.85) !important",
          color: "#fff",
        },
      }
    }
  },
  watch: {
    cameraList: {
      handler(val) {
        this.setDefaultCamera(val)
      },
      deep: true
    },
    doorOpen(val) {
      this.handleCabinet(val)
    },
  },
  mounted() {
    this.getList()
    this.patrolTimer = setInterval(() => {
      this.getList()
    }, 1000 * 2) // 每两秒刷新
    this.reloadPageTimer = setInterval(() => {
      this.reloadPage()
    }, 1000 * 60 * 60) // 每小时刷新

    this.getEquipmentList()
  },
  beforeDestroy() {
    clearInterval(this.timer)
    clearInterval(this.reloadFrameTimer)
    clearInterval(this.reloadPageTimer)
    clearInterval(this.patrolTimer)

  },
  methods: {
    getEquipmentList() {
      // this.stationId = this.$store.state?.station.station?.id]
      apiGetEquipmentList({ equipmentTypeId: 4, stationId: this.$store.state?.station.station?.id}).then(res => {
        this.robotCode = res.data[0]?.equipmentCode
      })
    },
    // 获取字符长度
    getStrLength (str) {
      if (!str) return
      var lens = 0 // 中文算2个字
      for (let i = 0; i < str.length; i++) {
        if ((str.charCodeAt(i) >= 0) && (str.charCodeAt(i) <= 255)) {
          lens = lens + 1
        } else {
          lens = lens + 2
        }
      }
      return lens
    },
    showImg(imgUrl) {
      this.$refs.imgShow.openImg(imgUrl)
    },
    handleCabinet(val) {
      let api
      if (val) {
        api = apiOpenCabinet
      } else {
        api = apiCloseCabinet
      }
      const param = { // 目前屏蔽门参数先写死0613
        "cabinetNo": "NH3-N",
        "stationId": this.stationId
      }
      api(param).then(res => {
        const message = val ? '开启屏柜门中...' : '关闭屏柜门中...'
        this.$message.success(message)
      })
    },
    getList() {
      // this.stationId = this.$store.state?.station.station?.id
      // apiGetPatrolResult({ pageNum: 1, pageSize: 6, stationId: this.stationId }).then(res => {
      //   console.log('res',res)
      //   // this.tableData = res.data ? res.data : []
      // })
      this.formData.pageNum = this.formData.pageIndex?this.formData.pageIndex:1
      this.formData.deviceIds = this.formData.deviceId?[this.formData.deviceId]:null
      list({...this.formData,stationId:this.$route.query.stationId}).then(res=>{
        // console.log('res',res)
        this.tableData = res.data?res.data:[]
        this.total = res.totalCount
      })
    },
    open() {
      this.$router.push('/resultList')
    },
    setDefaultCamera(cameraList) {
      // console.log(cameraList);
      if (cameraList && cameraList.length) {
        this.camera0 = this.cameraList[0]?.id
        this.camera1 = this.cameraList[1]?.id
        this.camera2 = this.cameraList[2]?.id
        setTimeout(() => {
          this.changeCamera(0)
          this.changeCamera(1)
          this.changeCamera(2)
        }, 1200);
        // this.camera1 = this.cameraList[1]?.id
        // this.camera2 = this.cameraList[2]?.id
        // this.camera3 = this.cameraList[3]?.id
      }
    },
    changeCamera(cameraIndex) {
      let key = "One"
      switch (cameraIndex) {
        case 0:
          key = 'One'
          break;
        case 1:
          key = 'Two'
          break;
        case 2:
          key = 'Three'
          break;
        default:
          key = 'One'
          break;
      }
      const cameraId = this['camera' + cameraIndex]
      const camera = this.cameraList.find(v => v.id === cameraId)
      this.iframeWindowConfig[`iframeWindow${key}`].postMessage({
        connectType: `changeCamera${cameraIndex}`, params: {
          camera,
          win_index: cameraIndex // 第几个窗口
        }
      })
    },
    onload(key) {
      
      this.$nextTick(() => {
        clearInterval(this.reloadFrameTimer) // iframe加载成功去掉重载ifame的请求
        const mapFrame = document.getElementById('monitorWindow' + key)
        // this.iframeWindow = mapFrame.contentWindow
        this.iframeWindowConfig[`iframeWindow${key}`] = mapFrame.contentWindow
        if (this.iframeWindowConfig[`iframeWindow${key}`]) {
          setTimeout(() => {
            this.postMessage({
              connectType: 'login',
              params: {
                cameraList: this.cameraList
              }
            }, key)
            // this.reciveMessage()
          }, 500)
        }
      })
    },
    postMessage({ connectType, params }, key) {
     this.iframeWindowConfig[`iframeWindow${key}`] && this.iframeWindowConfig[`iframeWindow${key}`].postMessage(
        {
          connectType,
          params
        },
        "*"
      );
    },
    reciveMessage() {
      window.addEventListener('message', (messageEvent) => {
        const { connectType } = messageEvent.data;
        // clearInterval(this.timer)
        if (connectType == 'refresh') {
          clearInterval(this.timer)
          const arrList = [this.camera0, this.camera1, this.camera2]
          const onlineCamera = []
          arrList.forEach((c, index) => {
            const camera = this.cameraList.find(v => v.id === c)
            onlineCamera.push(camera) // 保持相机顺序
          })
          // 全部完成后，定时刷新 查看camera状态 监控页面检查完状态后会发送消息告诉父页面刷新
          this.timer = setInterval(() => {
            this.postMessage({ // 向父窗口发送消息  检查 摄像机状态
              connectType: 'refresh',
              params: {
                cameraList: onlineCamera,
              }
            })
          }, 5000)
        }

        if (connectType === 'reload') {
          clearInterval(this.timer)
          clearInterval(this.reloadFrameTimer)
          this.reloadFrameTimer = setInterval(() => {
            console.log('进入ifameReload', this.iframeWindow);
            this.iframeWindow.location.href = './hknginx/demo.html'
            this.iframeWindow.location.reload() // 网络断联了轮询重载iframe
          }, 10000)
        }
      })
    },

    reloadPage() { // 每日0时，12点半，7
      const curTime = dayjs().format('HH:mm')
      if (curTime === '00' || curTime === '19' || curTime === '12') {
        window.location.reload()
      }
    }

  }
}
</script>
<style lang="scss">
.hk-select {
  position: relative;

  .justify-between{
    height: 32px;

    el-button{
      height: 32px;
    }

    .el-button--mini {
      font-size: 13px;
    }

    .active {
      background: linear-gradient(180deg, rgba(4,115,201,0.7) 0%, #148FF5 100%);
    }
  }

  .change{
    background: linear-gradient(180deg, rgba(19,47,95,0.7) 0%, rgba(80,140,245,0.5) 100%);
    border-radius: 2px;
    border: 1px solid #148FF5;
  }

  .el-select {
    width: 180px;
    height: 32px;

    .el-input--mini .el-input__inner {
      border: 1px solid #4ea7f9;
      background: rgba(78, 167, 249, 0.3);
      border-radius: 0;
      color: #fff;
    }
  }

  .hk-select-bottom {
    position: absolute;
    bottom: 190px;
    left: 0;
    right: 0;
    display: flex;

    &>div {
      flex: 1
    }
  }
}

.table {
  width: 100%;
  font-size: 12px;

  li {
    height: 4rem;
    line-height: 4rem;
    width: 100%;
    display: grid;
    grid-template-columns: 90px repeat(4, 1fr) 80px 80px;
    color: #fff;
    padding-left: 10px;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &.th {

      background: rgba(22, 56, 86, 0.85);
    }

    &.td {
      &:nth-child(2n-1) {
        background: rgba(22, 56, 86, 0.85);
      }

      &:nth-child(2n) {
        background: transparent;
      }
    }
  }
}
.iframeVideo {
  position: relative;
  width: 288px;
  height: 208px;
  margin-left: 12px;

  .video-change {
    position: absolute;
    top: -42px;
    // right: 12px;
  }

  .iframe_video {
    width: 288px;
    height: calc(100vh - 816px);
  }
}
</style>