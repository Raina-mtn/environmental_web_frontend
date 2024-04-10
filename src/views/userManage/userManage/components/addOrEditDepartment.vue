<template>
  <el-dialog
    :visible="isShow"
    :title="isEdit ? '添加部门' : '编辑部门'"
    :destroy-on-close="true"
    width="600px"
    @close="closeDialog()"
  >
    <div class="container">
      <div>
        <WForm
          ref="wform"
          class="h-200px"
          label-width="130px"
          :form-data="formData"
          :columns="formColumns"
          size="mini"
        />
      </div>
    </div>
    <template #footer>
      <el-button type="primary" size="mini" @click="closeDialog()">
        关闭
      </el-button>
      <el-button type="primary" size="mini" @click="submit()">
        保存
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import {apiGetOrganizationTree,apiCreateOrganizationTree,apiUpdateOrganizationTree} from '@/api/interface/userManage'
import { WForm } from "@common-ui/w-form";
import { cloneDeep } from 'lodash-es'
export default {
  components: {
    WForm,
  },
  data() {
    return {
      isShow:false,
      isEdit:false,
      formData: {},
      parentList:[]
    };
  },
  computed:{
    formColumns(){
      return [
        {
          label: "部门名称",
          prop: "name",
          el: "input",
          rules: [{ required: true, message: "请输入部门名称" }],
          placeholder: "请输入部门名称",
          clearable: true,
          span: 24,
        },
        {
          label: "上级部门",
          prop: "parentId",
          el: "cascader",
          options: this.parentList,
          props:{
            label: 'name',
            children: 'subList',
            checkStrictly: true,
            value:'id',
            emitPath: false
          },
          'show-all-levels':true,
          placeholder: "请选择上级部门",
          clearable: true,
          span: 24,
        },
        {
          label: "负责人",
          prop: "charger",
          el: "input",
          placeholder: "请输入负责人",
          clearable: true,
          span: 24,
        },
        {
          label: "备注",
          prop: "memo",
          el: "input",
          type: "textarea",
          placeholder: "请输入备注",
          clearable: true,
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
      this.isShow = true
      this.isEdit = isEdit
    },
    closeDialog() {
      this.isShow = false
      this.formData={}
    },
    submit() {
      const api = this.isEdit?apiUpdateOrganizationTree:apiCreateOrganizationTree
      this.$refs.wform.validate(async(valid) => {
        if (valid) {
          api(this.formData).then(()=>{
            this.$message.success(`${this.isEdit?'更新':'新增'}成功！`)
            this.$emit('getTree')
            this.closeDialog()
          })
        }
      })
    },
  },
};
</script>