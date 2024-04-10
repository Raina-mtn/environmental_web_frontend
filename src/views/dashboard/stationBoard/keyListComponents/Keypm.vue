<template>
  <div class="container h-75vh overflow-auto p-16px bg-light-100">
    <div>
      <el-descriptions class="margin-top" title="（5030i 颗粒物）仪器运行状况检查 / 校准记录表" :column="3" border>
        <el-descriptions-item label="站点名称">
          {{ formData.dataName ? `${formData.dataName}(${formData.dataCode})` : '海创园科技站' }}
        </el-descriptions-item>
        <el-descriptions-item label="巡检日期">
          {{ formData.dataDay || '2024-02-26' }}
        </el-descriptions-item>
        <el-descriptions-item label="巡检人">
          {{ formData.gasSource ? `${formData.gasSource}(${formData.gasCode})` : '徐天' }}
        </el-descriptions-item>
        <el-descriptions-item label="PM10序列号">
          {{ formData.gasStd || '100121010' }}
        </el-descriptions-item>
        <el-descriptions-item label="PM2.5序列号" :span="2">
          {{ formData.gasFull || '202021251' }}
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
      cureHeader: [
        {
          prop: 'parameter',
          label: '检查项目',
          width: '240',
          notNeedEdit: true
        },
        {
          prop: 'check',
          label: '单位',
          notNeedEdit: true
        },
        {
          prop: 'range',
          label: 'PM10',
          notNeedEdit: true
        },
        {
          prop: 'deal',
          label: 'PM2.5',
          notNeedEdit: true
        }
      ],
      // 关键参数数据
      cureTableData: [
        {
          parameter: '大气环境温度',
          check: '°C',
          range: '15C°',
          deal: '17C°'
        }, {
          parameter: '样气温度',
          check: '°C',
          range: '25C°',
          deal: '11C°'
        },
        {
          parameter: '仪器内部温度',
          check: '°C',
          range: '13C°',
          deal: '25C°'
        },{
          parameter: '大气环境湿度',
          check: '%',
          range: '32',
          deal: '36'
        },{
          parameter: '样气相对湿度',
          check: '%',
          range: '59',
          deal: '56'
        }, {
          parameter: '仪器显示FLOW',
          check: 'L/min',
          range: '750',
          deal: '791'
        }, {
          parameter: '大气压',
          check: 'mmHg',
          range: '23',
          deal: '12'
        }, {
          parameter: '滤带使用情况',
          check: '----',
          range: '完好',
          deal: '完好'
        }, {
          parameter: '切割头清洗',
          check: '----',
          range: '优',
          deal: '优'
        }, {
          parameter: '仪器清理',
          check: '----',
          range: '优',
          deal: '优'
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
