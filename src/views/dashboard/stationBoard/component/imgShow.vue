<template>
  <div v-if="isShow" class="detail" style="width: 600px;">
    <!-- <div class="relative">
      <img :src="url" alt="">
    </div> -->
    <div class="detail-header">
      运维详情
      <div class="close" @click="closeImg">
        <img src="../../../../assets/images/board/header-close.png" alt="">
      </div>
    </div>
    <div class="detail-content">
      <div class="title subtitle mb-16px">
        运维信息
      </div>
      <el-descriptions :column="2" content-class-name="font-bold">
        <el-descriptions-item label="任务名称">
          {{ record.taskName }}
        </el-descriptions-item>
        <el-descriptions-item label="任务类型">
          {{ record.taskTypeName }}
        </el-descriptions-item>
        <el-descriptions-item label="机器人">
          {{ record.robotName }}
        </el-descriptions-item>
        <el-descriptions-item label="点位">
          {{ record.spotName }}
        </el-descriptions-item>
        <el-descriptions-item label="运维项目">
          {{ record.omProjectTitle }}
        </el-descriptions-item>
        <el-descriptions-item label="运维内容">
          {{ record.omContent }}
        </el-descriptions-item>
        <el-descriptions-item label="运维开始时间">
          {{ record.startTime }}
        </el-descriptions-item>
        <el-descriptions-item label="运维结束时间">
          {{ record.endTime }}
        </el-descriptions-item>
        <el-descriptions-item v-if="record.statusName!=='正常' && (record.deviceId === '103' || record.deviceId === '104' || record.deviceId === '106' || record.deviceId === '107')" label="识别结果">
          {{ record.resultStr }}
        </el-descriptions-item>
        <el-descriptions-item v-if="record.deviceId === '102' || record.deviceId === '105'" label="比率">
          {{ JSON.parse(record.resultStr).diffRatio || '--' }}%
        </el-descriptions-item>
        <el-descriptions-item v-if="record.deviceId === '102' || record.deviceId === '105'" label="识别结果">
          {{ JSON.parse(record.resultStr).result || '--' }}
        </el-descriptions-item>
        <el-descriptions-item v-if="record.deviceId === '102' || record.deviceId === '105'" label="第三方监测值">
          {{ JSON.parse(record.resultStr).thirdResult || '--' }}
        </el-descriptions-item>
        <el-descriptions-item label="运维结果">
          <el-tag size="small" :type="record.taskResultName==='正常'?'success':'danger'">
            {{ record.taskResultName }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <div v-if="record.visibleImgPath" class="title subtitle mt-16px">
        运维照片
      </div>
      <div class="mt-16px">
        <el-image
          v-if="record.visibleImgPath"
          class="h-100px w-160px"
          :src="record.visibleImgPath"
          fit="fill"
          :preview-src-list="[record.visibleImgPath]"
        />
        <!-- <span v-else class="text-light-50" style="font-size: 14px;">暂无图片</span> -->
      </div>
    </div>
    <div class="w-full flex closebtn" @click="closeImg">
      关闭
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      record: "",
      isShow: false
    }
  },

  methods: {
    openImg(record) {
      this.isShow = true
      this.record = record
      console.log('打印数据:', record)
    },
    closeImg() {
      this.isShow = !this.isShow
    }
  }

}
</script>

<style lang="scss" scoped>
.detail {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(180deg, rgba(60,110,175,0.86) 0%, rgba(13,47,88,0.95) 100%);
  padding-bottom: 60px;
  &-header {
    position: relative;
    width: 100%;
    height: 32px;
    font-size: 22px;
    letter-spacing: 1px;
    color: #FFFFFF;
    background: url('../../../../assets/images/board/header_bg.png') no-repeat;
    background-size: 460px 32px;
    padding-left: 48px;

    .close {
      position: absolute;
      top: 7px;
      right: 24px;
      width: 18px;
      height: 18px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  &-content {
    padding: 24px;

    .subtitle {
      font-size: 16px;
      font-weight: 500;
      color: #E2EDFF;
    }
  }

  .closebtn {
    position: absolute;
    right: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 36px;
    background: linear-gradient(180deg, rgba(19,47,95,0.7) 0%, rgba(80,140,245,0.7) 100%);
    border-radius: 4px;
    border: 1px solid #148FF5;
    font-size: 16px;
    color: #E2EDFF;
    font-weight: 600;
    cursor: pointer;
  }

  ::v-deep .el-descriptions__body {
    background: none;
    color: #FFFFFF;
  }
}
</style>