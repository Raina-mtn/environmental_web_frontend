<template>
  <el-dialog width="35%" :visible="isShow" title="运维详情" :destroy-on-close="true" @close="closeDialog()">
    <div class="container">
      <div class="title">
        运维信息
      </div>
      <el-descriptions :column="2" content-class-name="font-bold">
        <el-descriptions-item label="运维编号">
          {{ record.code }}
        </el-descriptions-item>
        <el-descriptions-item label="运维名称">
          {{ record.title }}
        </el-descriptions-item>
        <el-descriptions-item label="运维人员">
          {{ record.operator }}
        </el-descriptions-item>
        <el-descriptions-item label="工作描述">
          {{ record.content }}
        </el-descriptions-item>
        <el-descriptions-item label="运维开始时间">
          {{ record.startTime }}
        </el-descriptions-item>
        <el-descriptions-item label="运维结束时间">
          {{ record.endTime }}
        </el-descriptions-item>
        <el-descriptions-item label="运维分析结果">
          <el-tag size="small" :type="record.analysisResult==='NORMAL'?'success':'danger'">
            {{ isOrNotNormalObj[record.analysisResult] }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="预警分析">
          {{ record.warningAnalysis }}
        </el-descriptions-item>
      </el-descriptions>
      <div class="title">
        运维视频
      </div>
      <div class="flex flex-wrap justify-around">
        <div v-for="item in imgList" :key="item.url" class="w-200px mb-16px">
          <video autoplay :src="item.url" :controls="true" />
          <div class="text-black">
            {{ item.name }} {{ item.date }}
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <el-button class="cancelButton" size="mini" @click="isShow = false">
        关闭
      </el-button>
    </template>
  </el-dialog>
</template>
<script>
import {isOrNotNormalObj} from '@/utils/config'
export default {
  data() {
    return {
      isOrNotNormalObj,
      isShow:false,
      imgList:[
        {
          url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          name:'采集照片A',
          date:'2023-01-23 15:43'
        },
        {
          url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          name:'采集照片B',
          date:'2023-01-23 15:43'
        },
        {
          url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          name:'采集照片A',
          date:'2023-01-23 15:43'
        },
        {
          url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          name:'采集照片B',
          date:'2023-01-23 15:43'
        },
      ],
      record:{},
    }
  },
  methods: {
    openDialog(record){
      this.record = record
      this.isShow = true
    },
    closeDialog(){
      this.isShow = false
    },
    submit(){

    },
  }
}
</script>
<style lang="scss" scoped>
</style>