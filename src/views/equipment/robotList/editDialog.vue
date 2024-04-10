<template>
  <el-dialog width="40%" :visible="isShow" :title="isEdit?'编辑机器人':'新增机器人'" top="50px" :destroy-on-close="true" @close="closeDialog()">
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
import {apiUpdateEquipment,apiAddEquipment} from '@/api/interface/equipment'
import ImageUpload from '@/components/ImageUpload.vue';
export default {
  components:{
    WForm,
    ImageUpload
  },
  data() {
    return {
      isShow:false,
      isEdit:true,
      formColumns:[{
        label: '机器人名称',
        prop: 'equipmentName',
        // el: 'wSelect',
        el: 'input',
        rules:[{ required: true, message: "请输入机器人名称" },
          { max: 20, message: "字数在20个以内" }],
        // getList: async () => ({
        //   // data: (await getCompanyList()).data,
        // }),
        // 'value-key': {
        //   label: 'name',
        //   value: 'id'
        // },
        placeholder: '请输入机器人名称',
        clearable: true,
        span: 24
      },{
        label: '机器人编号',
        prop: 'equipmentCode',
        el: 'input',
        rules:[{ required: true, message: "请输入机器人编号" },
          { max: 20, message: "字数在20个以内" }],
        placeholder: '请输入机器人编号',
        clearable: true,
        span: 24,
        disabled: true,
      },{
        label: '机器人类型',
        prop: 'equipmentTypeId',
        el: 'select',
        rules:[{ required: true, message: "请选择机器人类型" }],
        options:[
          // {
          //   label:'导轨机器人',
          //   value:'4'
          // },
          {
            label:'挂轨机器人',
            value:'3'
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
      },
      {
        label: '机器人型号',
        prop: 'equipmentMode',
        el: 'input',
        placeholder: '请输入机器人型号',
        rules:[{ required: true, message: "请输入机器人型号" },
          { max: 20, message: "字数在20个以内" }],
        clearable: true,
        span: 24
      },
      {
        label: '功能说明',
        prop: 'descInChinese',
        el: 'input',
        type:'textarea',
        placeholder: '请输入功能说明',
        rules:[{ required: false, message: "请输入机器人型号" },
          { max: 500, message: "字数在500个以内" }],
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
  computed:{
    stationId(){
      return this.$store.state.station.station.id
    }
  },
  methods: {
    openDialog(record,isEdit=true){
      this.formData = cloneDeep(record)
      this.isEdit = isEdit
      this.isShow = true
      this.formColumns.map( item => {
        if(item.label === '机器人编号'){
          item.disabled = isEdit
        }
      })
    },
    closeDialog(){
      this.isShow = false
      this.formData = {}
    },
    submit(){
      this.$refs.wform.validate((valid) => {
        if (valid) {
          const api = this.isEdit?apiUpdateEquipment:apiAddEquipment
          api({ ...this.formData, stationId: this.stationId }).then(res=>{
            this.$message.success(this.isEdit?`编辑成功!`:`新增成功!`)
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