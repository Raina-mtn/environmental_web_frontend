<template>
  <div class="flow-chart">
    <!-- 顶部信息块 -->
    <div class="flow-chart__header">
      <div class="fs flex items-center">
        <span class="inline-block w-1/2 flex items-center">
          <img src="../../../../assets/images/board/icon_temp.png" class="w-16px h-16px mr-4px">
          <span>室内温度：</span>
          <span>{{ vibeData.temperature || '--' }}</span>
        </span>
        <span class="inline-block w-1/2 flex items-center">
          <img src="../../../../assets/images/board/icon_hut.png" class="w-16px h-16px mr-4px">
          <span>室内湿度：</span>
          <span>{{ vibeData.humidity || '--' }}</span>
        </span>
      </div>
      <div class="fs flex items-center">
        <span class="inline-block w-1/2 flex items-center">
          <img src="../../../../assets/images/board/icon_an.png" class="w-16px h-16px mr-4px">
          <span>电压：</span>
          <span>{{ vibeData.voltage || '--' }}</span>
        </span>
        <span class="inline-block w-1/2 flex items-center">
          <img src="../../../../assets/images/board/icon_charge.png" class="w-16px h-16px mr-4px">
          <span>标气泄漏：</span>
          <span :class="vibeData.leakState === '1' ? 'redText' : 'greenText'">{{ vibeData.leakState === '1' ? '告警' : '正常' }}</span>
        </span>
      </div>
      <div class="fs flex items-center">
        <span class="inline-block w-1/2 flex items-center">
          <img src="../../../../assets/images/board/icon_waterstatus.png" class="w-16px h-16px mr-4px">
          <span>水浸状态：</span>         
          <span :class="vibeData.waterLogging === '1' ? 'redText' : 'greenText'">{{ vibeData.waterLogging === '1' ? '告警' : '正常' }}</span>
        </span>
        <span class="inline-block w-1/2 flex items-center">
          <img src="../../../../assets/images/board/icon_smoke.png" class="w-16px h-16px mr-4px">
          <span>烟感状态：</span>
          <span :class="vibeData.smoke === '1' ? 'redText' : 'greenText'">{{ vibeData.smoke === '1' ? '告警' : '正常' }}</span>
        </span>
      </div>
    </div>
    <!-- 智能采样总管 -->
    <div class="flow-chart__piping">
      <span class="text-16px font-medium">智能采样总管</span>
      <span v-for="(item) in pipingList" :key="item.key" class="ml-16px">
        <span>{{ item.name }}：</span>
        <span v-if="item.key === '1601'" :class="item.value === '异常' ? 'redText' : 'greenText'">{{ item.value }}{{ item.unit }}</span>
        <span v-else>{{ item.value }}</span>
      </span>
    </div>
    <!-- 压力 -->
    <div class="flow-chart__pressure">
      <div v-for="(item, index) in pressureList" :key="item.key" :class="index === 0 ? 'ml-16px' : 'ml-10px'" class="w-38px">
        <span>{{ item.name }}</span>
        <div>{{ item.value }}</div>
        <div>MPa</div>
      </div>
    </div>
    <!-- 主机 -->
    <div class="flow-chart__host">
      <div class="host-linkage bg">
        <div class="text-16px mt-6px">
          质控联动仪
        </div>
        <div class="mt-12px flex w-100px">
          <div class="w-42px text-right">
            状态：
          </div>
          <div :class="[hostData.status1 === '1' ? 'redText' : 'greenText','w-42px']">
            {{ hostData.status1 === '1' ? '报警' : '正常' }}
          </div>
        </div>
        <div class="mt-4px flex w-100px">
          <div class="w-42px text-right">
            SO₂：
          </div>
          <div :class="[hostData.soValue === '1' ? 'blueText' : 'greenText','w-42px']">
            {{ hostData.soValue === '1' ? '核查' : '正常' }}
          </div>
        </div>
        <div class="mt-4px flex w-100px">
          <div class="w-42px text-right">
            NO：
          </div>
          <div :class="[hostData.noValue === '1' ? 'blueText' : 'greenText','w-42px']">
            {{ hostData.noValue === '1' ? '核查' : '正常' }}
          </div>
        </div>
        <div class="mt-4px flex w-100px">
          <div class="w-42px text-right">
            CO：
          </div>
          <div :class="[hostData.coValue === '1' ? 'blueText' : 'greenText','w-42px']">
            {{ hostData.coValue === '1' ? '核查' : '正常' }}
          </div>
        </div>
        <div class="mt-4px flex">
          <div class="w-42px text-right">
            O₃：
          </div>
          <div :class="[hostData.o3Value === '1' ? 'blueText' : 'greenText','w-42px']">
            {{ hostData.o3Value === '1' ? '核查' : '正常' }}
          </div>
        </div>
      </div>
      <div class="host-aline bg">
        <div class="text-16px mt-6px">
          动态校准仪
        </div>
        <div class="mt-12px">
          <span>状态：</span>
          <span :class="hostData.status2 !== '1' ? 'originText' : 'greenText'">{{ hostData.status2 !== '1' ? '待机' : '运行' }}</span>
        </div>
        <div class="mt-4px">
          校准标气：{{ hostData.gas === '1' ? 'SO₂' : (hostData.gas === '2' ? 'NOx' : (hostData.gas === '3' ? 'CO' : (hostData.gas === '4' ? 'O₃' : '无'))) }}
        </div>
      </div>
      <div class="host-zero bg">
        <div class="text-16px mt-6px">
          零气发生器
        </div>
      </div>
    </div>
    <!-- 气体 -->
    <div class="flow-chart__gas">
      <div class="normal">
        <div v-for="(item) in gasList" :key="item.statusKey" class="normal-item bg">
          <div class="item-name">
            {{ item.name }}
          </div>
          <div class="item-status">
            <span>状态：</span>
            <!-- <span :class="item.status !== '通讯正常' ? 'redText' : 'greenText'">{{ item.status !== '通讯正常' ? '异常' : '正常' }}</span> -->
            <div class="statusValue">
              {{ item.status }}
            </div>
          </div>
          <div class="item-value w-full">
            监测值：{{ item.value }}
          </div>
          <div class="item-btns">
            <div class="selfBtn" @click="handleViewKey(item.typeName)">
              关键参数
            </div>
            <div class="selfBtn" @click="handleViewData(item.type)">
              远程质控
            </div>
          </div>
        </div>
      </div>
      <div class="pm">
        <div v-for="(item) in pmList" :key="item.statusKey" class="pm-item bg">
          <div class="item-name">
            {{ item.name }}
          </div>
          <div class="item-status mt-12px">
            <span>状态：</span>
            <!-- <span :class="item.status !== '通讯正常' ? 'redText' : 'greenText'">{{ item.status !== '通讯正常' ? '异常' : '正常' }}</span> -->
            <div class="statusValue">
              {{ item.status }}
            </div>
          </div>
          <div class="mt-4px">
            监测值：{{ item.value }}
          </div>
          <!-- <div class="mt-4px">样气温度：{{ item.heatTemp }}</div>
          <div class="mt-4px">样气湿度：{{ item.heatHum }}</div>
          <div class="mt-4px">机箱温度：{{ item.chassisTemp }}</div>
          <div class="mt-4px">表显流量：{{ item.showFlow }}</div> -->
          <div class="mt-4px">
            <div class="selfBtn" @click="handleViewKey(item.type)">
              关键参数
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 流量 -->
    <div class="flow-chart__runoff">
      <div v-for="(item, index) in runoffList" :key="item.key" :class="index === 0 ? '' : 'mt-96px'">
        流量：{{ item.value }}
      </div>
    </div>
    <!-- 管路 -->
    <div class="flow-chart__PM25 channel">
      <div v-for="(item) in channelList" :key="item.statusKey" class="mb-180px">
        <div class="channel-name">
          {{ item.name }}
        </div>
        <div class="status mt-12px">
          <span>状态：</span>
          <span :class="item.status === '异常' ? 'redText' : 'greenText'">{{ item.status }}</span>
        </div>
        <!-- <div class="mt-4px">温度：{{ item.temp }}°C</div> -->
        <!-- <div class="mt-4px">湿度：{{ item.humidity }}</div> -->
        <div class="mt-4px">
          流量：{{ item.flow }}
        </div>
      </div>
    </div>
    <div class="flow-chart__total">
      流量  {{ hostData.total }} L/min
    </div>
    <quality-control ref="qualityControl" />
    <!-- 关键参数 -->
    <KeyParameter ref="keyParameter" />
  </div>
