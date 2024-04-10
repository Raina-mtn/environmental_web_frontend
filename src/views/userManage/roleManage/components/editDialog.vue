<template>
  <el-dialog
    :visible="isShow"
    title="编辑"
    :destroy-on-close="true"
    width="500px"
    @close="closeDialog()"
  >
    <div class="container">
      <div>
        <WForm
          ref="wform"
          class="h-150px"
          label-width="130px"
          :form-data="formData"
          :columns="formColumns"
          size="mini"
        />
      </div>
    </div>
    <template #footer>
      <el-button type="primary" size="mini" @click="close()">
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
import {apiUpdateRole} from '@/api/interface/userManage'
import { cloneDeep } from 'lodash-es'
export default {
  components: {
    WForm,
  },
  data() {
    return {
      formData: {},
      formColumns: [
        {
          label: "角色名称",
          prop: "roleName",
          el: "input",
          placeholder: "请输入角色名称",
          rules: [{ required: true, message: "请输入角色名称" }],
          clearable: true,
          span: 24,
        },
        {
          label: "角色描述",
          prop: "roleDesc",
          el: "input",
          type: "textarea",
          placeholder: "请输入角色描述",
          clearable: true,
          span: 24,
        },
      ],
      isShow:false
    };
  },
  methods: {
    openDialog(record={}){
      this.formData = cloneDeep(record)
      delete this.formData.status
      this.isShow = true
    },
    closeDialog() {
      this.isShow = false
      this.formData={}
    },
    submit() {
      this.$refs.wform.validate(async(valid) => {
        if (valid) {
          apiUpdateRole(this.formData).then(()=>{
            this.$message.success('修改成功！')
            this.closeDialog()
            this.$emit('getList')
          })
        }
      })
    },
  },
};
</script>