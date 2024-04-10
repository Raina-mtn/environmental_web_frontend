<template>
  <el-dialog
    :visible="isShow"
    title="质控详情"
    :destroy-on-close="true"
    width="72%"
    top="30px"
    @close="closeDialog()"
  >
    <div class="container h-65vh overflow-auto pr-16px">
      <div>
        <el-descriptions class="margin-top" title="" :column="2" border>
          <el-descriptions-item label="仪器名称及序列号">
            {{ formData.instrumentName||'' }}
          </el-descriptions-item>
          <el-descriptions-item label="校准日期">
            {{ formData.dataTime || '' }}
          </el-descriptions-item>
          <el-descriptions-item label="标气来源及编号">
            {{ formData.gasSource||'' }}({{ formData.gasCode||'' }})
          </el-descriptions-item>
          <el-descriptions-item label="标气浓度">
            {{ formData.gasConcentration || '' }}
          </el-descriptions-item>
          <el-descriptions-item label="使用满量程" :span="2">
            {{ formData.useFullRange || '' }}
          </el-descriptions-item>
        </el-descriptions>
        <el-table
          :data="tableData"
          border
          :class="['w-full',instrumentTypeName === 'NOx'?'h-240px':'h-140px']"
        >
          <el-table-column
            v-for="item in pointHeader"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row[item.prop] }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-descriptions v-if="instrumentTypeName === 'NOx'" class="margin-top" :column="1" border>
          <el-descriptions-item label="NO零点漂移（ppb）">
            <span>{{ formData.zeroDrift || '' }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="NOx零点漂移（ppb）">
            <span>{{ formData.zeroDrift2 || '' }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="NO跨度漂移（%）">
            <span>{{ formData.spanDrift || '' }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="NOx跨度漂移（%）">
            <span>{{ formData.spanDrift2 || '' }}</span>
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions v-else class="margin-top" :column="1" border>
          <el-descriptions-item label="零点漂移（ppb）">
            <span>{{ formData.zeroDrift || '' }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="跨度漂移（%）">
            <span>{{ formData.spanDrift || '' }}</span>
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" :column="1" border>
          <el-descriptions-item label="质控曲线">
            <div class="flex h-300px">
              <!-- <Chart :option="resultOption" /> -->
              <Chart :option="tempOption" />
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="机器人巡检" content-class-name="!p-0px">
            <div style="border-bottom: 1px solid #ebeef5;height: 46px;line-height: 46px;">
              检查钢瓶气及减压阀：
            </div>
            <div style="border-bottom: 1px solid #ebeef5;padding: 10px;">
              暂无图片
              <!-- <img src="@/assets/images/task.png" class="h-200px mx-auto" alt=""> -->
            </div>
            <div style="border-bottom: 1px solid #ebeef5;height: 46px;line-height: 46px;">
              仪表界面巡检结果：
            </div>
            <div style="border-bottom: 1px solid #ebeef5;padding: 10px;">
              暂无图片
              <!-- <img src="@/assets/images/task.png" class="h-200px mx-auto" alt=""> -->
            </div>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <template #footer>
      <el-button size="mini" @click="closeDialog()">
        关闭
      </el-button>
      <!-- <el-button type="primary" size="mini" @click="submit()">
        保存
      </el-button> -->
    </template>
  </el-dialog>
</template>

<script>
// import { cloneDeep } from 'lodash-es'
import { detail } from '@/api/interface/quality-record'
import Chart from '@/components/Chart.vue'
import { cloneDeep } from 'lodash-es'
// import { apiGetQualityOne } from '@/api/interface/dashboard.js'

export default {
  components: {
    Chart
  },
  data() {
    return {
      reportId: '',
      instrumentTypeName:'',
      isShow:false,
      isEdit:false,
      // 编辑状态
      editStatus: false,
      // 当前编辑的字段
      editKey: '',
      formData: {},
      pointHeader: [
        {
          prop: 'point',
          label: '校准点',
          width: '240',
        },
        {
          prop: 'startTime',
          label: '开始时间',
        },
        {
          prop: 'endTime',
          label: '结束时间',
        },
        {
          prop: 'standard',
          label: '标准浓度',
        },
        {
          prop: 'strengthShow',
          label: '响应浓度（显示值）',
        },
        {
          prop: 'strengthCal',
          label: '响应浓度（标定值）',
        }
      ],
      tableData: [],
      cureHeader: [
        {
          prop: 'parameter',
          label: '关键参数列表',
          width: '240',
        },
        {
          prop: 'check',
          label: '检查值',
        },
        {
          prop: 'range',
          label: '正常范围',
        },
        {
          prop: 'deal',
          label: '处理记录',
        }
      ],
      // 关键参数数据
      cureTableData: [],
      // 关键参数字段映射
      cureMapping: [
        {
          check: 'intt',
          deal: 'inttResult'
        },
        {
          check: 'rctt',
          deal: 'rcttResult'
        },
        {
          check: 'pres',
          deal: 'presResult'
        },
        {
          check: 'smplf',
          deal: 'smplfResult'
        },
        {
          check: 'lmpi',
          deal: 'lmpiResult'
        },
        {
          check: 'lmpv',
          deal: 'lmpvResult'
        }
      ],
      
      resultOption: {},
      tempOption: {},
      option: {
        grid: {
          top: 40,
          left: 80,
          right: 64,
          bottom:40
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            var result = ''
            result += params[0].axisValue
            params.forEach((item, index) => {
              let unit = ''
              let custom = ''
              var dotHtml = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${item.color}"></span>`
              result += '</br>' + dotHtml + item.seriesName + ': ' + item.data + unit + ' ' + custom
            })
            return result
          }
        },
        xAxis: {
          type: 'category',
          name: '标样浓度',
          boundaryGap: false, // 第一个点是否为原点
          data: [],
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#000',
              width: 1
            }
          },
          nameTextStyle: {
            lineHeight: 60, //标题行高
            verticalAlign: 'left',
            // padding:[0,0,0,-80]
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#000',
              type: 'dashed'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#000',
              width: 1
            }
          },
          nameTextStyle: {
            padding:[0,30,0,0]
          },
          axisLabel: {
            textStyle: {
              color: '#000', // 更改坐标轴文字颜色
              // fontSize: 12 // 更改坐标轴文字大小
            }
          },
          axisTick: {
            show: false
          },
        },
        color: ['#3DFFFF'],
        series: [
          {
            data: [],
            type: 'line',
            symbol: 'circle',
            showSymbol: true,
            smooth: true,
            name: '监测值',
            areaStyle: {
              opacity: 0.04
            }
          }
        ]
      },
      noxOption: {
        grid: {
          top: 40,
          left: 80,
          right: 64,
          bottom:40
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            var result = ''
            result += params[0].axisValue
            params.forEach((item, index) => {
              let unit = ''
              let custom = ''
              var dotHtml = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${item.color}"></span>`
              result += '</br>' + dotHtml + item.seriesName + ': ' + item.data + unit + ' ' + custom
            })
            return result
          }
        },
        xAxis: {
          type: 'category',
          name: '标样浓度',
          boundaryGap: false, // 第一个点是否为原点
          data: [],
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#000',
              width: 1
            }
          },
          nameTextStyle: {
            lineHeight: 60, //标题行高
            verticalAlign: 'left',
            // padding:[0,0,0,-80]
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#000',
              type: 'dashed'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#000',
              width: 1
            }
          },
          nameTextStyle: {
            padding:[0,30,0,0]
          },
          axisLabel: {
            textStyle: {
              color: '#000', // 更改坐标轴文字颜色
              // fontSize: 12 // 更改坐标轴文字大小
            }
          },
          axisTick: {
            show: false
          },
        },
        color: ['#3DFFFF'],
        series: [
          {
            data: [],
            type: 'line',
            symbol: 'circle',
            showSymbol: true,
            smooth: true,
            name: 'NO监测值',
            areaStyle: {
              opacity: 0.04
            }
          },{
            data: [],
            type: 'line',
            symbol: 'circle',
            showSymbol: true,
            smooth: true,
            name: 'NOx监测值',
            areaStyle: {
              opacity: 0.04
            }
          }
        ]
      },
    };
  },
  computed:{
    stationId(){
      return this.$store.state.station.station.id
    }
  },
  created() {
    // this.onGetReportDetail()
  },
  methods: {
    async onGetReportDetail () {
      await detail(this.reportId).then(({data}) => {
        this.formData = data
        this.tableData = this.instrumentTypeName === 'NOx'?[{
          point:'NO零点',
          startTime:data.sDtZero,
          endTime:data.eDtZero,
          standard:0,
          strengthShow:data.zeroShow,
          strengthCal:data.zeroVal2,
        },{
          point:'NOx零点',
          startTime:data.sDtZero2,
          endTime:data.eDtZero2,
          standard:0,
          strengthShow:data.zeroShow2,
          strengthCal:data.zeroVal,
        },{
          point:'NO满量程的80%',
          startTime:data.eDtSpan,
          endTime:data.sDtSpan,
          standard:data.stdConcentration,
          strengthShow:data.spanShow,
          strengthCal:data.spanVal,
        },{
          point:'NOx满量程的80%',
          startTime:data.sDtSpan2,
          endTime:data.eDtSpan2,
          standard:data.stdConcentration,
          strengthShow:data.spanShow2,
          strengthCal:data.spanVal2,
        }]:[{
          point:'零点',
          startTime:data.sDtZero,
          endTime:data.eDtZero,
          standard:0,
          strengthShow:data.zeroShow,
          strengthCal:data.zeroVal,
        },{
          point:'满量程的80%',
          startTime:data.eDtSpan,
          endTime:data.sDtSpan,
          standard:data.stdConcentration,
          strengthShow:data.spanShow,
          strengthCal:data.spanVal,
        }]

        // 图表-右边
        if(this.instrumentTypeName === 'NOx'){
          data.monitorDataInQc = data.monitorDataInQc?data.monitorDataInQc:[]
          this.tempOption = cloneDeep(this.noxOption)
          const xData = data.monitorDataInQc.map(item => {
            return item.dateTime
          })
          const noData = data.monitorDataInQc?.map(item => {
            return item.value||0
          })
          const noxData = data.monitorDataInQc?.map(item => {
            return item.value2||0
          })
          if (noData && noData.length > 0) {
            this.tempOption.xAxis.data = xData
            this.tempOption.series[0].data = noData
            this.tempOption.series[1].data = noxData
            this.tempOption.xAxis.name = '时间'
            this.tempOption.yAxis.name = `(${data.unit})`
            this.tempOption.xAxis.nameTextStyle.padding = [0,0,0,-40]
          } else {
            this.tempOption = {}
          }
        }else{
          data.monitorDataInQc = data.monitorDataInQc?data.monitorDataInQc:[]
          this.tempOption = cloneDeep(this.option)
          const xData = data.monitorDataInQc.map(item => {
            return item.dateTime
          })
          const yData = data.monitorDataInQc.map(item => {
            return item.value||0
          })
          if (yData && yData.length > 0) {
            this.tempOption.xAxis.data = xData
            this.tempOption.series[0].data = yData
            this.tempOption.series[0].name = '监测值'
            this.tempOption.xAxis.name = '时间'
            this.tempOption.yAxis.name = `(${data.unit})`
            this.tempOption.xAxis.nameTextStyle.padding = [0,0,0,-40]
          } else {
            this.tempOption = {}
          }
        }
      })
    },

    async openDialog(row, isEdit=false){
      const {id,instrumentTypeName} = row
      this.reportId = id
      this.instrumentTypeName = instrumentTypeName
      this.isShow = true
      this.isEdit = isEdit
      await this.onGetReportDetail()
      
      // this.onGetDataOne()
    },
    closeDialog() {
      this.isShow = false
      this.editStatus = false
      this.formData={}
    },
  },
}
</script>
<style lang="scss" scoped>
  ::v-deep .el-table tbody tr:hover>td {
    background: #fff !important
  }
  ::v-deep .el-descriptions-item__label {
    width: 240px;
    text-align: center !important;
    color: #909399 !important;
    font-weight: 600 !important;
  }
  ::v-deep .el-descriptions-item__content {
    text-align: center !important;
  }
  ::v-deep .el-descriptions__header {
    justify-content: center;
  }
</style>
