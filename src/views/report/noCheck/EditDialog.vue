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
        <el-descriptions class="margin-top" title="（NO）仪器精密度审核记录表" :column="2" border>
          <el-descriptions-item label="仪器名称及序列号">
            {{ formData.dataName ? `${formData.dataName}(${formData.dataCode})` : '' }}
          </el-descriptions-item>
          <el-descriptions-item label="审核日期">
            {{ formData.dataDay || '' }}
          </el-descriptions-item>
          <el-descriptions-item label="标气来源及编号">
            {{ formData.gasSource ? `${formData.gasSource}(${formData.gasCode})` : '' }}
          </el-descriptions-item>
          <el-descriptions-item label="分析仪量程" :span="2">
            {{ formData.gasFull || '' }}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" :column="1" border>
          <el-descriptions-item label="通入仪器标气浓度">
            {{ formData.sampConc || '' }}
          </el-descriptions-item>
        </el-descriptions>
        <div class="device flex w-full">
          <div class="device-title text-center">仪器响应值</div>
          <div class="device-list flex justify-between">
            <div v-for="(item, index) in deviceList" :key="index"  class="device-item w-1/6">
              {{ item }}
            </div>
          </div>
        </div>
        <el-descriptions class="margin-top" :column="1" border>
          <el-descriptions-item label="相对标准偏差">
            {{ formData.rsd || '' }}
          </el-descriptions-item>
          <el-descriptions-item label="审核结果">
            <el-radio v-model="formData.chkRes" label="1">合格</el-radio>
            <el-radio v-model="formData.chkRes" label="2">不合格</el-radio>
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" :column="1" border>
          <el-descriptions-item label="备注">
            <span v-if="!editStatus || editKey !== 'ps'">{{ formData.ps }}</span>
            <el-input v-if="editKey === 'ps' && editStatus" v-model="formData.ps" size="small" maxlength="20" style="width: 80%;" />
            <i v-if="!editStatus" class="el-icon-edit-outline ml-6px" @click="handleChangeStatus('ps')" />
            <i v-if="editKey === 'ps' && editStatus" class="el-icon-collection ml-6px" @click="handleSaveEdit" />
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
import { gasPrecisionDetail, gasPrecisionUpdate } from '@/api/interface/report'

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
      checkedNo: false,
      formData: {
        gasFull: '500ppb'
      },
      deviceList: ['--', '--', '--', '--', '--', '--']
    };
  },
  computed:{
  },
  created() {
    // this.onGetReportDetail()
  },
  methods: {
    onGetReportDetail () {
      gasPrecisionDetail('nox', { id: this.reportId }).then(({data}) => {
        this.formData = { ...this.formData, ...data }
        this.deviceList[0] = data.resShow1
        this.deviceList[1] = data.resShow2
        this.deviceList[2] = data.resShow3
        this.deviceList[3] = data.resShow4
        this.deviceList[4] = data.resShow5
        this.deviceList[5] = data.resShow6
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
      gasPrecisionUpdate('nox', this.formData).then(res=>{
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
    border-left: 1px solid #EBEEF5;
    border-right: 1px solid #EBEEF5;
  }

  .device-title {
    width: 240px;
    padding: 12px 10px;
    background: #fafafa;
  }

  .device-list {
    flex: auto;
  }

  .device-item {
    padding: 12px 10px;
    border-left: 1px solid #EBEEF5;
    text-align: center;
  }
</style>
