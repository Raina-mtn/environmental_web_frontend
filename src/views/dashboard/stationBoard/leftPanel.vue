<template>
  <div class="pl-8 flex flex-col justify-between">
    <!-- 站点概况 -->
    <Title :name="'站点概况'" />
    <section class="water-quality flex flex-1 items-center mt-12px">
      <div class="h-full w-1/2">
        <Chart :option="waterOption" />
      </div>
      <div class="w-3/4 titleh">
        <!-- <h3>{{ stationData.stationName }}</h3> -->
        <h3>{{ stationName }}</h3>
        <!-- <p><label>编号:</label><span>{{ stationData.stationCode }}</span></p> -->
        <p><label>东经:</label><span>{{ stationData.longitude ? Number(stationData.longitude).toFixed(4) : '--' }}</span><label class="ml-4">北纬:</label><span>{{ stationData.latitude? Number(stationData.latitude).toFixed(4) : '--' }}</span></p>
        <!-- <p><label>负责人:</label><span>{{ stationData.people || '--' }}</span></p>
        <p><label>联系方式:</label><span>{{ stationData.phone || '--' }}</span></p> -->
        <p><label>所属区域:</label><span>{{ stationData.districtName || '--' }}</span></p>
        <p><label>详细地址:</label><span>{{ stationData.address }}</span></p>
        <!-- <p><label>温度:</label><span>{{ formatMete(meteorologicalProfile.temperature) || '--' }}</span></p>
        <p><label>湿度:</label><span>{{ formatMete(meteorologicalProfile.humidity) || '--' }}</span></p> -->
        <p><label>温度:</label><span>{{ meteorologicalProfile.airTemperature || '--' }}{{ '℃' }}</span><label class="ml-4">湿度:</label><span>{{ meteorologicalProfile.airHumidity || '--' }}{{ '%' }}</span></p>
        <p><label>风速:</label><span>{{ meteorologicalProfile.windSpeed || '--' }}{{ 'm/s' }}</span><label class="ml-4">风向:</label><span>{{ meteorologicalProfile.windDirect || '--' }}</span></p>
        <!-- <p><label>风向:</label><span>{{ meteorologicalProfile.windDirect+'deg' || '--' }}</span></p> -->
        <p><label>大气压:</label><span>{{ meteorologicalProfile.airPressure || '--' }}{{ 'kPa' }}</span></p>
      </div>
    </section>
    <!-- 设备统计 -->
    <!-- <section class="flex-1 my-6">
      <Title :name="'设备统计'" />
      <div v-for="(value, key) in equimentStaticConfig" :key="key" class="flex items-center my-6">
        <div class="mr-4 w-36">
          <img :src="value.img" class="w-24">
          <p class="text-white text-center w-24">
            {{ key === 'robot' ? '机器人' : '视频监控' }}
          </p>
        </div>
        <ul class="flex-1">
          <li v-for="item in value.datasource" :key="item.key" class="static-item">
            <span><i :class="`dot ${item.key}`" />{{ item.name }}</span>
            <CountTo :end-val="equimentStaticData[item.valueKey] || 0" class="value" />
          </li>
        </ul>
      </div>
    </section> -->
    <!-- 运维任务 -->
    <section class="flex-1 my-6 relative">
      <div class="board-title">
        <span class="job-title" @click="() => {this.$router.push('/opex/job')}">运维任务</span>
      </div>
      <div class="flex btn-task">
        <el-button size="mini" type="primary" @click="$refs.pollingDialog.openDialog()">
          一键运维
        </el-button>
        <el-button size="mini" type="primary" @click="finishTaskClick()">
          完成运维任务
        </el-button>
      </div>
      <div class="patrol-works flex justify-between">
        <section v-for="item in patrolTasksConfig" :key="item.key" class="flex items-center ">
          <img :src="item.img" class="mr-4 w-18">
          <div>
            <p>
              {{ item.name }}
            </p>
            <p class="text">
              <span>{{ patrolTasksData[item.key] }}</span>
            </p>
          </div>
        </section>
      </div>
      <div class="today-patrol-works">
        <ul>
          <li v-for="(item, index) in patrolTasksData.contentNames" :key="item.omContentId + String(index)" :class="item.executeState > 0 ? 'green' : 'white'">
            <i class="task-border" />
            <span :class="[item.hasFinished?'text-[#52C41A]':'']" style="display: inline-block;">{{ item.name }}</span>
          </li>
          <!-- <li v-for="(item, index) in finishTotalPatrolDatas" :key="item.omContentId + String(index)" class="cursor-pointer" @click="handleClickKey(item.omContentValue)">
            <i style="border-radius: 50%;height:2rem;width:2rem;color:aliceblue"></i>
            <p :class="item.isFinish === 1 ? 'done' : ''" style="display: inline-block;">{{ item.omContent }}</p>
          </li> -->
        </ul>
      </div>
    </section>
    <!-- 巡检作业 -->
    <section class="flex-1 relative">
      <Title :name="'运维趋势'" />
      <!-- <el-button v-show="oprationShow" size="mini" type="primary" class="btn-task" @click="autoCreateTask">
        一键运维
      </el-button> -->
      <div class="patrol-works flex justify-between">
        <section v-for="item in patrolWorksConfig" :key="item.key" class="flex items-center ">
          <img :src="item.img" class="mr-4 w-18">
          <div>
            <p>
              {{ item.name }}
            </p>
            <p class="text">
              <CountTo v-if="item.key !== 'totalPatrolDuration'" :end-val="patrolWorksData[item.key] || item.defaultValue || 0" />
              <span v-else>{{ patrolWorksData[item.key] || item.defaultValue || 0 }}</span>
              <span v-if="item.key !== 'totalPatrolDuration'">{{ item.unit }}</span>
            </p>
          </div>
        </section>
      </div>
    </section>
    <section class="text-light-50">
      近7日运维趋势
    </section>
    <!-- 线图  -->
    <section class="h-1/4">
      <Chart :option="lineOption" />
    </section>
    <!-- 批量确认表格 -->
    <Dialog ref="Dialog" />
    <!-- 关键参数 -->
    <KeyParameter ref="keyParameter" />
    <!-- 完成运维任务 -->
    <finishTaskDialog ref="finishTaskDialog" @openFinishDialog="openFinishDialog" />
    <!-- 完成任务详情弹窗页 -->
    <FinishDialog ref="FinishDialog" @finishTaskClick="finishTaskClick" />
    <PollingDialog ref="pollingDialog" />
  </div>
