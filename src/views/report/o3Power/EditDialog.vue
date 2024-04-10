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
        <el-descriptions class="margin-top" title="臭氧校准设备量值传递记录表" :column="2" border>
          <el-descriptions-item label="臭氧校准设备（工作标准）型号及编号">
            {{ formData.dataName ? `${formData.dataName}(${formData.dataCode})` : '' }}
          </el-descriptions-item>
          <el-descriptions-item label="量值传递日期">
            {{ formData.dataDay || '' }}
            <!-- <span v-if="!editStatus || editKey !== 'dataDay'">{{ formData.dataDay || '' }}</span>
            <el-input v-if="editKey === 'dataDay' && editStatus" v-model="formData.dataDay" size="small" maxlength="20" style="width: 80%;" />
            <i v-if="!editStatus" class="el-icon-edit-outline ml-6px" @click="handleChangeStatus('dataDay')" />
            <i v-if="editKey === 'dataDay' && editStatus" class="el-icon-collection ml-6px" @click="handleSaveEdit" /> -->
          </el-descriptions-item>
          <el-descriptions-item label="臭氧传递标准型号及编号">
            {{ formData.gasSource ? `${formData.gasSource}(${formData.gasCode})` : '' }}
          </el-descriptions-item>
          <el-descriptions-item label="传递标准溯源日期">
            {{ formData.gasStd || '' }}
            <!-- <span v-if="!editStatus || editKey !== 'gasStd'">{{ formData.gasStd || '' }}</span>
            <el-input v-if="editKey === 'gasStd' && editStatus" v-model="formData.gasStd" size="small" maxlength="20" style="width: 80%;" />
            <i v-if="!editStatus" class="el-icon-edit-outline ml-6px" @click="handleChangeStatus('gasStd')" />
            <i v-if="editKey === 'gasStd' && editStatus" class="el-icon-collection ml-6px" @click="handleSaveEdit" /> -->
          </el-descriptions-item>
          <el-descriptions-item label="传递臭氧检测仪型号及编号" :span="2">
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
        <div class="device flex w-full">
          <div class="device-title text-center">校准曲线</div>
          <div class="device-list flex justify-between">
            <div class="device-item">
              1
            </div>
          </div>
        </div>
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
      pointHeader: [
        {
          prop: 'point',
          label: '校准点',
          width: '240',
          notNeedEdit: true
        },
        {
          prop: 'startTime',
          label: '传递标准输出浓度（nmol/mol）',
          notNeedEdit: true
        },
        {
          prop: 'endTime',
          label: '传递用监测仪示值（nmol/mol）',
          notNeedEdit: true
        },
        {
          prop: 'standard',
          label: '工作标准输出浓度（nmol/mol）',
          notNeedEdit: true
        },
        {
          prop: 'strengthShow',
          label: '传递用监测仪示值（nmol/mol）',
          notNeedEdit: true
        },
        {
          prop: 'strengthCal',
          label: '传递用监测仪示值对应的标准值（nmol/mol）',
          notNeedEdit: true
        }
      ],
      tableData: [
        {
          point: '零点',
          startTime: '5',
          endTime: '5',
          standard: '0',
          strengthShow: '23',
          strengthCal: '111'
        },
        {
          point: '满量程的10%',
          startTime: '5',
          endTime: '5',
          standard: '400',
          strengthShow: '43',
          strengthCal: '111'
        },
        {
          point: '满量程的20%',
          startTime: '5',
          endTime: '5',
          standard: '400',
          strengthShow: '22',
          strengthCal: '111'
        },
        {
          point: '满量程的40%',
          startTime: '5',
          endTime: '5',
          standard: '400',
          strengthShow: '12',
          strengthCal: '111'
        },
        {
          point: '满量程的60%',
          startTime: '5',
          endTime: '5',
          standard: '400',
          strengthShow: '45',
          strengthCal: '111'
        },
        {
          point: '满量程的80%',
          startTime: '5',
          endTime: '5',
          standard: '400',
          strengthShow: '65',
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
        this.tableData[0].startTime = data.zeroSDT
        this.tableData[0].endTime = data.zeroEDT
        this.tableData[0].strengthShow = data.zeroShow
        this.tableData[0].strengthCal = data.zeroVal
        this.tableData[1].startTime = data.spanSDT
        this.tableData[1].endTime = data.spanEDT
        this.tableData[1].strengthShow = data.spanShow
        this.tableData[1].strengthCal = data.spanVal
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

  .device {
    width: 100%;
    border-top: 1px solid #EBEEF5;
    border-left: 1px solid #EBEEF5;
    border-right: 1px solid #EBEEF5;
    background: #fafafa;
  }

  .device-title {
    width: 240px;
    padding: 12px 10px;
    margin: auto 0;
  }

  .borderB {
    border-bottom: 1px solid #EBEEF5;
  }

  .device-list {
    flex: auto;
    background: #fff;
  }

  .device-item {
    padding: 12px 10px;
    border-left: 1px solid #EBEEF5;
    text-align: center;
  }
</style>
