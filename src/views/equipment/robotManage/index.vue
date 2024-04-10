<template>
  <div class="wrapper h-full">
    <div class="p-20px bg-white h-full">
      <div class="title">
        机器人信息

        <el-button
          class="float-right mb-16px"
          size="mini"
          @click="goBack"
        >
          返回
        </el-button>
      </div>
      <el-descriptions
        :content-style="{ 'font-weight': 'bold' }"
        :label-style="{ width: '120px' }"
        :column="3"
        :border="true"
      >
        <el-descriptions-item label="机器人名称">
          {{ robot.equipmentName ||'--' }}
        </el-descriptions-item>
        <el-descriptions-item label="机器人类型">
          {{ robot.equipmentType ||'--' }}
        </el-descriptions-item>
        <el-descriptions-item label="机器人编号">
          {{ robot.equipmentCode ||'--' }}
        </el-descriptions-item>
        <el-descriptions-item label="机器人型号">
          {{ robot.equipmentMode ||'--' }}
        </el-descriptions-item>
        <el-descriptions-item label="电量">
          {{ robot.battery||'--' }}
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag size="small" :type="robot.connectState? 'success' : 'danger'">
            {{ robot.connectState?'在线':'离线' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="是否充电">
          {{ robot.chargeState?'是':'否' }}
        </el-descriptions-item>
        <el-descriptions-item label="创建人">
          {{ robot.gmtCreatorName || '--' }}
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">
          {{ robot.gmtCreate || '--' }}
        </el-descriptions-item>
        <el-descriptions-item label="更新时间">
          {{ robot.gmtModified || '--' }}
        </el-descriptions-item>
        <el-descriptions-item label="功能说明" :span="2" content-class-name="w-600px">
          {{ robot.descInChinese || '--' }}
        </el-descriptions-item>
        <el-descriptions-item label="机器人图片">
          <el-image
            v-if="robot.url"
            style="width: 100px; height: 100px"
            :src="robot.url"
            fit="fill"
          />
          <span v-else>--</span>
        </el-descriptions-item>
      </el-descriptions>
      <edit-dialog ref="editDialog" @refresh="getList" />
    </div>
  </div>
</template>

<script>
import {robotDetail} from '@/api/interface/equipment'
import { isOnlineObj } from "@/utils/config";
import editDialog from "./editDialog.vue";
export default {
  components: {
    editDialog,
  },
  data() {
    return {
      isOnlineObj,
      robot:{},
      srcList:[require('@/assets/images/robot.png')]
    };
  },
  computed:{
    stationId(){
      return this.$store.state.station.station.id
    }
  },
  watch:{
    stationId(){
      this.getList()
    }
  },
  mounted(){
    this.getList()
  },
  methods:{
    getList(){
      robotDetail({ equipmentId: this.$route.query.id }).then(res=>{
        this.robot = res.data
      })
    },

    goBack () {
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  background-color: #fff;
}
</style>
