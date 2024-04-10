<template>
  <div class="pr-8 flex flex-col justify-between">
    <!-- 实时监测 -->
    <!-- <section class="1/2">
      <Title :name="'实时监测'" />
      <div class="flex flex-wrap">
        <div v-for="item in monitorConfig" :key="item.key" class="monitor-item flex items-center my-4 w-1/2">
          <div class="mr-2">
            <img :src="item.img" class="w-16">
          </div>
          <div class="flex-1">
            <p :style="{ fontSize: item.name.length > 5 ? '1.5rem' : '1.5rem' }">
              {{ item.name }}
            </p>
            <p>
              <span style="font-size: 1.5rem;">{{ item.defaultValue ? item.defaultValue : monitorData[item.key] || 0
              }}</span>{{ item.unit || "" }}
            </p>
          </div>
        </div>
      </div>
    </section> -->
    <!-- 设备预警（健康评分） -->
    <section class="1/2 relative">
      <Title :name="'设备预警（健康评分）'" />
      <div class="el-choose">
        <el-select v-model="chooseList" multiple collapse-tags clearable placeholder="请选择" size="mini" style="width: 160px;">
          <el-option v-for="item in dictList" :key="item.key" :label="item.value" :value="item.key" />
        </el-select>
      </div>
      <div style="height: 200px;" class="mt-8px pr-2">
        <Chart :option="healthOption" />
      </div>
    </section>
    <!-- 关键监测因子趋势图 -->
    <section class="h-[25rem] ">
      <Title :name="'关键监测因子趋势图'" />
      <div style="height: calc(100% - 24px)" class="mt-8px pr-2">
        <Chart :option="lineOption" />
      </div>
    </section>
    <section class="h-4/12">
      <Title :name="'智能预警研判'" />
      <div class="flex">
        <div v-for="item in preWarnConfig" :key="item.key" class="monitor-item flex items-center my-6 w-1/2">
          <div class="mr-4">
            <img :src="item.img" class="w-20">
          </div>
          <div class="flex-1">
            <p>{{ item.name }}</p>
            <p>
              <CountTo :end-val="perWarnData[item.key] || 0" class="text-link" @click="goToPage(item.key)" />{{ item.unit
                || "" }}
            </p>
          </div>
        </div>
      </div>
      <div v-for="(item, index) in intruData" :key="index" class="warn-item flex justify-between items-center">
        <div class="left">
          <h3>人员入侵预警</h3>
          <p>预警设备：{{ item.equipmentName }}</p>
          <p>预警时间：{{ item.intrudeTimeBegin }}</p>
          <p>预警内容：{{ item.alarmContent }}</p>
        </div>
        <el-image :src="item.resource" :preview-src-list="[item.resource]" style="width: 11rem; height: 7rem" />
      </div>
      <NoData v-show="intruData.length === 0" class="w-146px h-126px ml-148px" />
    </section>
  </div>
