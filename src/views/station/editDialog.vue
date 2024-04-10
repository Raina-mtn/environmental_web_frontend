<template>
  <el-dialog width="50%" :visible="isShow" :title="isEdit?'编辑站点':'新增站点'" :destroy-on-close="true" @close="closeDialog()">
    <div class="max-h-500">
      <el-scrollbar>
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
      </el-scrollbar>
    </div>
    <template #footer>
      <el-button size="mini" class="cancelButton" style="margin-top: 20px;" @click="isShow = false">
        关闭
      </el-button>
      <el-button size="mini" class="confirmButton" style="margin-top: 20px;" type="primary" @click="submit">
        保存
      </el-button>
    </template>
  </el-dialog>
</template>
<script>
import { cloneDeep } from 'lodash-es'
import { WForm } from "@common-ui/w-form";
import {stationState,stationType} from '@/utils/config'
import ImageUpload from '@/components/ImageUpload.vue';
import {regionData} from 'element-china-area-data'
import {apiUpdateStation} from '@/api/interface/station'
import { codeToText } from 'element-china-area-data'
export default {
  components:{
    WForm,
    ImageUpload
  },
  data() {
    return {
      isShow:false,
      isEdit:false,
      formColumns:[{
        label: '站点ID',
        prop: 'stationId',
        el: 'input',
        rules:[{ required: true, message: "请输入站点ID" }],
        disabled:true,
        placeholder: '请输入站点ID',
        clearable: true,
        span: 12
      },{
        label: '编号',
        prop: 'stationCode',
        el: 'input',
        rules:[{ required: true, message: "请输入站点编号" }],
        placeholder: '请输入站点编号',
        clearable: true,
        span: 12
      },{
        label: '东经',
        prop: 'longitude',
        el: 'input',
        rules:[{ required: true, message: "请输入经度" }],
        placeholder: '请输入经度',
        clearable: true,
        span: 12
      },{
        label: '北纬',
        prop: 'latitude',
        el: 'input',
        rules:[{ required: true, message: "请输入纬度" }],
        placeholder: '请输入纬度',
        clearable: true,
        span: 12
      },{
        label: '站点名称',
        prop: 'stationName',
        el: 'input',
        rules:[{ required: true, message: "请输入站点名称" }],
        placeholder: '请输入站点名称',
        clearable: true,
        span: 12
      },{
        label: '站点类型',
        prop: 'type',
        el: 'select',
        rules:[{ required: true, message: "请选择站点类型" }],
        options:stationType,
        placeholder: '请选择站点类型',
        clearable: true,
        span: 12
      // },{
      //   label: '联系人',
      //   prop: 'contact',
      //   el: 'input',
      //   rules:[{ required: true, message: "请输入联系人" }],
      //   placeholder: '请输入联系人',
      //   clearable: true,
      //   span: 24
      // },{
      //   label: '电话',
      //   prop: 'mobile',
      //   el: 'input',
      //   rules:[{ required: true, message: "请输入电话" }],
      //   placeholder: '请输入电话',
      //   clearable: true,
      //   span: 24
      },{
        label: '所属区域',
        prop: 'district',
        el: 'cascader',
        options: regionData,
        props:{
          label: 'label',
          children: 'children',
          checkStrictly: true,
          value:'value',
          emitPath: true
        },
        'show-all-levels':true,
        placeholder: '请选择区域',
        clearable: true,
        span: 12
      },{
        label: '详细地址',
        prop: 'address',
        el: 'input',
        type:'textarea',
        placeholder: '请输入地址',
        clearable: true,
        span: 12
      },{
        label: '站点状态',
        prop: 'state',
        el: 'select',
        options:stationState,
        rules:[{ required: true, message: "请选择站点状态" }],
        placeholder: '请选择站点状态',
        clearable: true,
        span: 12
      },{
        label: '站点说明',
        prop: 'stationComment',
        el: 'input',
        type:'textarea',
        placeholder: '请输入站点说明',
        clearable: true,
        span: 24
      },{
        label: '站点图片',
        prop: 'img',
        span: 24,
      }],
      formData:{},
    }
  },
  watch: {
    "formData.district": {
      deep: true,
      handler (val, oldVal) {
        if (typeof val === 'string') return
        let arr = []
        if (val && val.length > 0) {
          this.formData.district.forEach(item => {
            arr.push(codeToText[item])
          })
          // console.log('打印数据:', arr)
          this.formData.districtName = arr.join('-')
          this.$set(this.formData, 'districtName', arr.join('-'))
        } else {
          this.formData.districtName = ''
        }
      }
    }
  },
  methods: {
    openDialog(isEdit=false,record={}){
      this.formData = cloneDeep(record)
      this.isShow = true
      this.isEdit = isEdit
    },
    closeDialog(){
      this.isShow = false
      this.formData = {}
    },
    submit(){
      this.$refs.wform.validate((valid) => {
        if (valid) {
          const params = {
            ...this.formData,
            district: typeof this.formData.district === 'string' ? this.formData.district : this.formData.district[this.formData.district.length - 1],
          }
          apiUpdateStation(params).then(res=>{
            this.$message.success('编辑站点')
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