<template>
  <el-dialog width="50%" top="5vh" :visible="isShow" title="运维详情" :destroy-on-close="true" @close="closeDialog()">
    <div class="title">
      运维信息
    </div>
    <el-descriptions :column="2" content-class-name="font-bold">
      <el-descriptions-item label="任务编号">
        {{ record.taskCode || '--' }}
      </el-descriptions-item>
      <el-descriptions-item label="任务名称">
        {{ record.taskName || '--' }}
      </el-descriptions-item>
      <el-descriptions-item label="执行类型">
        {{ record.executeTypeName || '--' }}
      </el-descriptions-item>
      <!-- <el-descriptions-item label="周期类型">
        {{ timeTypeObj[record.periodicType] || '--' }}
      </el-descriptions-item> -->
      <el-descriptions-item label="机器人">
        {{ record.equipmentName || '--' }}
      </el-descriptions-item>
      <el-descriptions-item label="运维类型">
        {{ record.omTypeName || '--' }}
      </el-descriptions-item>
      <el-descriptions-item label="运维名称">
        {{ record.omName || '--' }}
      </el-descriptions-item>
      <el-descriptions-item label="运维内容">
        {{ record.omContent || '--' }}
      </el-descriptions-item>
      <el-descriptions-item label="运维开始时间">
        {{ record.omStartTime || '--' }}
      </el-descriptions-item>
      <el-descriptions-item label="运维结束时间">
        {{ record.omEndTime || '--' }}
      </el-descriptions-item>
      <el-descriptions-item label="运维结果">
        <el-tag v-if="record.omResultName" size="small" :type="record.omResultName=== '正常' ? 'success':'danger'">
          {{ record.omResultName }}
        </el-tag>
        <span v-else>--</span>
      </el-descriptions-item>
    </el-descriptions>
    <div class="title">
      运维照片
    </div>
    <div class="flex flex-wrap">
      <template v-if="record.imageUrls && record.imageUrls.length > 0">
        <div v-for="(item, index) in record.imageUrls" :key="index" class="w-300px">
          <el-image
            class="h-200px w-300px"
            :src="item"
            :preview-src-list="record.imageUrls"
            fit="fill"
          />
        </div>
      </template>
      <div v-else>
        暂无照片
      </div>
    </div>
    <template #footer>
      <el-button size="mini" @click="isShow = false">
        关闭
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import {taskTypeObj,timeTypeObj,isOrNotNormalObj} from '@/utils/config'
import { apiGetDetail } from '@/api/interface/opex/record'
export default {
  data() {
    return {
      taskTypeObj,
      timeTypeObj,
      isOrNotNormalObj,
      isShow:false,
      imgList:[
        // {
        //   url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //   name:'采集照片A',
        //   date:'2023-01-23 15:43'
        // },
        // {
        //   url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //   name:'采集照片B',
        //   date:'2023-01-23 15:43'
        // },
        // {
        //   url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //   name:'采集照片A',
        //   date:'2023-01-23 15:43'
        // },
        // {
        //   url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //   name:'采集照片B',
        //   date:'2023-01-23 15:43'
        // },
      ],
      record:{},
      recordId: ''
    }
  },
  methods: {
    openDialog(id){
      this.recordId = id
      this.isShow = true
      this.onGetDetail(id)
    },
    closeDialog(){
      this.isShow = false
    },
    onGetDetail(id) {
      apiGetDetail(id).then(res => {
        this.record = res.data
      })
    },
  }
}
</script>
<style lang="scss" scoped>
</style>