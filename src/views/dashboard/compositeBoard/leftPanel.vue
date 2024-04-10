<template>
  <div class="pl-8 flex flex-col justify-between">
    <!-- 监管情况 -->
    <section class="flex-1">
      <Title :name="'监管情况'" />
      <div class="flex items-center pt-4">
        <div class="h-80 w-1/2">
          <Chart :option="waterOption" />
        </div>
        <div class="w-1/2">
          <p class="flex justify-between items-center">
            <span class="white-light-text text-xl ml-4">环境监测站</span><label class="text-white text-4xl">{{ stationValue.totalCount || 0 }}<span class="text-base">个</span></label>
          </p>
          <StationItem v-for="item in stationNumberConfig" :key="item.key" v-bind="item" :value="stationValue[item.key]" />
        </div>
      </div>
    </section>
    <!-- 设备概况 -->
    <section class="flex-1 my-6">
      <Title :name="'设备概况'" />
      <div class="flex justify-between my-4">
        <div v-for="item in equipmentConfig" :key="item.key" class="device-item">
          <div class="flex justify-between">
            <img :src="item.img">
            <span><b>{{ deviceValue[item.key] || 0 }}</b>{{ item.unit }}</span>
          </div>
          <p>{{ item.name }}</p>
        </div>
      </div>
      <div class="flex h-[13rem] ">
        <Chart :option="onlineRobotOption" class="w-1/2" />
        <Chart :option="onlineCameraOption" class="w-1/2" />
      </div>
    </section>
    <!-- 巡检作业 -->
    <section class="flex-1 relative">
      <Title :name="'运维评估'" />
      <el-radio-group v-model="patrolType" class="patrol-button" size="small">
        <el-radio-button label="监测站点" />
        <el-radio-button label="运维单位" />
      </el-radio-group>
      <ul v-show="patrolType === '监测站点'" class="staion-list">
        <li><span>站点</span><span>类型</span><span>运维评分</span></li>
        <li v-for="(item,index) in stationList" :key="index">
          <span>{{ item.name }}</span><span>水站</span><span>{{ item.score }}分</span>
        </li>
      </ul>
      <ul v-show="patrolType === '运维单位'" class="staion-list">
        <li><span>运维单位名称</span><span>负责运维站点</span><span>运维评分</span></li>
        <li v-for="(item,index) in patrolCompany" :key="index">
          <span>{{ item.name }}</span><span>{{ item.number }}个</span><span>{{ item.score }}分</span>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import Title  from '../stationBoard/component/title.vue';
import Chart from '@/components/Chart.vue'
import {waterOption, pieOption} from './js/chart.config'
import {stationNumberConfig, equipmentConfig, patrolWorksConfig} from './js/config'
import StationItem from './component/StationItem.vue';
export default {
  components:{
    Title, Chart,  StationItem
  },
  data() {
    return {
      waterQulity: 1,
      stationNumberConfig,
      equipmentConfig,
      patrolWorksConfig,
      stationValue: {},
      deviceValue: {},
      taskValue:{},
      stationList:[
        {name: '杭州西溪湿地监测站',   score: 93},
        {name: '杭州南湖监测站',   score: 87},
        {name: '仓前益湖监测站',  score: 85},
        {name: '杭州陈桥监测站',  score: 78},
        {name: '杭州莲花村监测站', score: 75},
        {name: '杭州三墩监测站',   score: 72}
      ],
      patrolType: '监测站点',
      patrolCompany:[
        {name: '环贸运维服务有限公司', number: 5, score: 97},
        {name: '上海维服科技有限公司', number: 9, score: 89},
        {name: '杭州心亮服务有限公司', number: 4, score: 86},
        {name: '杭州服顺服务有限公司', number: 2, score: 82},
        {name: '环力运维服务有限公司', number: 8, score: 81},
        {name: '宁波环微服务有限公司', number: 12, score: 79}
      ]
    }
  },
  computed:{
    waterOption(){
      return waterOption(this.waterQulity)
    },
    onlineRobotOption(){
      return pieOption(this.deviceValue.robotOnlineRatio, '机器人在线率')
    },
    onlineCameraOption(){
      return pieOption(this.deviceValue.cameraOnlineRatio, '摄像头在线率')
    },
  },
  methods:{
    setData({stationStat, taskProfile, deviceProfile}){
      // 监管情况
      this.stationValue = { ...stationStat}
      this.waterQulity = stationStat.grade
      // 运维作业
      this.deviceValue = {...deviceProfile}
      // 设备概况
      const {statDateList, taskCountList, defectCountList, ...rest} = taskProfile
      this.taskValue = { ...rest}
    }
  }
}
</script>
<style lang="scss" scoped>
$light-color: #6BF2FF;
  $white-light-color: #E2EDFF;
.white-light-text{
  color:$white-light-color ;
}
.light-text{
  color:$light-color ;
}
.station-number-item{
  background: linear-gradient(90deg, #05294B 0%, rgba(86,171,255,0.4) 0%, rgba(24,72,118,0.1) 80%, rgba(5,41,75,0) 100%);
  margin-left: -9px;
  height: 44px;
}
.device-item{
  width: 20%;
  &>div{
    color:$white-light-color ;
    font-size: 1.5rem;
    border-bottom:1px solid rgba(203,228,255,0.35) ;
    position: relative;
    padding-bottom: 4px;
    margin-bottom: 4px;
    &:after{
      position: absolute;
      content: '';
      width: 8px;
      height: 2px;
      background: #3DFFFF;
      bottom: 0;
    }
    b{
      font-size: 2rem;
      color:#3DFFFF;
      margin-right: 4px;
    }
  }
  p{
    color: $white-light-color;
    font-size: 1.5rem;
  }

}
.patrol-button{
  position: absolute;
  top:-1px;
  right: 0;
  ::v-deep{
    .el-radio-button__inner{
      background: linear-gradient(180deg, rgba(19,47,95,0.7) 0%, rgba(80,140,245,0.7) 100%);
      border: 1px solid #148FF5;
      color: #fff;
    }
    .el-radio-button__orig-radio:checked+.el-radio-button__inner{
      background: linear-gradient(180deg, rgba(4,115,201,0.7) 0%, #148FF5 100%);
    }
  }
}
.staion-list{
  padding: 1rem 0;
  li{
    color: rgba(255,255,255,0.8);
    height: 3rem;
    line-height: 3rem;
    &:nth-child(2n-1){
      background: rgba(86,171,255,0.2);
    }
    span{
      display: inline-block;
      width: 33%;
      padding: 0 10px;
      text-align: center;
    }
  }
}
</style>
