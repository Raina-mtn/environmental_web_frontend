<template>
  <div>
    <Chart ref="chart" :map-json="mapJson" :option="mapOption" @onload="loadChart" />
    <StationDialog ref="stationDialog" class="staion" />
    <GasDialog ref="gasDialog" />
    <FaultDialog ref="faultDialog" />
    <div class="compositeboard-notice">
      <ScrollJS style="height: 100px;">
      <p v-for="(item,index) in warnList" :key="index" class="mb-4">
        <span>{{ item.station }}</span> <span>{{ warnTypeObj[item.warningType] || '' }}</span> <span>{{ item.detail }}</span> <span>{{ item.warningTime }}</span>
        <span :class="['status', `status__${item.status}`]" v-if="item.status!=='other'">{{ item.status === 'todo' ? '待处理'  : '已处理' }}</span>
        <el-button size="mini" @click="showFaultDialog(item)" v-else>问题溯源</el-button>
      </p>
      </ScrollJS>
    </div>
  </div>
</template>
<script>
import Chart from '@/components/Chart.vue'
import mapJson from './js/mapJson'
import { mapOption} from './js/chart.config';
import StationDialog from './component/StationDialog.vue';
import FaultDialog from './component/FaultDialog.vue';
import GasDialog from './component/GasDialog.vue';
import {apiGetStationList} from '@/api/interface/station'
import {ToDigital} from '@/utils/util.js'
import {warnTypeObj} from '../config'
import ScrollJS from '@/components/scrollJS/index.vue'
export default {
  components: {
    Chart,
    StationDialog,
    GasDialog,
    FaultDialog,
    ScrollJS
  },
  data(){
    return {
      mapJson,
      warnList:[],
      stationId: '',
      stationList: [],
      position: {},
      warnTypeObj,
      checkAll: false,
      isIndeterminate: false,

    }
  },
  computed:{
    mapOption(){
      return mapOption(this.stationList)
    }
  },
  mounted(){
    this.getStationList()
  },
  methods: {
    setData(warnList){
      const status = ['todo', 'done', 'other'] // 随机生成状态
      this.warnList = warnList.map((v,index)=>({
        ...v,
        status: status[Math.floor(index%3)]
      }))
    },
    getStationList(){
      apiGetStationList().then(res=>{
        this.stationList = res.data.map(v=>({
          name: v.stationName,
          value: [ToDigital(v.longitude), ToDigital(v.latitude)],
          id: v.stationId,
          type:v.type
        }))
      })
    },
    loadChart(chart){
      let self = this
      if(chart){
        chart.on('click', 'series.scatter', function (params) { // 注册点击事件
          const {data : {id, value,type}} = params
          const position = chart.convertToPixel('geo', value)
          self.$bus.$emit('scatter-type', type);
          if(type==='WATER'){
            self.$refs.stationDialog.show(id, position)
          }
          else{
            self.$refs.gasDialog.show(id, position)
          }
        });
      }
    },
    showFaultDialog(item){
      this.$refs.faultDialog.show(item)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.compositeboard-notice{
  position: absolute;
  bottom: 10px;
  right: 50% !important;
  transform: translate(50%, 0);
  p{
    padding: 5px 20px;
    background: linear-gradient(90deg, rgba(86,171,255,0.4) 0%, rgba(30,143,255,0.02) 100%);
    border-radius: 6px;
    border: 1px solid;
    border-image: linear-gradient(270deg, rgba(107, 242, 255, 0.12), rgba(107, 242, 255, 0.5)) 1 1;
    width: auto;
    border-radius: 6px;
    span{
      font-size: 1.5rem;
      color: #fff;
      margin-right: 5px;
      &.status{
      padding-left: 1.5rem;
        position: relative;
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
          background:#FFC62E;
        }
      }
    }
    }
    .el-button {
      background: linear-gradient(
              180deg,
              rgba(19, 47, 95, 0.7) 0%,
              rgba(80, 140, 245, 0.7) 100%
      );
      color: #e2edff;
      border: 1px solid #148ff5;
    }
  }
}

</style>
