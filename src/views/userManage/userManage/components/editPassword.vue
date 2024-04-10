<template>
  <el-dialog
    :visible="isShow"
    title="修改密码"
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
import {apiChangePassword} from '@/api/interface/userManage'
import { cloneDeep } from 'lodash-es'
export default {
  components: {
    WForm,
  },
  data() {
    let checkPwd1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不可以为空"));
      } else if (value == this.formData.oldPassword) {
        callback(new Error("新旧密码不可以相同!"));
      } else {
        callback();
      }
    };
    let checkPwd2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不可以为空"));
      } else if (value !== this.formData.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else if (value == this.formData.oldPassword) {
        callback(new Error("新旧密码不可以相同!"));
      } else {
        callback();
      }
    };
    return {
      isShow:false,
      formData: {},
      formColumns: [
        {
          label: "旧密码",
          prop: "password",
          el: "input",
          rules: [{ required: true, message: "请输旧密码" }],
          placeholder: "请输入旧密码",
          clearable: true,
          span: 24,
        },
        {
          label: "新密码",
          prop: "newPassword",
          el: "input",
          rules: [{ required: true, validator: checkPwd1, trigger: "blur" }],
          placeholder: "请输入新密码",
          clearable: true,
          span: 24,
        },
        {
          label: "确认新密码",
          prop: "confirmNewPassword",
          el: "input",
          rules: [{ required: true, validator: checkPwd2, trigger: "blur" }],
          placeholder: "请输入新密码",
          clearable: true,
          span: 24,
        },
      ],
    };
  },
  methods: {
    openDialog(record={}){
      this.formData = cloneDeep(record)
      this.isShow = true
    },
    closeDialog() {
      this.isShow = false
      this.formData={}
    },
    submit() {
      this.formData.userId = this.formData.id
      this.formData.oldPassword = this.formData.password
      this.$refs.wform.validate(async(valid) => {
        if (valid) {
          apiChangePassword(this.formData).then(()=>{
            this.$refs.success('修改密码成功！')
          })
        }
      })
    },
  },
};
</script>