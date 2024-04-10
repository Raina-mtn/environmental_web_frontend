<template>
  <div class="bg-[#F6F6F6] w-full h-full px-16px py-21px text-14px">
    <div class="font-bold mb-20px">
      {{ title }}
    </div>
    <!-- 空调 -->
    <el-form v-if="type==='airCondition'" ref="form" :model="formData" label-width="80px">
      <el-form-item label="远程开关">
        <el-switch v-model="formData.openFlag" @change="setAirCondition(true)" />{{ formData.openFlag?'开':'关' }}
      </el-form-item>
      <el-form-item label="模式设置" size="small">
        <el-radio-group v-model="formData.switchMode" :disabled="!formData.openFlag" @change="setAirCondition(false)">
          <el-radio-button label="1">
            制热
          </el-radio-button>
          <el-radio-button label="0">
            制冷
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="温度设置">
        <el-select v-model="formData.setTemp" placeholder="请选择" size="small" class="!w-1/2" :disabled="!formData.openFlag" @change="setAirCondition(false)">
          <el-option
            v-for="item in generateNum(16,30)"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select><span> °C</span>
      </el-form-item>
    </el-form>
    <!-- 门禁 -->
    <el-form v-if="type==='accessDoor'" ref="form" label-width="80px">
      <el-form-item label="远程开门">
        <el-button type="primary" size="small" @click="setDoor">
          开启
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {apiSetAirCondition,apiSetDoor} from '@/api/interface/equipment-dynamic'
export default {
  props:{
    title:{
      type:String,
      default:''
    },
    type:{
      type:String,
      default:''
    },
    info:{
      type: Object,
      default: () => null
    },
  },
  computed:{
    formData(){
      return this.info
    }
  },
  methods: {
    // 生成16-30数组
    generateNum(start,end) {
      const arr = []
      for (let index = start; index <= end; index++) {
        arr.push(index)
      }
      return arr
    },
    //空调-下发命令
    async setAirCondition(isSwitch){
      const {openFlag,instrumentCode} = this.formData
      try {
        console.log('isSwitch :>> ', isSwitch);
        await apiSetAirCondition(isSwitch?{openFlag,instrumentCode}:this.formData)
        this.$message.success('命令下发成功！')
      } catch (error) {
        console.log('error :>> ', error);
      }
    },
    //门禁-下发命令
    async setDoor(){
      try {
        await apiSetDoor(this.formData)
        this.$message.success('命令下发成功！')
      } catch (error) {
        console.log('error :>> ', error);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.el-form-item{
  margin-bottom: 0;
}
</style>