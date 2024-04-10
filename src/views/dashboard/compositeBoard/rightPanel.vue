<template>
  <div class="flex flex-col justify-between">
    <!-- 水质监管 -->
    <section v-if="type==='WATER'" class="h-1/3 flex flex-col">
      <Title :name="'水质监管'" />
      <StationItem v-bind="station" class="mt-4" />
      <div class="flex-1 relative">
        <Chart v-if="type==='WATER'" :option="pieOption" />
        <div class="legend ">
          <!-- <p v-for="item in originWaterLevel.gradeStatList" :key="item.grade">
            <i :style="{height: `${(item.count / originWaterLevel.totalCount) * 100}px`}" />{{ waterConfig[item.grade - 1]
            }}<span>{{
              (item.count / originWaterLevel.totalCount) * 100 + "%"
            }}</span>
          </p> -->
          <p v-for="item in waterLevelPie" :key="item.grade">
            <i />
            {{ item.name }}
            <span>
              {{ (item.value / originWaterLevel.totalCount) * 100 + "%" }}
            </span>
          </p>
        </div>
      </div>
    </section>
    <!-- 空气质量监测 -->
    <section v-if="type==='GAS'" class="h-1/3 flex flex-col">
      <Title :name="'空气质量监测'" />
      <StationItem v-bind="gasStation" class="mt-4" />
      <div class="flex-1 relative">
        <Chart v-if="type==='GAS'" :option="pieGasOption" />
        <div class="gaslegend flex w-1/2 flex-wrap">
          <p v-for="(item,index) in gasLevelPie" :key="index" class="flex items-center w-1/2 mb-6 justify-between">
            <label class="flex items-center">
              <i class="w-8px h-8px block mr-2" :style="{background: gasColorList[index]}" />
              <span class="text-2xl">{{ item.name }}</span>
            </label>
            <span class="font-bold text-2xl mr-4" :style="{color: gasColorList[index]}">{{ item.value }}%</span>
          </p>
        </div>
      </div>
    </section>
    <!-- 水质监测趋势 -->
    <section v-show="type==='WATER'" class="flex-1 flex flex-col my-4">
      <Title :name="'水质监测趋势'" />
      <div class="flex-1">
        <Chart :option="lineOption" class=" !h-189px" />
      </div>
    </section>
    <!-- 空气质量监测趋势 -->
    <section v-show="type==='GAS'" class="flex-1 flex flex-col my-4">
      <Title :name="'空气质量监测趋势'" />
      <div class="flex-1  h-180px">
        <Chart :option="lineGasOption" class=" !h-189px" />
      </div>
    </section>
    <!-- 智能预警研判 -->
    <section class="h-[30rem] flex flex-col ">
      <Title :name="'智能预警研判'" />
      <div class="flex pt-4">
        <Item
          v-for="item in warnConfig"
          :key="item.key"
          v-bind="item"
          class="flex-1"
          :value="warnValue[item.key]"
        />
      </div>
      <div class="flex-1 mt-4">
        <Calendar />
      </div>
    </section>
  </div>
