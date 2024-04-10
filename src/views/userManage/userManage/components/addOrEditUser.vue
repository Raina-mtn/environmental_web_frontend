<template>
  <el-dialog
    :visible="isShow"
    :title="isEdit ? '编辑用户' : '添加用户'"
    :destroy-on-close="true"
    width="600px"
    @close="closeDialog()"
  >
    <div class="container">
      <div>
        <WForm
          ref="wform"
          class="h-300px"
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
import { apiAddUser,apiUpdateUser,apiGetOrganizationTree,apiGetAllRoleList } from "@/api/interface/userManage";
import { isPhone, isEmail } from "@/utils/validate.js";
import {apiGetStation} from '@/api/interface/user'
const validatePhone = (rule, value, callback) => {
  if (value && !isPhone(value)) {
    callback(new Error("请输入正确的手机号"));
  } else {
    callback();
  }
};

const validEmail = (rule, value, callback) => {
  if (value && !isEmail(value)) {
    callback(new Error("请输入正确的邮箱"));
  } else {
    callback();
  }
};

export default {
  components: {
    WForm,
  },
  data() {
    return {
      isShow:false,
      isEdit:false,
      formData: {
        roleId:1
      },
      parentList:[]
    };
  },
  computed:{
    formColumns(){
      return [
        {
          label: "姓名",
          prop: "username",
          el: "input",
          rules: [{ required: true, message: "请输入姓名" }],
          placeholder: "请输入姓名",
          clearable: true,
          span: 24,
        },
        {
          label: "手机号",
          prop: "phoneNumber",
          el: "input",
          rules: [
            { required: true, message: "请输入手机号" },
            { validator: validatePhone, trigger: "blur" }
          ],
          placeholder: "请输入手机号",
          clearable: true,
          span: 24,
        },
        {
          label: "密码",
          prop: "password",
          type:'password',
          el: "input",
          rules: [{ required: true, message: "请输入密码" }],
          placeholder: "请输入密码",
          clearable: true,
          span: 24,
        },
        {
          label: "所属部门",
          prop: "orgId",
          el: "cascader",
          rules: [{ required: true, message: "请选择所属部门" }],
          options: this.parentList,
          props:{
            label: 'name',
            children: 'subList',
            checkStrictly: true,
            value:'id',
            emitPath: false
          },
          'show-all-levels':true,
          placeholder: "请选择所属部门",
          clearable: true,
          span: 24,
        },
        {
          label: "授权站点",
          prop: "stationIdList",
          multiple:true,
          'multiple-limit':1,
          el: "wSelect",
          rules: [{ required: true, message: "请选择授权站点" }],
          // options:[{
          //   value:'1000000001',
          //   label:'西溪湿地站'
          // },],
          getList: async () => ({
            data: (await apiGetStation()).data,
          }),
          "value-key": {
            label: "stationName",
            value: "id",
          },
          placeholder: "请选择授权站点",
          clearable: true,
          span: 24,
        },
        // {
        //   label: "角色分配",
        //   prop: "roleId",
        //   el: "wSelect",
        //   'collapse-tags':true,
        //   rules: [{ required: true, message: "请选择角色分配" }],
        //   getList: async () => ({
        //     data: (await apiGetAllRoleList()).data,
        //   }),
        //   "value-key": {
        //     label: "roleName",
        //     value: "roleId",
        //   },
        //   placeholder: "请选择角色分配",
        //   clearable: true,
        //   span: 24,
        // },
        {
          label: "角色分配",
          prop: "roleId",
          el: "wSelect",
          'collapse-tags':true,
          disabled:true,
          rules: [{ required: true, message: "请选择角色分配" }],
          getList: async () => ({
            data: (await apiGetAllRoleList()).data,
          }),
          "value-key": {
            label: "roleName",
            value: "roleId",
          },
          placeholder: "请选择角色分配",
          clearable: true,
          span: 24,
        },
        {
          label: "邮箱",
          prop: "email",
          el: "input",
          placeholder: "请输入邮箱",
          clearable: true,
          rules: [
            { validator: validEmail, trigger: "blur" }
          ],
          span: 24,
        },
      ]
    }
  },
  methods: {
    openDialog(isEdit=false,record={}){
      apiGetOrganizationTree().then(res=>{
        this.parentList = [res.data]
      })
      this.formData = cloneDeep(record)
      this.formData.roleId = 1
      this.formData.orgId = Number(this.formData.orgId)
      this.formData.stationIdList = this.formData.stationIdList
      this.isShow = true
      this.isEdit = isEdit
    },
    closeDialog() {
      this.isShow = false
      this.formData={}
    },
    submit() {
      const api = this.isEdit?apiUpdateUser:apiAddUser
      this.$refs.wform.validate(async(valid) => {
        if (valid) {
          api(this.formData).then(res=>{
            this.$message.success(`${this.isEdit?'更新':'新增'}成功！`)
            this.$emit("getList");
            this.closeDialog()
          })
        }
      })
    },
  },
};
</script>