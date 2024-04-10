<template>
  <el-dialog
    :visible="isShow"
    :title="isEdit ? '编辑' : '新增'"
    :destroy-on-close="true"
    width="600px"
    top="50px"
    @close="closeDialog()"
  >
    <div class="container">
      <div>
        基本信息
        <WForm
          ref="wform"
          label-width="140px"
          :form-data="formData"
          :columns="basisFormColumns"
          size="mini"
        />
        质控参数
        <WForm
          ref="wform"
          label-width="140px"
          :form-data="formData"
          :columns="paramsFormColumns"
          size="mini"
        />
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
import { WForm } from "@common-ui/w-form";
import { cloneDeep } from 'lodash-es'
import { add, update,apiGetData,apigetDict,apigetInstrumentDict } from '@/api/interface/system-quality'
const checkNum = (rule, value, callback) => {
  if (!Object.prototype.toString.call(value) === '[object Number]') {
    callback(new Error('请输入数字值'))
  }
  if (value&&(value < 1 || value > 999)) {
    callback(new Error('请输入1~999之间的数字'))
  }
  callback()
}
const checkLength = (rule, value, callback) => {
  if (value.length>128) {
    callback(new Error('长度不可超过128个字符'))
  }
  callback()
}
export default {
  components: {
    WForm,
  },
  data() {
    return {
      isShow:false,
      isEdit:false,
      formData: {}
    };
  },
  computed:{
    basisFormColumns(){
      return [
        {
          label: "编号",
          prop: "qcExternalCode",
          el: "input",
          rules: [{ validator: checkLength, trigger: "blur" },{ required: true, message: "请输入编号" }],
          placeholder: "请输入编号",
          clearable: true,
          span: 24,
        },
        {
          label: "质控类型",
          prop: "qcType",
          rules: [{ required: true, message: "请选择质控类型", trigger: "blur" }],
          getList: async () => ({
            data: (await apigetDict()).data,
          }),
          el: "wSelect",
          "value-key": {
            label: "value",
            value: "key",
          },
          placeholder: "请选择质控类型",
          clearable: true,
          span: 24,
        },
        {
          label: "质控仪器",
          prop: "instrumentId",
          rules: [{ required: true, message: "请选择质控仪器", trigger: "blur" }],
          getList: async () => ({
            data: (await apigetInstrumentDict()).data,
          }),
          el: "wSelect",
          "value-key": {
            label: "value",
            value: "key",
          },
          placeholder: "请选择质控仪器",
          clearable: true,
          span: 24,
        },
        {
          label: "质控名称",
          prop: "qcName",
          el: "input",
          rules: [{ validator: checkLength, trigger: "blur" },{ required: true, message: "请输入质控名称" }],
          placeholder: "请输入质控名称",
          clearable: true,
          span: 24,
        },
        {
          label: "质控周期",
          prop: "qcCycleTime",
          el: "input",
          rules: [{ required: true, message: "请输入质控周期" },
            { validator: checkNum, trigger: "blur" }],
          placeholder: "请输入1~365",
          clearable: true,
          append: true,
          appendText: '天 / 次',
          span: 24,
        },
        {
          label: "质控内容",
          prop: "qcContent",
          type: "textarea",
          el: "input",
          placeholder: "请输入质控内容",
          clearable: true,
          rules: [{ validator: checkLength, trigger: "blur" },{ required: true, message: "请输入质控内容", trigger: "blur" }],
          span: 24,
        },
      ]
    },
    paramsFormColumns(){
      return [
        {
          label: "通零气时长",
          prop: "zeroPassDuration",
          el: "input",
          placeholder: "请输入通零气时长",
          clearable: true,
          append: true,
          rules: [{ validator: checkNum, trigger: "blur" }],
          appendText: '分钟',
          span: 24,
        },
        {
          label: "零气标准浓度",
          prop: "zeroStandardConcentration",
          el: "input",
          placeholder: "请输入零气标准浓度",
          rules: [{ validator: checkNum, trigger: "blur" }],
          clearable: true,
          span: 24,
        },
        {
          label: "零点允许误差（+）",
          prop: "zeroAllowInaccuracy",
          el: "input",
          rules: [{ validator: checkNum, trigger: "blur" }],
          placeholder: "请输入零点允许误差（+）",
          clearable: true,
          span: 24,
        },
        {
          label: "通跨度气时长",
          prop: "spanPassDuration",
          el: "input",
          placeholder: "请输入通跨度气时长",
          rules: [{ validator: checkNum, trigger: "blur" }],
          clearable: true,
          append: true,
          appendText: '分钟',
          span: 24,
        },
        {
          label: "跨度气标准浓度",
          prop: "spanStandardConcentration",
          el: "input",
          placeholder: "请输入跨度气标准浓度",
          rules: [{ validator: checkNum, trigger: "blur" }],
          clearable: true,
          span: 24,
        },
        {
          label: "跨度允许误差(+)",
          prop: "spanAllowInaccuracy",
          el: "input",
          rules: [{ validator: checkNum, trigger: "blur" }],
          placeholder: "请输入跨度允许误差(+)",
          clearable: true,
          span: 24,
        },
      ]
    },
  },
  methods: {
    async openDialog(id='',isEdit=false){
      if(isEdit){
        try {
          const record = (await apiGetData(id)).data || {}
          record.instrumentId = String(record.instrumentId)
          record.qcType = String(record.qcType)
          this.formData = cloneDeep(record)
        } catch (error) {
          console.log('error :>> ', error);
        }
      }
      this.isShow = true
      this.isEdit = isEdit
    },
    closeDialog() {
      this.isShow = false
      this.formData={}
    },
    submit() {
      this.$refs.wform.validate(async(valid) => {
        if (valid) {
          if (this.isEdit) {
            update(this.formData).then(res=>{
              this.$message.success(`更新成功！`)
              this.$emit("getList");
              this.closeDialog()
            })
          } else {
            add(this.formData).then(res=>{
              this.$message.success(`新增成功！`)
              this.$emit("getList");
              this.closeDialog()
            })
          }
        }
      })
    },
  },
};
</script>