</template>
<script>
import Title from "../stationBoard/component/title.vue";
import StationItem from "./component/StationItem.vue";
import Item from "../component/Item.vue";
import Chart from "@/components/Chart.vue";
import Calendar from "./component/Calendar.vue";
import {
  pieOptionMulti,
  pieOptionMultiGas,
  waterLevelLineOption,
  gasLevelLineOption,
  gasColorList
} from "./js/chart.config";
import { warnConfig } from "./js/config";
import dayjs from "dayjs";
import { waterConfig } from "../config";
export default {
  components: {
    Title,
    StationItem,
    Chart,
    Item,
    Calendar,
  },
  data() {
    return {
      gasColorList,
      waterConfig,
      station: {
        img: require("@/assets/images/compositeBoard/icon_station.png"),
        name: "水质监测站",
        value: 0,
        unit: "个",
      },
      gasStation: {
        img: require("@/assets/images/compositeBoard/icon_gas.png"),
        name: "空气质量监测站",
        value: 1,
        unit: "个",
      },
      waterLevelPie: [],
      gasLevelPie: [],
      waterLevelLine: {},
      gasLevelLine: {},
      warnConfig,
      heatMapData: {},
      warnValue: {},
      originWaterLevel: {
        gradeStatList: [],
      },
      type:'WATER'
    };
  },
  computed: {
    pieOption() {
      return pieOptionMulti(this.waterLevelPie);
    },
    pieGasOption() {
      return pieOptionMultiGas(this.gasLevelPie);
    },
    lineOption() {
      return this.waterLevelLine.xData
        ? waterLevelLineOption(this.waterLevelLine)
        : {};
    },
    lineGasOption() {
      return this.gasLevelLine.xData ? gasLevelLineOption(this.gasLevelLine) : {}
    },
  },
  methods: {
    setData({ waterCount, monitorDataStat, warningDayStat,type }) {
      this.type = type
      if(type==='WATER'){
        this.station.value = waterCount;
        const { gradeStatList, periodStat } = monitorDataStat || {};
        const totalCount = gradeStatList.reduce((preV, curV, curI) => {
          return preV + curV.count;
        }, 0);
        this.originWaterLevel = {
          gradeStatList: gradeStatList.slice(0, 3),
          totalCount,
        };
        console.log('打印数据:', this.originWaterLevel)
        this.waterLevelPie = [
          {
            name: "Ⅰ-Ⅲ类",
            value:
            gradeStatList[0].count +
            gradeStatList[1].count +
            gradeStatList[2].count,
          },
          { name: "Ⅳ类", value: gradeStatList[3].count },
          { name: "Ⅴ类", value: gradeStatList[4].count },
        ];
        // 水质监测趋势
        const { statDateList, level123, level4, level5 } = periodStat;
        this.waterLevelLine = {
          xData: statDateList.map((v) => dayjs(v).format("MM-DD")),
          sData: [
            { name: "Ⅰ-Ⅲ类", ydata: level123 },
            { name: "Ⅳ类", ydata: level4 },
            { name: "Ⅴ类", ydata: level5 },
          ],
        };
      }else{
        this.gasLevelPie = [
          { name: "优",value:13},
          { name: "良", value: 22 },
          { name: "轻度污染", value: 33 },
          { name: "中度污染", value: 12 },
          { name: "重度污染", value: 5 },
          { name: "严重污染", value: 5 },
        ]
        this.gasLevelLine = {
          xData: ['2月','3月','4月','5月','6月','7月'],
          sData: [
            { name: "优", ydata: [65,14,23,85,45,12] },
            { name: "良", ydata: [24,45,10,74,10,34] },
            { name: "轻度污染", ydata: [24,52,35,75,10,45] },
            { name: "中度污染", ydata: [10,24,34,37,10,41] },
            { name: "重度污染", ydata: [72,14,34,10,34,24] },
            { name: "严重污染", ydata: [10,24,76,76,101,11] },
          ]
        }
      }
      
    },
    setWarnData(value) {
      this.warnValue = { ...value };
    },
  },
};
</script>
<style scoped lang="scss">
.gaslegend{
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #D0DEEE;
  width: 63%;
  p{
    border-bottom:  1px solid rgba(212,222,236,0.2);
    padding-bottom: 4px;
  }
}
.legend {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #D0DEEE;
  span{
    margin-left: 15px;
  }
  p{
    &:first-child {
      i {
        background: #d4deec;
      }
    }
    &:nth-child(2) {
      i {
        background: #4ea7f9;
      }
    }
    &:nth-child(3) {
      i {
        background: #63e7b7;
      }
    }
  }
  i {
    display: inline-block;
    width: 1.5rem;
    margin-right: 4px;
    min-height: 10px;
  }
}
</style>