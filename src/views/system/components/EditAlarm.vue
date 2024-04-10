<template>
  <el-dialog
    :visible="isShow"
    :title="isEdit ? '编辑' : '新增'"
    :destroy-on-close="true"
    width="600px"
    @close="closeDialog()"
  >
    <div class="container">
      <div>
        <WForm
          ref="wform"
          label-width="130px"
          :form-data="formData"
          :columns="formColumns"
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
import { editRule } from '@/api/interface/system-alarm'
const checkNum = (rule, value, callback) => {
  // if (!value) {
  //   return callback(new Error('请输入'))
  // }
  if (!Object.prototype.toString.call(value) === '[object Number]' || isNaN(value)) {
    callback(new Error('请输入数字值'))
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
      formData: {
      }
    };
  },
  computed:{
    formColumns(){
      return [
        {
          label: "阈值（上限）",
          prop: "maxValue",
          el: "input",
          rules: [{ required: false, message: "请输入" },
            { validator: checkNum, trigger: "blur" }],
          placeholder: "请输入",
          clearable: true,
          append: true,
          appendText: this.formData.dataUnit,
          span: 24,
        },
        {
          label: "阈值（下限）",
          prop: "minValue",
          el: "input",
          rules: [{ required: false, message: "请输入" },
            { validator: checkNum, trigger: "blur" }],
          placeholder: "请输入",
          clearable: true,
          append: true,
          appendText: this.formData.dataUnit,
          span: 24,
        },
      ]
    }
  },
  methods: {
    openDialog(record={}, isEdit=true){
      this.formData = cloneDeep(record)
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
            if (this.formData.minValue && this.formData.maxValue) {
              if (Number(this.formData.minValue) < Number(this.formData.maxValue)) {
                editRule(this.formData).then(res=>{
                  this.$message.success(`更新成功！`)
                  this.$emit("onSuccess");
                  this.closeDialog()
                })
              } else {
                this.$message.warning('下限阈值不应超过上限阈值!')
              }
            } else {
              editRule(this.formData).then(res=>{
                this.$message.success(`更新成功！`)
                this.$emit("onSuccess");
                this.closeDialog()
              })
            }
            
          }
          // else {
          //   add(this.formData).then(res=>{
          //     this.$message.success(`新增成功！`)
          //     this.$emit("getList");
          //     this.closeDialog()
          //   })
          // }
        }
      })
    },
  },
};
</script>
