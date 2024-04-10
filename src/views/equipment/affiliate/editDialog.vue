<template>
  <el-dialog width="25%" :visible="isShow" :title="isEdit?'编辑设备':'新增设备'" :destroy-on-close="true" @close="closeDialog()">
    <div class="container">
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
import {apiAddEquipment,apiUpdateEquipment} from '@/api/interface/equipment'
import { cloneDeep } from 'lodash-es'
// import {equipmentType} from '@/utils/config'
import { WForm } from "@common-ui/w-form";
import ImageUpload from '@/components/ImageUpload.vue';
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
        label: '设备名称',
        prop: 'equipmentName',
        el: 'input',
        rules:[{ required: true, message: "请输入设备名称" }],
        placeholder: '请输入设备名称',
        clearable: true,
        span: 24
      },{
        label: '设备编号',
        prop: 'equipmentCode',
        el: 'input',
        rules:[{ required: true, message: "请输入设备编号" }],
        placeholder: '请输入设备编号',
        clearable: true,
        span: 24
      },{
        label: '设备类型',
        prop: 'equipmentTypeId',
        el: 'select',
        options:[
          {
            label:'摄像机',
            value:"7"
          }
        ],
        rules:[{ required: true, message: "请选择设备类型" }],
        placeholder: '请选择设备类型',
        clearable: true,
        span: 24
      // },{
      //   label: '巡检点位',
      //   prop: 'stationId',
      //   el: 'wSelect',
      //   getList: async () => ({
      //     // data: (await getCompanyList()).data,
      //   }),
      //   'value-key': {
      //     label: 'name',
      //     value: 'id'
      //   },
      //   placeholder: '请选择巡检点位',
      //   clearable: true,
      //   span: 24
      },{
        label: '安装位置',
        prop: 'installedLocation',
        el: 'input',
        placeholder: '请输入安装位置',
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
        label: '图片',
        prop: 'img',
        span: 24,
        // rules: [
        //   { required: true, message: '请上传设备图片' }
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
          const api = this.isEdit?apiUpdateEquipment:apiAddEquipment
          api({...this.formData,stationId:this.stationId}).then(res=>{
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