<template>
  <div class="container h-75vh overflow-auto p-16px bg-light-100">
    <div>
      <el-descriptions class="margin-top" title="（SO₂）仪器运行状况检查 / 校准记录表" :column="2" border>
        <el-descriptions-item label="仪器名称及序列号">
          {{ formData.dataName ? `${formData.dataName}(${formData.dataCode})` : '' }}
        </el-descriptions-item>
        <el-descriptions-item label="校准日期">
          {{ formData.dataDay || '' }}
        </el-descriptions-item>
        <el-descriptions-item label="标气来源及编号">
          {{ formData.gasSource ? `${formData.gasSource}(${formData.gasCode})` : '' }}
        </el-descriptions-item>
        <el-descriptions-item label="标气浓度">
          {{ formData.gasStd || '' }}
        </el-descriptions-item>
        <el-descriptions-item label="使用满量程" :span="2">
          {{ formData.gasFull || '' }}
        </el-descriptions-item>
      </el-descriptions>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
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
            <template v-if="item.notNeedEdit">
              <span>{{ scope.row[item.prop] }}</span>
            </template>
            <template v-if="!item.notNeedEdit">
              <span v-if="!editStatus || editKey !== `${[item.prop]}${scope.$index}`">{{ scope.row[item.prop] }}</span>
              <el-input v-if="editKey === `${[item.prop]}${scope.$index}` && editStatus" v-model="scope.row[item.prop]" size="small" maxlength="20" style="width: 80%;" @change="(value) => handleChangeInput(value, scope.$index, item.prop, pointMapping)" />
              <i v-if="!editStatus" class="el-icon-edit-outline ml-6px" @click="handleChangeStatus(`${[item.prop]}${scope.$index}`)" />
              <i v-if="editKey === `${[item.prop]}${scope.$index}` && editStatus" class="el-icon-collection ml-6px" @click="handleSaveEdit" />
            </template>
          </template>
        </el-table-column>
      </el-table>
      <el-descriptions class="margin-top" :column="1" border>
        <el-descriptions-item label="零点漂移（ppb）">
          <span v-if="!editStatus || editKey !== 'zeroDrift'">{{ formData.zeroDrift || '' }}</span>
          <el-input v-if="editKey === 'zeroDrift' && editStatus" v-model="formData.zeroDrift" size="small" maxlength="20" style="width: 80%;" />
          <i v-if="!editStatus" class="el-icon-edit-outline ml-6px" @click="handleChangeStatus('zeroDrift')" />
          <i v-if="editKey === 'zeroDrift' && editStatus" class="el-icon-collection ml-6px" @click="handleSaveEdit" />
        </el-descriptions-item>
        <el-descriptions-item label="跨度漂移（%）">
          <span v-if="!editStatus || editKey !== 'spanDrift'">{{ formData.spanDrift || '' }}</span>
          <el-input v-if="editKey === 'spanDrift' && editStatus" v-model="formData.spanDrift" size="small" maxlength="20" style="width: 80%;" />
          <i v-if="!editStatus" class="el-icon-edit-outline ml-6px" @click="handleChangeStatus('spanDrift')" />
          <i v-if="editKey === 'spanDrift' && editStatus" class="el-icon-collection ml-6px" @click="handleSaveEdit" />
        </el-descriptions-item>
      </el-descriptions>
      <el-table
        :data="cureTableData"
        align="center"
        border
        style="width: 100%"
      >
        <el-table-column
          v-for="item in cureHeader"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center"
        >
          <template slot-scope="scope">
            <template v-if="item.notNeedEdit">
              <span>{{ scope.row[item.prop] }}</span>
            </template>
            <template v-if="!item.notNeedEdit">
              <span v-if="!editStatus || editKey !== `${[item.prop]}${scope.$index}`">{{ scope.row[item.prop] }}</span>
              <el-input v-if="editKey === `${[item.prop]}${scope.$index}` && editStatus" v-model="scope.row[item.prop]" size="small" maxlength="20" style="width: 80%;" @change="(value) => handleChangeInput(value, scope.$index, item.prop, cureMapping)" />
              <i v-if="!editStatus" class="el-icon-edit-outline ml-6px" @click="handleChangeStatus(`${[item.prop]}${scope.$index}`)" />
              <i v-if="editKey === `${[item.prop]}${scope.$index}` && editStatus" class="el-icon-collection ml-6px" @click="handleSaveEdit" />
            </template>
          </template>
        </el-table-column>
      </el-table>
      <el-descriptions class="margin-top" :column="1" border>
        <el-descriptions-item label="备注">
          <span v-if="!editStatus || editKey !== 'commentResult'">{{ formData.commentResult }}</span>
          <el-input v-if="editKey === 'commentResult' && editStatus" v-model="formData.commentResult" size="small" maxlength="20" style="width: 80%;" />
          <i v-if="!editStatus" class="el-icon-edit-outline ml-6px" @click="handleChangeStatus('commentResult')" />
          <i v-if="editKey === 'commentResult' && editStatus" class="el-icon-collection ml-6px" @click="handleSaveEdit" />
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    paramsData: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      reportId: '',
      isShow:false,
      isEdit:false,
      // 编辑状态
      editStatus: false,
      // 当前编辑的字段
      editKey: '',
      formData: {
        gasFull: '500ppb'
      },
      pointHeader: [
        {
          prop: 'point',
          label: '校准点',
          width: '240',
          notNeedEdit: true
        },
        {
          prop: 'startTime',
          label: '开始时间',
          notNeedEdit: false
        },
        {
          prop: 'endTime',
          label: '结束时间',
          notNeedEdit: false
        },
        {
          prop: 'standard',
          label: '标准浓度',
          notNeedEdit: true
        },
        {
          prop: 'strengthShow',
          label: '响应浓度（显示值）',
          notNeedEdit: false
        },
        {
          prop: 'strengthCal',
          label: '响应浓度（标定值）',
          notNeedEdit: false
        }
      ],
      tableData: [
        {
          point: '零点',
          startTime: '2016-05-02',
          endTime: '2016-05-02',
          standard: '0',
          strengthShow: '上海市普陀区金沙江路 1518 弄',
          strengthCal: '111'
        }, {
          point: '满量程的80%',
          startTime: '2016-05-02',
          endTime: '2016-05-02',
          standard: '400',
          strengthShow: '上海市普陀区金沙江路 1517 弄',
          strengthCal: '111'
        }
      ],
      pointMapping: [
        {
          startTime: 'zeroSDT',
          endTime: 'zeroEDT',
          strengthShow: 'zeroShow',
          strengthCal: 'zeroVal'
        },
        {
          startTime: 'spanSDT',
          endTime: 'spanEDT',
          strengthShow: 'spanShow',
          strengthCal: 'spanVal'
        }
      ],
      cureHeader: [
        {
          prop: 'parameter',
          label: '关键参数列表',
          width: '240',
          notNeedEdit: true
        },
        {
          prop: 'check',
          label: '检查值',
          notNeedEdit: true
        },
        {
          prop: 'range',
          label: '正常范围',
          notNeedEdit: true
        },
        {
          prop: 'deal',
          label: '处理记录',
          notNeedEdit: false
        }
      ],
      // 关键参数数据
      cureTableData: [
        {
          parameter: 'INTERNAL TEMP(机箱内部温度)',
          check: '2016-05-02',
          range: '15-45C°',
          deal: '王小虎'
        }, {
          parameter: 'CHAMBER TEMP(反应室温度)',
          check: '2016-05-02',
          range: '43-47C°',
          deal: '王小虎'
        },
        {
          parameter: 'PRESSSURE(反应室压力)',
          check: '2016-05-02',
          range: '400-1000mmHg',
          deal: '王小虎'
        },{
          parameter: 'SAMPLE FLOW(样气流量)',
          check: '2016-05-02',
          range: '0.350-0.750L/min',
          deal: '王小虎'
        },{
          parameter: 'LAMP INTENSITY(紫外灯强度)',
          check: '2016-05-02',
          range: '40-100%',
          deal: '王小虎'
        }, {
          parameter: 'LAMO VOLTAGE(紫外灯电压)',
          check: '2016-05-02',
          range: '750-1200V',
          deal: '王小虎'
        }
      ],
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
      ]
    }
  },

  watch: {
    paramsData: {
      deep: true,
      handler (data) {
        if (data) {
          this.formData = { ...this.formData, ...data }
          this.tableData[0].startTime = data.zeroSDT
          this.tableData[0].endTime = data.zeroEDT
          this.tableData[0].strengthShow = data.zeroShow
          this.tableData[0].strengthCal = data.zeroVal
          this.tableData[1].startTime = data.spanSDT
          this.tableData[1].endTime = data.spanEDT
          this.tableData[1].strengthShow = data.spanShow
          this.tableData[1].strengthCal = data.spanVal
          this.cureTableData[0].check = data.intt
          this.cureTableData[0].deal = data.inttResult
          this.cureTableData[1].check = data.rctt
          this.cureTableData[1].deal = data.rcttResult
          this.cureTableData[2].check = data.pres
          this.cureTableData[2].deal = data.presResult
          this.cureTableData[3].check = data.smplf
          this.cureTableData[3].deal = data.smplfResult
          this.cureTableData[4].check = data.lmpi
          this.cureTableData[4].deal = data.lmpiResult
          this.cureTableData[5].check = data.lmpv
          this.cureTableData[5].deal = data.lmpvResult
        }
      }
    }
  },

  created () {

  },

  methods: {
    // 处理编辑态
    handleChangeStatus (key) {
      if (this.editStatus) {
        return this.$message.warning('当前有内容正在编辑，请先保存后再点击编辑！')
      }
      this.editKey = key
      this.editStatus = true
    },

    // 点击保存图标
    handleSaveEdit () {
      this.editKey = ''
      this.editStatus = false
      // console.log('打印数据:', this.tableData)
    },

    // 处理输入框值的变化
    handleChangeInput(value, index, key, list) {
      const paramsKey = list[index][key]
      this.formData[paramsKey] = value
    }
  }
}
</script>

<style scoped lang='scss'>
  ::v-deep .el-table tbody tr:hover>td {
    background: #fff !important;
  }
  ::v-deep .el-descriptions-item__label {
    width: 240px;
    text-align: center !important;
    color: #909399 !important;
    font-weight: 600 !important;
  }
  ::v-deep .el-descriptions-item__content {
    text-align: center !important;
    background: #fff !important;
    color: black !important;
  }
  ::v-deep .el-descriptions__header {
    justify-content: center;
  }
</style>
