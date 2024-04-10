<template>
  <div
    v-if="dialogShow"
    class="station-detail w-1/4"
  >
    <h1 class="detail-title flex items-center justify-between">
      <div>
        <i class="title-rect" />
        <i class="iconfont icon-jiantou" />{{ staionInfo.station }}
      </div>
      <i class="iconfont icon-guanbi" @click="dialogShow = false" />
    </h1>
    <section class="p-6 items-center">
      <p>
        <span>告警描述</span>
        <span>水质监测结果：异常</span>
      </p>
    </section>
    <section class="p-6 items-center">
      <header class="warn-title">
        问题溯源
      </header>
      <p>
        <span>所属分类</span>
        <span>原因分析</span>
      </p>
      <ul>
        <li><span>生物污水</span><span>某些工业废水污染水体后，带入一些病原微生物</span></li>
        <li><span>生活用水</span><span>城镇生活用水（含服务业、餐饮业等用水）排入水体</span></li>
        <li><span>农药残留</span><span>部分农药直接或间接残存于土壤和水体中</span></li>
      </ul>
    </section>
    <section class="p-6 items-center progress-list">
      <header class="warn-title">
        事件进度
      </header>
      <p>
        <span>事件名称</span>
        <span>事件进度</span>
        <span>负责人</span>
        <span>处理时间</span>
      </p>
      <ul>
        <li><span>水质提升管理方案</span><span class="status status__done">已完成</span><span>桂兰</span><span>2023-08-23 12:23</span></li>
        <li><span>水质提升工程实施</span><span class="status status__doing">进行中</span><span>黄晓言</span><span>2023-08-11 12:23</span></li>
        <li><span>水质提升检测验证</span><span class="status status__todo">待处理</span><span>胡林</span><span>2023-08-10 12:23</span></li>
      </ul>
    </section>
    <el-button @click="gotoStaionPage">
      <i class="iconfont icon-zhandian" />水质监测站
    </el-button>
  </div>
</template>
<script>
import { apiGetCompreStationInfo } from "@/api/interface/dashboard";
import { waterConfig, warnTypeObj } from "../../config";
export default {
  data() {
    return {
      dialogShow: false,
      staionInfo: {},
      warnTypeObj,
      position: [0, 0],
      stationId: "",
      camera: {}
    };
  },
  methods: {
    async show(item) {
      this.dialogShow = true;
      this.staionInfo = {...item}
      console.log(item);
    },
    gotoStaionPage() {
      console.log(11);
      this.$router.push({
        path: "/dashboard",
        query: { stationId: this.stationId },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
$white-light-color: #e2edff;
.white-light-text {
  color: $white-light-color;
}
.station-detail {
  background: linear-gradient(
    180deg,
    rgba(60, 110, 175, 0.86) 0%,
    rgba(13, 47, 88, 0.95) 100%
  );
  position: absolute;
  width: 480px;
z-index: 999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .detail-title {
    color: #fff;
    height: 32px;
    line-height: 32px;
    position: relative;
    font-size: 22px;
    &::after {
      position: absolute;
      content: "";
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(
        90deg,
        rgba(117, 247, 253, 0.57) 0%,
        rgba(41, 148, 252, 0) 100%
      );
    }
    .title-rect {
      display: inline-block;
      width: 2px;
      height: 16px;
      background: linear-gradient(90deg, #11b9fd 0%, #0783fa 100%);
    }
    .icon-jiantou {
      color: #ffdead;
      margin: 0 1rem;
    }
    .icon-guanbi {
      background-image: -webkit-linear-gradient(bottom, #ebf2fc, #48a0fd);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      cursor: pointer;
      margin-right: 1rem;
    }
  }
  p,ul li{
    background: rgba(16,46,86,0.5);
    height: 3.5rem;
    line-height: 3.5rem;
    color: $white-light-color;
    padding: 0 6px;
    span{
      &:first-child{
        margin-right: 10px;
      }
    }
  }
  ul{
    li{
      background: rgba(16,46,86,0.25);
    }
  }
  .progress-list span{
    display: inline-block;
    width: 20%;
    position: relative;
    &:first-child, &:last-child{
      width: 30%;
      margin: 0;
    }
    &.status{
      text-indent: 1.5rem;
      &:after{
        position: absolute;
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      &__done{
        &:after{
          background:#63E7B7;
        }
      }
      &__doing{
        &:after{
          background:#FFC62E;
        }
      }
      &__todo{
        &:after{
          background:#148FF5;
        }
      }
    }
  }
  .warn-title {
    position: relative;
    color: $white-light-color;
    font-size: 1.5rem;
    padding-left: 1rem;
    margin-bottom: 1rem;
    &::after {
      position: absolute;
      content: "";
      left: 0;
      top: 5px;
      width: 2px;
      height: 16px;
      background: #258bff;
    }
  }
  .el-button {
    background: linear-gradient(
      180deg,
      rgba(19, 47, 95, 0.7) 0%,
      rgba(80, 140, 245, 0.7) 100%
    );
    color: $white-light-color;
    border: 1px solid #148ff5;
    float: right;
    margin-right: 1.5rem;
    margin-bottom: 1.5rem;
    .icon-zhandian {
      background-image: -webkit-linear-gradient(bottom, #48a0fd, #ebf2fc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-right: 1rem;
    }
  }
}
</style>
