<template>
  <div class="h-full wrapper">
    <div class="in-h-390px bg-white px-24px py-20px mb-16px">
      <div class="title mb-16px">
        动环监控系统
      </div>
      <el-descriptions :column="3" class="w-[75%]">
        <el-descriptions-item v-for="item in dynamicList" :key="item.key" :label="item.label" label-class-name="text-[rgba(0, 0, 0, 0.60)]" content-class-name="text-[#000000]">
          {{ item.statusObj?item.statusObj[overallEnv[item.key]]:overallEnv[item.key] }}{{ overallEnv[item.key]!=='--'?item.unit:'' }}
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
        <el-descriptions-item v-for="item in indoorList" :key="item.key" :label="item.label" label-class-name="text-[rgba(0, 0, 0, 0.60)]" :content-class-name="item.isStatus&&['1','0'].includes(innerEnv[item.key])?(innerEnv[item.key]==='0'?'text-[#52C41A]':'text-[#FF4D4F]'):'text-[#000000]'">
          {{ item.statusObj?item.statusObj[innerEnv[item.key]]:innerEnv[item.key] }}{{ innerEnv[item.key]!=='--'?item.unit:'' }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="h-182px bg-white px-24px py-20px mb-16px">
      <div class="title mb-16px">
        室外环境监控
      </div>
      <el-row v-for="(item,index) in outdoorList" :key="index">
        <el-col v-for="colItem in item" :key="colItem.key" :span="6" class="mb-16px">
          <span class="text-[#00000099] text-14px">{{ colItem.label }}：</span>
          <span class="text-[#000000] text-14px">{{ colItem.statusObj?colItem.statusObj[outerEnv[colItem.key]]:outerEnv[colItem.key] }}{{ outerEnv[colItem.key]!=='--'?colItem.unit:'' }}</span>
        </el-col>
      </el-row>
    </div>
    <div class="h-182px bg-white px-24px py-20px">
      <div class="title mb-16px">
        安环监控系统
      </div>
      <div>
        <el-row v-for="(item,index) in safeList" :key="index">
          <el-col v-for="colItem in item" :key="colItem.key" :span="6" class="mb-16px">
            <span class="text-[#00000099] text-14px">{{ colItem.label }}：</span>
            <span :class="[item.isStatus&&['1','0'].includes(overallSafety[item.key])?(overallSafety[item.key]==='0'?'text-[#52C41A]':'text-[#FF4D4F]'):'text-[#000000]','text-14px']">{{ colItem.statusObj?colItem.statusObj[overallSafety[colItem.key]]:overallSafety[colItem.key] }}{{ overallSafety[colItem.key]!=='--'?colItem.unit:'' }}</span>
          </el-col>
        </el-row>

        <!-- <el-descriptions :column="1" class="w-[25%]">
          <el-descriptions-item v-for="item in safeList" :key="item.key" :label="item.label" label-class-name="text-[rgba(0, 0, 0, 0.60)]" content-class-name="text-[#000000]">
            {{ overallSafety[item.key] }}{{ overallSafety[item.key]!=='--'?item.unit:'' }}
          </el-descriptions-item>
        </el-descriptions> -->


        <!-- 震动 -->
        <!-- <el-descriptions :column="1" class="w-[25%]">
          <el-descriptions-item label="震动位移" label-class-name="text-[rgba(0, 0, 0, 0.60)]" content-class-name="text-[#000000]">
            {{ overallSafety.shakeOffset }}{{ overallSafety.shakeOffset!=='--'?overallSafety.unit:'' }} 
            {{ overallSafety.shakeOffset }}{{ overallSafety.shakeOffset!=='--'? 'mm/s ':'' }}
          </el-descriptions-item>
        </el-descriptions> -->

        <!-- 状态 -->
        <!-- <el-descriptions :column="2" class="w-[50%]">
          <el-descriptions-item v-for="item in safeStatusList" :key="item.key" :label="item.label" label-class-name="text-[rgba(0, 0, 0, 0.60)]" :content-class-name="item.isStatus&&['1','0'].includes(overallSafety[item.key])?(overallSafety[item.key]==='0'?'text-[#52C41A]':'text-[#FF4D4F]'):'text-[#000000]'">
            {{ (item.statusObj?item.statusObj[overallSafety[item.key]]:overallSafety[item.key])||'--' }}
          </el-descriptions-item>
        </el-descriptions> -->
      </div>
    </div>
  </div>
</template>

<script>
import EquipmentItem from './equipmentItem.vue'
import {dynamicList,indoorList,outdoorList,safeList} from './config.js'
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
      safeList,
      timer:null,
      overallEnv:{},//动环监控系统
      innerEnv:{},//室内环境监控
      outerEnv:{},//室内环境监控
      overallSafety:{},//安环监控系统
      airConditionList:[],//空调列表
      doorList:[],//门禁列表
    }
  },
  mounted() {
    this.getList()
    this.getAirCondition()
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