<template>
  <div
    style="width: 100%;
          height: 100%;"
  >
    <div
      v-if="!hasNoData"
      ref="charts"
      style="
          width: 100%;
          height: 100%;
          position: relative;
        "
    />
    <NoData v-else />
  </div>
</template>
<script>
import NoData from "./NoData.vue";
/** echarts*/
import * as echarts from "echarts";
import 'echarts-liquidfill';
export default {
  components: {NoData},
  props: {
    option: {
      type: Object,
      default: () => {},
    },
    mapJson: {
      type: Object,
      default: ()=>{}
    }
  },
  data() {
    return {
      chart: null,
    };
  },
  computed:{
    hasNoData(){
      return Object.keys(this.option).length === 0
    }
  },
  watch: {
    option: {
      handler(val) {
        if(!this.hasNoData){
          if(this.chart){
            this.chart.setOption(val,{replaceMerge: 'series'});
          }else{
            this.initChart()
          }
        }
      },
      deep: true,
    },
    "$store.state.fontSize"() {
      this.chart && this.chart.resize();
    },
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy(){
    this.chart && this.chart.clear()
    this.chart && this.chart.dispose()
    this.$forceUpdate()
  },
  methods: {
    initChart() {
      if(!this.hasNoData){
        this.$nextTick(()=>{
          this.chart = echarts.init(this.$refs.charts);
          if(this.mapJson && this.mapJson.features){
            echarts.registerMap('area', this.mapJson);
          }
          this.chart.setOption(this.option);
          this.chart.resize();
          this.$emit('onload', this.chart)
        })
      }
    },
    resize(){
      this.chart.resize();
    },
    getChart(){
      return this.chart
    }
  },
};
</script>