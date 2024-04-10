<!-- 静态页面 -->
<template>
  <div
    v-show="dialogShow"
    class="station-detail w-1/4"
    :style="{ left: position[0] + 480 + 'px', top: position[1] + 'px' }"
  >
    <h1 class="detail-title flex items-center justify-between">
      <div>
        <i class="title-rect" />
        <i class="iconfont icon-jiantou" />{{ staionInfo.stationName || "" }}
      </div>
      <i class="iconfont icon-guanbi" @click="dialogShow = false" />
    </h1>
    <section class="flex p-6 items-center">
      <div class="h-[10rem] w-[14rem]">
        <el-image :src="require('./gas.jpeg')" :preview-src-list="[require('./gas.jpeg')]" />
      </div>
      <div class="ml-4 flex-1">
        <p class="white-light-text">
          <label>编号:</label>{{ staionInfo.stationCode || "" }}
        </p>
        <p class="white-light-text">
          <label>经度:</label>{{ staionInfo.longitude || "" }}
          <label>纬度:</label>{{ staionInfo.latitude || "" }}
        </p>
        <p class="white-light-text">
          <!-- <label>所属区域:</label>{{ staionInfo.district || "" }} -->
          所属区域：浙江省杭州市西湖区
        </p>
        <p class="white-light-text">
          <!-- <label>详细地址:</label>{{ staionInfo.address || "" }} -->
          详细地址：西湖区天目山路518号
        </p>
      </div>
    </section>
    <section class="px-6">
      <el-descriptions :column="2">
        <el-descriptions-item
          v-for="item in infoConfig"
          :key="item.key"
          v-bind="item"
        >
          {{ monitorData[item.key] }} {{ item.unit }}
        </el-descriptions-item>
      </el-descriptions>
    </section>
    <section class="warn-list mt-4 px-6">
      <p class="warn-title">
        预警信息
      </p>
      <div class="content">
        <p v-for="(item, index) in warnList" :key="index">
          <span>{{ item.warningTime }}</span> <span>{{ warnTypeObj[item.warningType] || "" }}</span> <span>{{ item.detail }}</span>
        </p>
        <span v-show="warnList.length === 0">暂无信息</span>
      </div>
    </section>
    <div class="mt-4" />
    <!-- <el-button @click="gotoStaionPage">
      <i class="iconfont icon-zhandian" />气象监测站
    </el-button> -->
  </div>
</template>
<script>
import { apiGetCompreStationInfo } from "@/api/interface/dashboard";
import {  warnTypeObj } from "../../config";
export default {
  data() {
    return {
      infoConfig: [
        { label: "更新时间", key: "monitorDateTime"},
        { label: "水质等级", key: "judgeLevel" },
        { label: "二氧化硫(SO2)", key: "SO2", unit: "ug/m3" },
        { label: "二氧化氮(NO2)", key: "NO2", unit: "ug/m3" },
        { label: "PM10", key: "PM10", unit: "ug/m3" },
        { label: "PM2.5", key: "PM2.5", unit: "ug/m3" },
        { label: "一氧化碳(CO)", key: "CO", unit: "mg/m3" },
        { label: "臭氧(O3)", key: "O3", unit: "ug/m3" },
      ],
      warnList: [
        {
          warningTime:'2023-01-21 12:32',
          warningType:'INTRUDER',
          detail:'二氧化硫(NO2)：90ug/m3',
        },
        {
          warningTime:'2023-01-21 12:32',
          warningType:'PATROL',
          detail:'检测到人员入侵结果：异常',
        },
      ],
      dialogShow: false,
      staionInfo: {},
      monitorData: {
        monitorDateTime:'2023-01-21 12:3',
        judgeLevel:'Ⅱ类',
        'SO2':'110',
        'NO2':'60',
        'PM10':'60',
        'PM2.5':'65',
        'CO':'4',
        'O3':'60',
      },
      warnTypeObj,
      position: [0, 0],
      stationId: "",
      camera: {}
    };
  },
  methods: {
    async show(id, position) {
      this.dialogShow = true;
      this.position = position;
      this.stationId = id;
      // this.staionInfo = station; // 站点信息
      const stationData = await apiGetCompreStationInfo({ stationId: id });
      const { station} =
        stationData.data;
      this.staionInfo = station; // 站点信息
      // this.warningList = warningList; // 报警信息
      // const { dataJson, monitorDateTime, judgeLevel } = lastMonitorData;
      // let formatData = {};
      // if (dataJson && typeof dataJson === "string") {
      //   formatData = JSON.parse(dataJson);
      // }
      // this.monitorData = {
      //   // 数据
      //   ...formatData,
      //   monitorDateTime,
      //   judgeLevel: waterConfig[judgeLevel - 1],
      // };
      // this.camera = camera
    },
    gotoStaionPage() {
      console.log(11);
      console.log('this.stationId :>> ', this.stationId);
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
  ::v-deep {
    .el-descriptions__body {
      color: $white-light-color;
      background: rgba(16, 46, 86, 0.5);
      padding: 1rem;
    }
    .el-descriptions :not(.is-bordered) .el-descriptions-item__cell {
      padding-bottom: 2px;
    }
  }
  .warn-list {
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
    .content {
      background: rgba(16, 46, 86, 0.5);
      color: $white-light-color;
      padding: 1rem;
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