</template>

<script>
import { apiGetTopo, apiGetVibe } from '@/api/interface/dashboard.js'
import QualityControl from './QualityControl.vue'
import KeyParameter from './KeyParameter.vue'
export default {
  components: {
    QualityControl,
    KeyParameter
  },
  data () {
    return {
      requireInterval: null,
      // 顶部信息
      vibeData: {
        temperature: '',
        humidity: '',
        electricCharge: '',
        ammeter: '',
        waterLogging: '',
        smoke: '',
      },
      hostData: {
        status1: '--',
        status2: '--',
        soValue: '--',
        coValue: '--',
        noValue: '--',
        o3Value: '--',
        gas: '--',
        total: '--'
      },
      // 主机
      // 采样总管
      pipingList: [
        // {
        //   name: '状态',
        //   value: '正常',
        //   key: '1601',
        //   unit: ''
        // },
        {
          name: '温度',
          value: '正常',
          key: '1602',
          unit: '°C'
        },
        {
          name: '湿度',
          value: '正常',
          key: '1603',
          unit: '%'
        },
        {
          name: '流速',
          value: '正常',
          key: '1604',
          unit: 'm/s'
        }
      ],
      // 压力
      pressureList: [
        {
          name: 'SO₂',
          value: '正常',
          key: '102'
        },
        {
          name: 'NO',
          value: '正常',
          key: '202'
        },
        {
          name: 'CO',
          value: '正常',
          key: '302'
        }
      ],
      // 气体
      gasList: [
        {
          name: 'SO₂',
          status: '正常',
          value: '57 ug/m³',
          statusKey: '1002',
          valueKey: '1003',
          type: '1',
          typeName: 'so2'
        },
        {
          // name: 'NO-NO2-NOx',
          name: 'NO₂',
          status: '正常',
          value: '57 ug/m³',
          statusKey: '1102',
          valueKey: '1103',
          type: '2',
          typeName: 'nox'
        },
        {
          name: 'CO',
          status: '正常',
          value: '57 ug/m³',
          statusKey: '1202',
          valueKey: '1203',
          type: '3',
          typeName: 'co'
        },
        {
          name: 'O₃',
          status: '正常',
          value: '57 ug/m³',
          statusKey: '1302',
          valueKey: '1303',
          type: '4',
          typeName: 'o3'
        }
      ],
      // PM
      pmList: [
        {
          name: 'PM₂.₅',
          type: 'pm25',
          status: '正常',
          value: '57 ug/m³',
          heatTemp: 'XX',
          heatHum: 'XX',
          chassisTemp: 'XX',
          showFlow: 'XX',
          statusKey: '1401',
          valueKey: '1402',
          heatKey: '1403',
          chassisKey: '1405',
          humKey: '1404',
          showKey: '1406'
        },
        {
          name: 'PM₁₀',
          type: 'pm10',
          status: '正常',
          value: '57 ug/m³',
          heatTemp: 'XX',
          heatHum: 'XX',
          chassisTemp: 'XX',
          showFlow: 'XX',
          statusKey: '1501',
          valueKey: '1502',
          heatKey: '1503',
          chassisKey: '1505',
          humKey: '1504',
          showKey: '1506'
        }
      ],
      // 流量
      runoffList: [
        {
          name: '流量',
          value: '正常',
          key: '1001'
        },
        {
          name: '流量',
          value: '正常',
          key: '1101'
        },
        {
          name: '流量',
          value: '正常',
          key: '1201'
        },
        {
          name: '流量',
          value: '正常',
          key: '1301'
        }
      ],
      // 管路
      channelList: [
        {
          name: 'PM₂.₅管路',
          status: '正常',
          temp: '57 ug/m³',
          humidity: 'XX',
          flow: 'XX',
          statusKey: '1407',
          tempKey: '1406',
          humidityKey: '1407',
          flowKey: '1408'
        },
        {
          name: 'PM₁₀管路',
          status: '正常',
          temp: '57 ug/m³',
          humidity: 'XX',
          flow: 'XX',
          statusKey: '1507',
          tempKey: '1506',
          humidityKey: '1507',
          flowKey: '1508'
        }
      ],
    }
  },

  created () {
    this.onGetTopoData()
    this.onGetVibeData()
    this.requireInterval = setInterval(() => {
      if (this.$route.query.stationId) {
        this.onGetTopoData()
        this.onGetVibeData()
      }
    }, 5 * 1000)
  },

  beforeDestroy() {
    clearInterval(this.requireInterval)
    this.requireInterval = null
  },

  methods: {
    onGetTopoData () {
      apiGetTopo({ stationId: this.$route.query.stationId }).then(res => {
        res.data.forEach(its => {
          if (its.key === '501') {
            this.hostData.status1 = its.value
          }
          if (its.key === '601') {
            this.hostData.status2 = its.value
          }
          if (its.key === '502') {
            this.hostData.soValue =  its.value
          }
          if (its.key === '504') {
            this.hostData.coValue = its.value
          }
          if (its.key === '503') {
            this.hostData.noValue = its.value
          }
          if (its.key === '505') {
            this.hostData.o3Value = its.value
          }
          if (its.key === '602') {
            this.hostData.gas = its.value === '--' ? its.value : (its.value + its.unit)
          }
          if (its.key === '1606') {
            this.hostData.total = its.value === '--' ? its.value : (its.value + its.unit)
          }
          this.pipingList.forEach(item => {
            if (item.key === its.key) {
              item.value = its.value + its.unit
            }
          })
          this.runoffList.forEach(item => {
            if (item.key === its.key) {
              item.value = its.value + its.unit
            }
          })
          this.pressureList.forEach(item => {
            if (item.key === its.key) {
              item.value = its.value + its.unit
            }
          })
          this.gasList.forEach(item => {
            if (item.statusKey === its.key) {
              item.status = its.value + its.unit
            }
            if (item.valueKey === its.key) {
              item.value = its.value === '--' ? its.value : (Number(its.value).toFixed(2) + its.unit)
            }
          })
          this.pmList.forEach(item => {
            if (item.statusKey === its.key) {
              item.status = its.value + its.unit
            }
            if (item.valueKey === its.key) {
              item.value = its.value === '--' ? its.value : (Number(its.value).toFixed(2) + its.unit)
            }
            if (item.heatKey === its.key) {
              item.heatTemp = its.value + its.unit
            }
            if (item.chassisKey === its.key) {
              item.chassisTemp = its.value + its.unit
            }
            if (item.humKey === its.key) {
              item.heatHum = its.value + its.unit
            }
            if (item.showKey === its.key) {
              item.showFlow = its.value + its.unit
            }
          })
          this.channelList.forEach(item => {
            if (item.statusKey === its.key) {
              item.status = its.value + its.unit
            }
            if (item.tempKey === its.key) {
              item.temp = its.value + its.unit
            }
            if (item.humidityKey === its.key) {
              item.humidity = its.value + its.unit
            }
            if (item.flowKey === its.key) {
              item.flow = its.value + its.unit
            }
          })
        })
      })
    },
    onGetVibeData () {
      apiGetVibe({ stationId: this.$route.query.stationId }).then(res => {
        this.vibeData = res.data
      })
    },

    handleViewData (type) {
      this.$refs.qualityControl.openPopup(type) 
      // this.$router.push({path:'/quality/task',query:{type}})
    },

    handleViewKey (typeName) {
      this.$refs.keyParameter.openDialog(typeName)
    },

    formatMete(value = '') {
      let textValue = null
      if (value) {
        const v = value.substring(0, value.length - 1)
        const unit = value.slice(-1)
        textValue = (Number(v) / 10).toFixed(1) + unit
      } else {
        textValue = 0
      }
      return textValue
    }
  }
}
</script>