</template>
<script>
import Title from './component/title.vue';
import { equimentStaticConfig, patrolWorksConfig, patrolTasksConfig } from './config'
import Chart from '@/components/Chart.vue'
import { patrolLineOption, waterOption } from './chart.config'
import dayjs from 'dayjs';
import CountTo from '@/components/CounTo/CountTo.vue';
import { apiCreatePlanTaskList } from '@/api/interface/task'
import { apiGetEquipmentList } from '@/api/interface/equipment';
import { WTable } from "@common-ui/w-form";
import { apiGetOmTaskStat, apiGetOmTaskContent, apiGetOmTaskProject } from '@/api/interface/dashboard';
import Dialog from './component/Dialog.vue'
import KeyParameter from './component/KeyParameter.vue'
import finishTaskDialog from './component/finishTaskDialog.vue'
import FinishDialog from './component/FinishDialog.vue'
import PollingDialog from './component/pollingDialog.vue'
export default {
  components: {
    Title, Chart, CountTo, WTable, Dialog, KeyParameter,finishTaskDialog,FinishDialog,PollingDialog
  },
  data() {
    return {
      isShow:false,
      oprationShow: true,
      equimentStaticConfig,
      patrolWorksConfig,
      patrolTasksConfig,
      patrolWorksData: {
        patrolRoute: '',
        totalPatrolDuration: '',
        totalPatrolTaskCount: ''
      },
      patrolTasksData:{
        totalTask:'',
        finishTask:'',
        unFinishTask:''
      },
      totalPatrolDatas:[],
      finishTotalPatrolDatas:[],
      unFinishTotalPatrolDatas:[],
      partrolLineData: {
        xData: []
      },
      equimentStaticData: {},
      waterLevel: 0,
      stationData: {},
      time: null,
      curTime: dayjs(),
      createTask: false,
      meteorologicalProfile: {},
      lineOption: {
      },
      tableData:[],
      requireInterval: null
    }
  },
  computed: {
    // patrolLineOption() {
    //   return this.partrolLineData.xData ? patrolLineOption(this.partrolLineData) : {}
    // },
    waterOption() {
      return waterOption(this.waterLevel)
    },
    stationName(){
      return this.$store.state.station.station.stationName
    },
  },
  watch: {
    'partrolLineData.xData': {
      deep: true,
      handler (val, oldVal) {
        if (val) {
          if (val.toString() !== oldVal.toString()) {
            this.lineOption = patrolLineOption(this.partrolLineData)
          }
        }
      }
    }
  },
  mounted() {
    this.getEquipmentList()
    this.getOmTaskStat()
    this.getOmTaskContent()
    this.getOmTaskProject()
    this.requireInterval = setInterval(() => {
      if (this.stationId) {
        this.getOmTaskStat()
        this.getOmTaskContent()
        this.getOmTaskProject()
      }
    }, 5 * 1000)
    const time = window.localStorage.getItem('createTask')
    if (time && dayjs().diff(dayjs(time), 's') < 30) {
      this.oprationShow = false
    }
  },
  beforeDestroy() {
    clearInterval(this.requireInterval)
    this.requireInterval = null
  },
  methods: {

    // 分钟转小时方法
    minute(MM) {
      if (MM < 0) {
        return ''
      }
      var ss = MM % 60
      ss < 10 ? (ss = '0' + ss) : ss
      var hh = Math.floor(MM / 60)
      hh < 10 ? (hh = '0' + hh) : ss
      var time = hh + '小时' + ss + '分'
      return time
    },
    getEquipmentList() {
      this.stationId = this.$store.state?.station.station?.id
      apiGetEquipmentList({ equipmentTypeId: 4, stationId: this.stationId }).then(res => {
        this.robotCode = res.data[0]?.equipmentCode
      })
    },
    // apiGetStat
    setData({ taskProfile, deviceProfile, judgeLevel, station, meteorologicalProfile }) {
      const { patrolRoute, totalPatrolTaskCount, statDateList, taskCountList, defectCountList } = taskProfile || {}
      this.patrolWorksData = { patrolRoute, totalPatrolTaskCount}
      this.patrolWorksData.totalPatrolDuration = this.minute(totalPatrolTaskCount !== undefined ? totalPatrolTaskCount * 7 : 45 * 7)
      // this.partrolLineData = {
      //   // xData: statDateList.map(v => v && dayjs(v).format('MM-DD')),
      //   sData1: taskCountList,
      //   sData2: defectCountList
      // }
      this.partrolLineData.sData1 = taskCountList
      this.partrolLineData.sData2 = defectCountList
      this.partrolLineData.xData = statDateList && statDateList.map(v => v && dayjs(v).format('MM-DD'))
      this.equimentStaticData = { ...deviceProfile }

      // const time = window.localStorage.getItem('createTask')
      // if (time && dayjs().diff(dayjs(time), 's') < 75) {
      //   this.oprationShow = false
      // } else {
      //   this.oprationShow = !this.createTask || (this.createTask && deviceProfile.robotWorkCount > 0)
      // }

      this.waterLevel = judgeLevel ? judgeLevel - 1 : 0 // 枚举值从1开始的
      this.stationData = { ...station }
      this.meteorologicalProfile = { ...meteorologicalProfile }
    },
    // 查询今日运维任务统计
    getOmTaskStat(){
      apiGetOmTaskStat({ stationId: this.stationId }).then(res => {
        this.patrolTasksData = res.data
      })
    },
    // 查询今日运维任务-运维内容
    getOmTaskContent(){
      apiGetOmTaskContent( {stationId: this.stationId} ).then(res => {
        this.totalPatrolDatas = res.data
        this.finishTotalPatrolDatas = this.totalPatrolDatas.filter(item => item.isFinish === 1)
        this.unFinishTotalPatrolDatas = this.totalPatrolDatas.filter(item => item.isFinish === 0)
      })
    },
    // 查询今日运维任务-运维项目
    getOmTaskProject(){
      apiGetOmTaskProject( {stationId: this.stationId} ).then(res => {
        this.tableData = res.data
      })
    },
    // 批量确认
    batchConfirm(){
      this.getOmTaskProject()
      this.$refs.Dialog.openImg(this.tableData)
    },
    handleClickKey (keyType) {
      if (keyType) {
        this.$refs.keyParameter.openDialog(keyType)
      } else {
        this.$refs.Dialog.openImg()
      }
    },
    submit(){
      this.isShow = false
    },
    autoCreateTask() {
      const time = window.localStorage.getItem('createTask')
      if (time && dayjs().diff(dayjs(time), 's') < 30) {
        return this.$message.warning('任务下发中，请稍后操作~')
      }
      this.createTask = true
      // this.oprationShow = false
      if (!this.time) this.time = dayjs()
      const params = {
        planStartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        robotCode: this.robotCode,
        stationId: this.stationId,
        taskEndWork: 0,
        taskName: `${this.stationData.stationName}-智能运维任务-${dayjs().format('YYYYMMDDHHmmss')}`,
        taskOperateType: 1,
        taskStartDateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }
      apiCreatePlanTaskList(params).then((res) => {
        this.$message.success('任务下发成功')
        this.time = dayjs()
        window.localStorage.setItem('createTask', dayjs()) // 缓存下创建任务的时间，30s内不可再发
      })

    },
    formatMete(value = '') {
      let textValue = null
      if (value) {
        const v = value.substring(0, value.length - 1)
        const unit = value.slice(-1)
        textValue = (Number(v) / 10).toFixed(2) + unit
      } else {
        textValue = 0
      }
      return textValue
    },
    // 完成运维任务按钮点击
    finishTaskClick(){
      this.$refs.finishTaskDialog.openDialog(this.stationId)
    },
    openFinishDialog(items){
      this.$refs.FinishDialog.openDialog(items)
    }
  }

}
</script>
<style lang="scss" scoped>
$light-color: #6BF2FF;
$white-light-color: #E2EDFF;

