<template>
  <el-dialog width="35%" :visible="isShow" title="入侵详情" :destroy-on-close="true" @close="closeDialog()">
    <div class="container">
      <div class="title">
        入侵信息
      </div>
      <el-descriptions :column="2" content-class-name="font-bold">
        <el-descriptions-item label="预警设备">
          {{ record.equipmentName }}
        </el-descriptions-item>
        <el-descriptions-item label="开始时间">
          {{ record.intrudeTimeBegin }}
        </el-descriptions-item>
        <!-- <el-descriptions-item label="结束时间">
          {{ record.intrudeTimeEnd }}
        </el-descriptions-item> -->
        <el-descriptions-item label="内容说明">
          {{ record.alarmContent }}
        </el-descriptions-item>
        <el-descriptions-item label="结果">
          {{ record.result==='ERROR'?'异常':'正常' }}
        </el-descriptions-item>
        <el-descriptions-item label="预警图片">
          <el-image
            style="width: 100px; height: 100px"
            :src="record.resource"
            fit="fit"
            :preview-src-list="srcList"
          />
        </el-descriptions-item>
      </el-descriptions>
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
      srcList:[]
    }
  },
  methods: {
    openDialog(record){
      this.record = record
      this.srcList = [record.resource]
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