<template>
  <el-dialog width="25%" :visible="isShow" title="编辑机器人" :destroy-on-close="true" @close="closeDialog()">
    <div>
      <WForm
        ref="wform"
        :form-data="formData"
        :columns="formColumns"
        size="mini"
      >
        <template #img>
          <ImageUpload v-model="formData.url" tips="支持格式：jpg、png.jpeg、最大不超过10M，可上传一张图片" />
        </template>
      </WForm>
    </div>
    <template #footer>
      <el-button size="mini" class="cancelButton" @click="isShow = false">
        关闭
      </el-button>
      <el-button size="mini" class="confirmButton" type="primary" @click="submit">
        保存
      </el-button>
    </template>
  </el-dialog>
</template>
<script>

import { WForm } from "@common-ui/w-form";
import { cloneDeep } from 'lodash-es'
import {apiUpdateEquipment} from '@/api/interface/equipment'
import ImageUpload from '@/components/ImageUpload.vue';
export default {
  components:{
    WForm,
    ImageUpload
  },
  data() {
    return {
      isShow:false,
      formColumns:[{
        label: '机器人名称',
        prop: 'equipmentName',
        // el: 'wSelect',
        el: 'input',
        rules:[{ required: true, message: "请选择机器人名称" }],
        // getList: async () => ({
        //   // data: (await getCompanyList()).data,
        // }),
        // 'value-key': {
        //   label: 'name',
        //   value: 'id'
        // },
        placeholder: '请选择机器人名称',
        clearable: true,
        span: 24
      },{
        label: '机器人编号',
        prop: 'equipmentCode',
        el: 'input',
        rules:[{ required: true, message: "请选择机器人编号" }],
        placeholder: '请选择机器人编号',
        clearable: true,
        span: 24
      },{
        label: '机器人类型',
        prop: 'equipmentTypeId',
        el: 'select',
        rules:[{ required: true, message: "请选择机器人类型" }],
        options:[
          {
            label:'导轨机器人',
            value:"4"
          }
        ],
        // getList: async () => ({
        //   // data: (await getCompanyList()).data,
        // }),
        // 'value-key': {
        //   label: 'name',
        //   value: 'id'
        // },
        placeholder: '请选择机器人类型',
        clearable: true,
        span: 24
      },{
        label: '功能说明',
        prop: 'descInChinese',
        el: 'input',
        type:'textarea',
        placeholder: '请输入功能说明',
        clearable: true,
        span: 24
      },{
        label: '机器人图片',
        prop: 'img',
        span: 24,
        // rules: [
        //   { required: true, message: '请上传机器人图片' }
        // ],
      }],
      formData:{},
    }
  },
  methods: {
    openDialog(record){
      this.formData = cloneDeep(record)
      this.isShow = true
    },
    closeDialog(){
      this.isShow = false
      this.formData = {}
    },
    submit(){
      this.$refs.wform.validate((valid) => {
        if (valid) {
          const api = apiUpdateEquipment
          api(this.formData).then(res=>{
            this.$message.success(`编辑成功!`)
            this.$emit('refresh')
            this.closeDialog()
          })
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
</style>