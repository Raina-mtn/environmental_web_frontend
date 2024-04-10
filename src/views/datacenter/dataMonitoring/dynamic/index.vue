<template>
  <div class="h-full wrapper">
    <div class="in-h-390px bg-white px-24px py-20px mb-1px">
      <div class="title mb-16px">
        动环监控系统
      </div>
      <el-descriptions :column="4">
        <el-descriptions-item v-for="item in dynamicList" :key="item.key" :label="item.label" label-class-name="text-[rgba(0, 0, 0, 0.60)]" :content-class-name="item.isStatus?(!overallEnv[item.key]?'text-[#52C41A]':'text-[#FF4D4F]'):'text-[#000000]'">
          {{ item.statusObj?item.statusObj[overallEnv[item.key]]:overallEnv[item.key] }}
        </el-descriptions-item>
      </el-descriptions>
      <div class="flex flex-wrap">
        <!-- 空调 -->
        <equipment-item v-for="(item,index) in airConditionList" :key="item.instrumentCode" ref="equipmentItem" class="equipment-item" :title="`空调${index+1}`" type="airCondition" :info="item" />
        <!-- 门禁 -->
        <equipment-item v-for="item in doorList" :key="item.instrumentCode" ref="equipmentItem" class="equipment-item" title="门禁" type="accessDoor" :info="item" />
      </div>
    </div>
    <div class="h-144px bg-white px-24px py-20px mb-16px">
      <div class="title mb-16px">
        室内环境监控
      </div>
      <el-descriptions :column="4">
        <el-descriptions-item v-for="item in indoorList" :key="item.key" :label="item.label" label-class-name="text-[rgba(0, 0, 0, 0.60)]" :content-class-name="item.isStatus?(!overallEnv[item.key]?'text-[#52C41A]':'text-[#FF4D4F]'):'text-[#000000]'">
          {{ item.statusObj?item.statusObj[innerEnv[item.key]]:innerEnv[item.key] }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="h-182px bg-white px-24px py-20px">
      <div class="title mb-16px">
        室外环境监控
      </div>
      <el-descriptions :column="4">
        <el-descriptions-item v-for="item in outdoorList" :key="item.key" :label="item.label" label-class-name="text-[rgba(0, 0, 0, 0.60)]" :content-class-name="item.isStatus?(!overallEnv[item.key]?'text-[#52C41A]':'text-[#FF4D4F]'):'text-[#000000]'">
          {{ item.statusObj?item.statusObj[outerEnv[item.key]]:outerEnv[item.key] }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
import EquipmentItem from './equipmentItem.vue'
import {dynamicList,indoorList,outdoorList} from './config.js'
import {list,apiGetAirCondition,apiGetDoor} from '@/api/interface/equipment-dynamic'
export default {
  components:{
    EquipmentItem
  },
  data() {
    return {
      dynamicList,
      indoorList,
      outdoorList,
      timer:null,
      overallEnv:{},//动环监控系统
      innerEnv:{},//室内环境监控
      outerEnv:{},//室内环境监控
      airConditionList:[],//空调列表
      doorList:[],//门禁列表
    }
  },
  mounted() {
    this.getList()
    // this.getAirCondition()
    this.getDoor()

    // 5s轮询
    this.timer = setInterval(() => {
      this.getList()
    }, 5*1000);

  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    getList(){
      list().then((res)=>{
        Object.assign(this,res.data||{})
      })
    },
    // 获取空调遥控器状态
    getAirCondition(){
      apiGetAirCondition().then(res=>{
        this.airConditionList = res.data
      })
    },
    // 获取门禁状态
    getDoor(){
      apiGetDoor().then((res)=>{
        this.doorList = res.data
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.equipment-item {
  @apply w-[23%] h-188px mb-16px mr-24px;
}
</style>