img {
  display: block;
}

.water-quality {
  background: linear-gradient(270deg, rgba(9, 23, 34, 0) 0%, rgba(13, 34, 50, 0.44) 43%, rgba(12, 37, 57, 0.67) 67%, rgba(11, 32, 49, 0.88) 100%);
  margin-bottom: 1rem;

  h3 {
    color: $light-color;
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  p {
    color: $white-light-color;
    line-height: 2rem;
    font-size: 12px;

    label {
      margin-right: 2px;
    }
  }
}

.static-item {
  background: linear-gradient(90deg, #05294B 0%, rgba(86, 171, 255, 0.25) 0%, rgba(5, 41, 75, 0.1) 100%);
  padding: 0.5rem 1.5rem;
  color: $white-light-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;

  .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 2px;
    margin-right: 1rem;

    &.waiting {
      background: #0AA7FF;
    }

    &.running {
      background: #FFC62E;
    }

    &.offline {
      background: #D4DEEC;
    }
  }

  .value {
    color: $light-color;
    font-size: 1.5rem;
    font-weight: bold;
  }
}

.patrol-works {
  padding: 1.8rem 0;

  p {
    color: $white-light-color;
    font-size: 1.5rem;
  }

  span {
    color: $light-color ;
    font-size: 16px;
    font-weight: bold;
  }
}

.btn-task {
  position: absolute;
  right: 5px;
  top: 0px;

  // &.is-disabled {
  //   background: #DCDFE6;
  //   border-color: #DCDFE6;
  //   color: #aaa;
  // }
}

.today-patrol-works {
  width: 440px;
  height: 150px;
  overflow-y:auto;
  overflow-x:hidden;
  padding-left: 20px;
  padding-top: 10px;
  background: rgba(86,171,255,0.14);

  ul{
    font-size: 1.5rem;
    color: $white-light-color;
    width: 400px;
    // white-space:nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;  
    .green{
      .task-border{
        background-color: #51e7ad;
      }
      .task-span{
          color: #51e7ad;
      }
      }
    .white{
      .task-border{
      background-color: #E2EDFF;
      }
      .task-span{
        color: #E2EDFF;
      }
    }
    li{
      position: relative;
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      

      input{
        position: absolute;
        top: 2px;
        left: 3px;
        line-height: 13px;
      }

      p {
        width: 320px;
        white-space:nowrap;
        overflow: hidden;
        // text-overflow: ellipsis;
      }
      .task-border{
        border-radius: 50%;
        height: 8px;
        width: 8px;
        
      }
    }

    span{
      padding-left: 10px;
    }


    input[type=checkbox] {
            cursor: pointer;
            position: relative;
            width: 12px;
            height: 12px;
            font-size: 14px;
        }

    input[type=checkbox]::after{
      content: "";
      position: absolute;
      top: 0;
      width: 12px;
      height: 12px;
      display: inline-block;
      visibility: visible;
      padding-left: 0px;
      text-align: center;
      content: ' ';
      border-radius: 3px;
          }

    input[type=checkbox]:checked::after {
      content: "✓";
      font-size: 11px;
      font-weight: bold;
      background-color: #6BF2FF;
      color: #ffffff;
    }
  }
}
.done{
  color: #6BF2FF;
}

.el-button--primary{
  background: linear-gradient(180deg, rgba(19,47,95,0.7) 0%, rgba(80,140,245,0.7) 100%);
  border-radius: 4px;
  border: 1px solid #148FF5;
}

.titleh{
  p{
    font-size: 12px;
  }
}
.board-title{
  width: 100%;
  height: 3rem;
  background: url('~@/assets/images/board/titlebg2.png') no-repeat;
  background-size:100% 3rem;
  font-size: 2rem;
  color: #fff;
  line-height: 3rem;
  text-indent: 2rem;
  text-shadow: 0px 0px 9px #158EFF;
  .job-title:hover{
    cursor:pointer;
  }
}
</style>