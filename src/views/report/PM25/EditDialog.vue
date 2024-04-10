<template>
  <el-dialog
    :visible="isShow"
    title="编辑"
    :destroy-on-close="true"
    width="72%"
    top="30px"
    @close="closeDialog()"
  >
    <div class="container h-72vh overflow-auto p-16px bg-light-100">
      <div>
        <el-descriptions class="margin-top" title="β射线颗粒物日常巡检记录表（PM₂.₅)" :column="3" border>
          <el-descriptions-item label="站点名称">
            {{ formData.dataName ? `${formData.dataName}(${formData.dataCode})` : '海创园科技站' }}
          </el-descriptions-item>
          <el-descriptions-item label="巡检日期">
            {{ formData.dataDay || '2024-02-26' }}
          </el-descriptions-item>
          <el-descriptions-item label="巡检人">
            <span v-if="!editStatus || editKey !== 'gasSource'">{{ formData.gasSource }}</span>
            <el-input v-if="editKey === 'gasSource' && editStatus" v-model="formData.gasSource" size="small" maxlength="20" style="width: 80%;" />
            <i v-if="!editStatus" class="el-icon-edit-outline ml-6px" @click="handleChangeStatus('gasSource')" />
            <i v-if="editKey === 'gasSource' && editStatus" class="el-icon-collection ml-6px" @click="handleSaveEdit" />
          </el-descriptions-item>
          <el-descriptions-item label="PM₂.₅序列号">
            {{ formData.gasStd || '100121010' }}
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
          <el-descriptions-item label="滤带使用情况">
            <span v-if="!editStatus || editKey !== 'dataName1'">{{ formData.dataName1}}</span>
            <el-input v-if="editKey === 'dataName1' && editStatus" v-model="formData.dataName" size="small" maxlength="20" style="width: 80%;" />
            <i v-if="!editStatus" class="el-icon-edit-outline ml-6px" @click="handleChangeStatus('dataName1')" />
            <i v-if="editKey === 'dataName1' && editStatus" class="el-icon-collection ml-6px" @click="handleSaveEdit" />
          </el-descriptions-item>
          <el-descriptions-item label="切割头清洗">
            <span v-if="!editStatus || editKey !== 'clear'">{{ formData.clear }}</span>
            <el-input v-if="editKey === 'clear' && editStatus" v-model="formData.clear" size="small" maxlength="20" style="width: 80%;" />
            <i v-if="!editStatus" class="el-icon-edit-outline ml-6px" @click="handleChangeStatus('clear')" />
            <i v-if="editKey === 'gasSoclearurce' && editStatus" class="el-icon-collection ml-6px" @click="handleSaveEdit" />
          </el-descriptions-item>
          <el-descriptions-item label="仪器清理">
            <span v-if="!editStatus || editKey !== 'gasSource'">{{ formData.gasSource }}</span>
            <el-input v-if="editKey === 'gasSource' && editStatus" v-model="formData.gasSource" size="small" maxlength="20" style="width: 80%;" />
            <i v-if="!editStatus" class="el-icon-edit-outline ml-6px" @click="handleChangeStatus('gasSource')" />
            <i v-if="editKey === 'gasSource' && editStatus" class="el-icon-collection ml-6px" @click="handleSaveEdit" />
          </el-descriptions-item>
          <el-descriptions-item label="备注">
            <span v-if="!editStatus || editKey !== 'commentResult'">{{ formData.commentResult }}</span>
            <el-input v-if="editKey === 'commentResult' && editStatus" v-model="formData.commentResult" size="small" maxlength="20" style="width: 80%;" />
            <i v-if="!editStatus" class="el-icon-edit-outline ml-6px" @click="handleChangeStatus('commentResult')" />
            <i v-if="editKey === 'commentResult' && editStatus" class="el-icon-collection ml-6px" @click="handleSaveEdit" />
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <template #footer>
      <el-button size="mini" @click="closeDialog()">
        关闭
      </el-button>
      <el-button type="primary" size="mini" @click="submit()">
        保存
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
// import { cloneDeep } from 'lodash-es'
import { gasDetail, gasUpdate } from '@/api/interface/report'

export default {
  components: {
  },
  data() {
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
          label: '检查值',
          notNeedEdit: true
        },
        {
          prop: 'deal',
          label: '正常范围',
          notNeedEdit: true
        },
        {
          prop: 'result',
          label: '结论',
          notNeedEdit: true
        }
      ],
      cureTableData: [
        {
          parameter: '大气环境温度',
          check: '°C',
          range: '15',
          deal: '-30.0~60.0'
        }, {
          parameter: '样气温度',
          check: '°C',
          range: '25',
          deal: '5.0~60.0'
        },
        {
          parameter: '机箱温度',
          check: '°C',
          range: '13',
          deal: '5.0~60.0'
        },{
          parameter: '大气环境湿度',
          check: '%',
          range: '32',
          deal: '5.0~100.0'
        },{
          parameter: '样气相对湿度 RH',
          check: '%',
          range: '59',
          deal: '5.0~95.0'
        }, {
          parameter: '样气流量',
          check: 'L/min',
          range: '750',
          deal: '16.25~17.09'
        }, {
          parameter: '大气压',
          check: 'mmHg',
          range: '23',
          deal: '400~800'
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
  computed:{
  },
  created() {
    // this.onGetReportDetail()
  },
  methods: {
    onGetReportDetail () {
      gasDetail('o3', { id: this.reportId }).then(({data}) => {
        this.formData = { ...this.formData, ...data }
        this.tableData[0].startTime = data.zeroSDT
        this.tableData[0].endTime = data.zeroEDT
        this.tableData[0].strengthShow = data.zeroShow
        this.tableData[0].strengthCal = data.zeroVal
        this.tableData[1].startTime = data.spanSDT
        this.tableData[1].endTime = data.spanEDT
        this.tableData[1].strengthShow = data.spanShow
        this.tableData[1].strengthCal = data.spanVal
        this.cureTableData[0].check = data.flowa
        this.cureTableData[0].deal = data.flowaResult
        this.cureTableData[1].check = data.flowb
        this.cureTableData[1].deal = data.flowbResult
        this.cureTableData[2].check = data.cellai
        this.cureTableData[2].deal = data.cellaiResult
        this.cureTableData[3].check = data.cellbi
        this.cureTableData[3].deal = data.cellbiResult
        this.cureTableData[4].check = data.pres
        this.cureTableData[4].deal = data.presResult
        this.cureTableData[5].check = data.bncht
        this.cureTableData[5].deal = data.bnchtResult
        this.cureTableData[6].check = data.o3lt
        this.cureTableData[6].deal = data.o3ltResult
      })
    },

    openDialog(id='', isEdit=false){
      this.reportId = id
      this.isShow = true
      this.isEdit = isEdit
      this.onGetReportDetail()
    },
    closeDialog() {
      this.isShow = false
      this.editStatus = false
      this.formData={
        gasFull: '500ppb'
      }
    },
    submit() {
      if (this.editStatus) {
        return this.$message.warning('请先保存编辑项后再提交！')
      }
      gasUpdate('o3', this.formData).then(res=>{
        this.$message.success(`更新成功！`)
        this.$emit("getList");
        this.closeDialog()
      })
    },
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
  },
}
</script>
<style lang="scss" scoped>
  ::v-deep .el-table tbody tr:hover>td {
    background: #fff !important
  }
  ::v-deep .el-descriptions-item__label {
    width: 204px;
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