<style scoped lang='scss'>
  .flow-chart {
    position: relative;
    width: 100%;
    height: 680px;
    background: url('../../../../assets/images/board/flowImg.png');
    background-size: 100% 680px;
    color: #fff;
    font-size: 14px;
    margin-top: -24px;

    .greenText {
      color: #63E7B7;
    }

    .redText {
      color: #FF5C43;
    }

    .blueText {
      color: #6BF2FF;
    }

    .originText {
      color: #FE9C2B;
    }

    &__header {
      position: absolute;
      top: 52px;
      left: 10px;

      .fs {
        width: 300px;
        margin-bottom: 8px;
      }
    }

    &__total {
      position: absolute;
      left: 370px;
      top: 126px;
    }

    &__piping {
      position: absolute;
      top: 86px;
      left: 360px;
    }

    &__pressure {
      position: absolute;
      bottom: 36px;
      display: flex;
      left: 12px;
    }

    &__host {
      position: absolute;
      top: 180px;
      left: 217px;

      .host-linkage {
        width: 160px;
        height: 210px;
        padding: 10px;
      }

      .host-aline {
        width: 160px;
        height: 170px;
        padding: 10px;
        margin: 8px 0;
      }

      .host-zero {
        width: 160px;
        height: 82px;
        padding: 10px;
      }
    }

    &__gas {
      display: flex;
      position: absolute;
      top: 158px;
      left: 472px;

      .statusValue {
        width: 100px;
        white-space:nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .normal {
        .normal-item {
          width: 168px;
          height: 120px;
          padding: 6px 0;
          padding-left: 6px;
          padding-right: 4px;
          margin-bottom: 8px;
          box-sizing: border-box;
          
          .item-name {
            font-size: 16px;
          }

          .item-status {
            display: flex;
            align-items: center;
          }

          .item-btns {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-top: 6px;
          }
        }
        // .normal-item:hover {
        //   background: linear-gradient(270deg, #098DF9 0%, #1DA6FB 100%);
        // }
      }

      .pm {
        margin-left: 6px;
        .pm-item {
          width: 154px;
          height: 248px;
          padding: 6px 0;
          padding-left: 6px;
          padding-right: 4px;
          margin-bottom: 8px;
          box-sizing: border-box;
          
          .item-name {
            font-size: 16px;
          }
          .item-status {
            display: flex;
            align-items: center;
          }
        }
        // .pm-item:hover {
        //   background: linear-gradient(270deg, #098DF9 0%, #1DA6FB 100%);
        // }
      }
    }

    &__runoff {
      position: absolute;
      top: 248px;
      left: 392px;
    }

    &__PM25 {
      position: absolute;
      right: 6px;
      top: 203px;
    }

    .channel {
      &-name {
        font-size: 16px;
      }
    }

    .bg {
      background: linear-gradient(270deg, rgba(86,171,255,0.2) 0%, rgba(86,171,255,0.5) 100%);
      border-radius: 4px;
      border: 1px solid;
      border-image: linear-gradient(270deg, rgba(86, 171, 255, 0.3), rgba(86, 171, 255, 1)) 1 1;
    }

    .selfBtn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 72px;
      height: 28px;
      background: linear-gradient( 180deg, #098DF9 0%, #1DA6FB 100%);
      border-radius: 4px;
      border: 1px solid #4EA7F9;
      font-size: 14px;
      color: #E2EDFF;
      cursor: pointer;
    }
  }
</style>




