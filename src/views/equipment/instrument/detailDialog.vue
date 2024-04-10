<template>
  <el-dialog
    width="35%"
    :visible="isShow"
    title="仪器详情"
    :destroy-on-close="true"
    @close="closeDialog()"
  >
    <el-scrollbar class="h-500px">
      <div class="container">
        <div class="title">
          基础信息
        </div>
        <el-descriptions :column="1" content-class-name="font-bold">
          <el-descriptions-item label="仪器名称">
            {{ record.instrumentName }}
          </el-descriptions-item>
          <el-descriptions-item label="仪器编号">
            {{ record.instrumentCode }}
          </el-descriptions-item>
          <el-descriptions-item label="仪器类型">
            {{ record.instrumentType }}
          </el-descriptions-item>
          <el-descriptions-item label="仪器型号">
            {{ record.instrumentMode }}
          </el-descriptions-item>
          <el-descriptions-item label="状态">
            {{ record.instrumentState == 0 ? '离线' : record.instrumentState == 1 ? '在线' :
              record.instrumentState == 2 ? '告警' : record.instrumentState == 0 ? '故障' : '--' }}
          </el-descriptions-item>
          <el-descriptions-item label="功能说明">
            {{ record.descInChinese }}
          </el-descriptions-item>
          <el-descriptions-item label="创建人">
            {{ record.gmtCreatorName }}
          </el-descriptions-item>
          <el-descriptions-item label="创建时间">
            {{ record.gmtCreate }}
          </el-descriptions-item>
          <el-descriptions-item label="更新人">
            {{ record.gmtModifierName }}
          </el-descriptions-item>
          <el-descriptions-item label="更新时间">
            {{ record.gmtModified }}
          </el-descriptions-item>
        </el-descriptions>
        <div class="title">
          图片
        </div>
        <div class="flex flex-wrap justify-around">
          <div
            v-for="item in record.imgList"
            :key="item.url"
            class="w-200px mb-16px"
          >
            <el-image autoplay :src="item.url" />
            <div class="text-black">
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="title">
          附件
        </div>
        <div v-if="isShowFileList">
          <FileItem v-for="item in record.fileList" :key="item" :file="item" />
        </div>
      </div>
    </el-scrollbar>
    <template #footer>
      <el-button class="cancelButton" size="mini" @click="isShow = false">
        关闭
      </el-button>
    </template>
  </el-dialog>
</template>
<script>
import FileItem from "@/components/FileItem.vue";
import { detail } from "@/api/interface/instrument";
export default {
  components: {
    FileItem,
  },
  data() {
    return {
      isShowFileList:false,
      isShow: false,
      record: {
        imgList: [
          {
            url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            name: "采集照片A",
            date: "2023-01-23 15:43",
          },
          {
            url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            name: "采集照片B",
            date: "2023-01-23 15:43",
          },
        ],
        fileList: [
          "https://fuss10.elemecdn.com/e/5d/变电站远程智能巡视系统介绍.pdf",
          "https://fuss10.elemecdn.com/e/5d/集控系统产品介绍.docx",
          "https://fuss10.elemecdn.com/e/5d/集控系统产品介绍.doc",
          "https://fuss10.elemecdn.com/e/5d/集控系统产品介绍.pptx",
          "https://fuss10.elemecdn.com/e/5d/集控系统产品介绍.xlsx",
        ],
      },
    };
  },
  methods: {
    openDialog(id) {
      detail(id).then((res) => {
        this.record = res.data;
        this.record.fileList = res.data.fileUrl.split(",");
        this.isShowFileList = res.data.fileUrl === '' ? false : true
        let imgList = res.data.picUrl.split(",");
        this.record.imgList = imgList.map((item) => {
          return { url: item };
        });
      });
      this.isShow = true;
    },
    closeDialog() {
      this.isShow = false;
    },
    submit() {},
  },
};
</script>
<style lang="scss" scoped></style>
