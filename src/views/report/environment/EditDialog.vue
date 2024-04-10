<template>
  <el-dialog
    :visible="isShow"
    title="编辑"
    :destroy-on-close="true"
    width="72%"
    top="30px"
    @close="closeDialog()"
  >
    <div class="container h-65vh overflow-auto pr-16px">
      <div>
        <el-descriptions class="margin-top" title="站点环境巡检记录" :column="2" border />
        <el-table
          :data="cureTableData"
          align="center"
          border
          style="width: 100%"
          :span-method="arraySpanMethod"
        >
          <el-table-column
            v-for="item in cureHeader"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            align="left"
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
          <el-descriptions-item label="异常情况及处理说明">
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
          prop: 'omContentId',
          label: '序号',
          width: '60',
          notNeedEdit: true
        },
        {
          prop: 'omContent',
          label: '巡查内容',
          notNeedEdit: true
        },
        {
          prop: 'range',
          label: '正常',
          width: '80',
          notNeedEdit: false
        },
        {
          prop: 'deal',
          label: '异常',
          width: '80',
          notNeedEdit: false
        }
      ],
      cureTableData: [
        {
          omContentId: 0,
          omContent: '站房外部及周边'
        },
        {
          omContentId: 1,
          omContent: '点位周围环境变化情况'
        },
        {
          omContentId: 2,
          omContent: '点位周围安全隐患'
        },
        {
          omContentId: 3,
          omContent: '点位周围道路、供电线路、通讯线路、给排水设施完好或损坏状况'
        },
        {
          omContentId: 4,
          omContent: '站房外围的防护栏、隔离带有无损坏情况'
        },
        {
          omContentId: 5,
          omContent: '周围树木是否需要修剪'
        },
        {
          omContentId: 6,
          omContent: '站房防雷接地是否完好'
        },
        {
          omContentId: 7,
          omContent: '站房屋顶是否完好、有无漏雨'
        },
        {
          omContentId: 77,
          omContent: '站房内部'
        },
        {
          omContentId: 8,
          omContent: '站房环境卫生是否合格'
        },
        {
          omContentId: 9,
          omContent: '消防器材是否在使用有效期内'
        },
        {
          omContentId: 10,
          omContent: '站房内部的供电、通讯是否畅通'
        },
        {
          omContentId: 11,
          omContent: '数采仪工作是否正常、工控机显示数据与仪器数据是否一致'
        },
        {
          omContentId: 12,
          omContent: '视频系统工作是否正常'
        },
        {
          omContentId: 13,
          omContent: '站房内有无异常声音'
        },
        {
          omContentId: 14,
          omContent: '站房内有无异常气味'
        },
        {
          omContentId: 15,
          omContent: '室内温度、湿度是否符合要求（空调系统）'
        },
        {
          omContentId: 16,
          omContent: '气体采样管路是否由于室外温差产生冷凝水'
        },
        {
          omContentId: 17,
          omContent: '排风扇是否正常运行'
        },
        {
          omContentId: 18,
          omContent: '稳压电源、UPS参数是否正常'
        },
        {
          omContentId: 19,
          omContent: '各电源插头、线板工作是否正常'
        },
        {
          omContentId: 20,
          omContent: '仪器气泵工作是否正常'
        },
        {
          omContentId: 21,
          omContent: '检查钢瓶及减压阀安全情况'
        },
        {
          omContentId: 22,
          omContent: '检查采样总管和支管有无冷凝水和污物'
        }
      ],
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
    };
  },
  computed:{
  },
  created() {
    // this.onGetReportDetail()
  },
  methods: {
    onGetReportDetail () {
      gasDetail('so2', { id: this.reportId }).then(({data}) => {
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
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 || rowIndex === 8) {
        if (columnIndex === 1) {
          return [1, 4];
        } else if (columnIndex === 0) {
          return [0, 0];
        }
      }
    },
    submit() {
      if (this.editStatus) {
        return this.$message.warning('请先保存编辑项后再提交！')
      }
      gasUpdate('so2', this.formData).then(res=>{
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