</template>
<script>
import Title from "./component/title.vue";
import Chart from "@/components/Chart.vue";
import { monitorConfig, preWarnConfig } from "./config";
import { factorLineOption, factorConfig, barOption } from "./chart.config";
import { getHistory } from "@/api/interface/mock";
import dayjs from 'dayjs';
import CountTo from '@/components/CounTo/CountTo.vue';
import NoData from "../../../components/NoData.vue";
import { apiGetHealthData, apiGetHealthDict } from '@/api/interface/dashboard.js'
export default {
  components: {
    Title,
    Chart,
    CountTo,
    NoData
  },
  props: {
    stationId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      monitorConfig,
      preWarnConfig,
      monitorData: {},
      perWarnData: {},
      factorLineData: {
        xData: [],
        sData: []
      },
      intruData: [{}],
      lineOption: {},
      healthOption: {},
      scoreLists:[],
      // 健康评分数据
      healthList: [],
      // 字典列表
      dictList: [],
      // 已选择数据
      chooseList: [],
      requireInterval: null
    };
  },
  computed: {
    // factorLineOption() {
    //   return this.factorLineData.xData ? factorLineOption(this.factorLineData) : {}
    // }
  },
  watch: {
    'factorLineData.xData': {
      deep: true,
      handler (val, oldVal) {
        if (val) {
          if (val.toString() !== oldVal.toString()) {
            this.lineOption = factorLineOption(this.factorLineData)
          }
        }
      }
    },
    chooseList: {
      deep: true,
      handler (val, oldVal) {
        const xData = []
        const yData = []
        this.dictList.forEach(item => {
          if (val.includes(item.key)) {
            xData.push(item.value)
          }
        })
        this.healthList.forEach(item => {
          if (val.includes(item.type)) {
            yData.push(item.value)
          }
        })
        this.healthOption = barOption(xData, yData)
      }
    }
  },

  async mounted() {
    // this.getHistoryData() // 公司使用的内部接口测试数据，现场不需要调用
    await this.onGetDataDict()
    await this.onGetDataHealth()
    this.requireInterval = setInterval(() => {
      if (this.stationId) {
        this.onGetDataDict()
        this.onGetDataHealth()
      }
    }, 1000 * 3600 * 24)
  },

  beforeDestroy() {
    clearInterval(this.requireInterval)
    this.requireInterval = null
  },

  methods: {
    getHistoryData () {
      getHistory({ stationId: this.$route.query.stationId }).then(res => {
        this.setChartData(res.data)
        const lastMonitorData = res.data[0]
        const { dataJson } = lastMonitorData || {}
        if (dataJson && typeof dataJson === 'string') {
          const formatData = JSON.parse(dataJson)
          this.setMonitorData(formatData)
        }
      })
    },
    // 评分数据
    async onGetDataHealth () {
      await apiGetHealthData({ stationId: this.$route.query.stationId }).then(res => {
        this.healthList = res.data
        const xData = this.dictList.map(item => {
          return item.value
        })
        const yData = res.data.map(item => {
          return item.value
        })
        this.healthOption = barOption(xData, yData)
      })
    },
    // 评分数据字典
    async onGetDataDict () {
      await apiGetHealthDict({ stationId: this.$route.query.stationId }).then(res => {
        this.dictList = res.data
        this.chooseList = res.data.map(item => {
          return item.key
        })
      })
    },
    setMonitorData(data) {
      this.monitorData = { ...data }
    },
    setWarnData(data) {
      this.perWarnData.totalPatrolDefectCount = data
    },
    // 获取后几天数据
    getSevenDate(day,aa){
      var date2 = new Date(day)
      date2.setDate(date2.getDate()+aa)
      // var time2 = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate()
      let y = date2.getFullYear()
      let m = date2.getMonth() + 1
      let d = date2.getDate()
      var time2 = y+"-"+(m > 9 ? m : `0${m}`)+"-"+(d > 9 ? d : `0${d}`)
      return time2
    },
    // 随机获取7条数据
    getSevenNum(arr){
      const list = []
      // eslint-disable-next-line no-undef
      // for(let j = 0; j < 7; j++){
      //   var b= Math.floor(Math.random()*arr.length);
      //   list.push(arr[b])
      // }
      for(let j = 0; j < 4; j++){
        var b= arr[j * 2];
        if (b < 0) {
          b = -b
        }
        list.push(b)
      }

      return list
    },

    setChartData(data) {
      
      if (data && Array.isArray(data)) {
        const xData = data.map(v => dayjs(v.pointTime).format('YYYY-MM-DD')).sort((a, b) => {
          return dayjs(a).isBefore(dayjs(b)) ? -1 : 1
        }) // 排序
        const sData = Object.keys(factorConfig).map(key => {
          const name = factorConfig[key]
          const ydata = data.sort((a, b) => {   // data先根据pointTime排序
            return dayjs(a.pointTime).isBefore(dayjs(b.pointTime)) ? -1 : 1
          }).map(v => { //[{o:'1', ph: 2}]
            const { dataJson } = v // 线条的数据都在这里面，
            const formateData = dataJson || typeof dataJson === 'string' ? JSON.parse(dataJson) : {}
            return formateData[key] || 0
          })
          return { name, ydata }
        })
        let dateArray = []
        for(let i = 1; i < 5; i++){
          let day =this.getSevenDate(xData[xData.length - 1], i)
          dateArray.push(day)  //获取未来4天内的日期
        }
        const fetureData = []
        sData.forEach(item => {
          const nums = this.getSevenNum(item.ydata)
          const obj = {
            name: item.name,
            dotted: true,
            ydata: [...new Array(item.ydata.length - 1).fill('-'), item.ydata[item.ydata.length -1], ...nums]
          }
          fetureData.push(obj)
        })
        // console.log('打印数据-----:', this.factorLineData)
        this.factorLineData.xData = [...xData, ...dateArray]
        this.factorLineData.sData = [...sData, ...fetureData]
      }
    },
    setIntruData(res) {
      const { data, totalCount } = res
      this.intruData = data || []
      this.perWarnData.totalCount = totalCount
    },
    goToPage(key) {
      const path = key === 'totalCount' ? '/warning/invadeList' : '/resultList'
      this.$router.push({
        path,
        query: {
          beginTime: dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
          endTime: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
$light-color: #6bf2ff;
$white-light-color: #e2edff;

img {
  display: block;
}

.monitor-item {
  p {
    color: $white-light-color;
    font-size: 1.5rem;

    span {
      color: $light-color;
      font-size: 2rem;
    }

    .text-link {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}

.warn-item {
  background: rgba(86, 171, 255, 0.14);
  padding: 4px 10px;
  position: relative;
  margin-bottom: 8px;

  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg,
        rgba(107, 242, 255, 0.06) 0%,
        rgba(107, 242, 255, 0.3) 37%,
        rgba(107, 242, 255, 0.5) 49%,
        rgba(107, 242, 255, 0.3) 59%,
        rgba(107, 242, 255, 0.05) 100%);
    top: 0;
    left: 0;
  }

  h3 {
    color: $light-color;
    font-size: 1.5rem;
  }

  p {
    color: $white-light-color;
    line-height: 2rem;
    margin-top: 2px;
  }
}
.el-choose{
  position: absolute;
  top: 0px;
  right: 10px;
}
::v-deep .el-select {
  width: 180px;
  height: 32px;

  .el-input--mini .el-input__inner {
    border: 1px solid #4ea7f9;
    background: rgba(78, 167, 249, 0.3);
    border-radius: 0;
    color: #fff;
  }
}
</style>