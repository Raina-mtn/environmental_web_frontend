<template>
  <el-dialog width="45%" :visible="isShow" :title="isEdit?'编辑仪器':'新增仪器'" top="30px" :destroy-on-close="true" @close="closeDialog()">
    <div class="min-h-600px">
      <el-scrollbar class="h-660px">
        <WForm
          ref="wform"
          :form-data="formData"
          :columns="formColumns"
          size="mini"
        >
          <template #img>
            <ImageUpload v-model="formData.picUrl" tips="支持格式：jpg、png.jpeg、最大不超过10M，可上传一张图片" />
          </template>
          <template #file>
            <!-- <FileUpload v-model="formData.fileUrl" :action="action" :limit="3" :accept="'.xlsx,.xls,.doc,.docx'" tips="建议：单个文件不超过200MB，支持pdf、xls、xlsx、doc、rar、zip等格式，最多可上传 3 个文件" /> -->
            <el-upload
              :action="action"
              :accept="'.xlsx,.xls,.doc,.docx'"
              :show-file-list="true"
              :file-list="fileQuery"
              :on-success="handleFileSuccess"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :limit="3"
              :before-upload="beforeUpload"
            >
              <el-button size="small" type="primary">
                点击上传
              </el-button>
              <div slot="tip" class="el-upload__tip">
                建议：单个文件不超过200MB，支持pdf、xls、xlsx、doc、rar、zip等格式，最多可上传 3 个文件
              </div>
            </el-upload>
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
// import {stationState} from '@/utils/config'
import ImageUpload from '@/components/ImageUpload.vue';
// import FileUpload from '@/components/FileUpload.vue';
import { create,update,detail,apiGetInstrumentTypeDict } from '@/api/interface/instrument'
export default {
  components:{
    WForm,
    ImageUpload,
    // FileUpload
  },
  data() {
    const { VUE_APP_DOMAIN_BASE } = process.env
    return {
      isShow:false,
      isEdit:false,
      action: VUE_APP_DOMAIN_BASE + `/robot-file/uploadFile`,
      fileQuery: [],
      files: [],
      isHaveUpload: false,
      formData:{},
    }
  },
  computed:{
    stationId(){
      return this.$store.state.station.station.id
    },
    formColumns(){
      const typeValue = Number(this.formData.instrumentType)
      if(typeValue>=1&&typeValue<=6){
        return [
          {
            label: '名称',
            prop: 'instrumentName',
            el: 'input',
            rules:[{ required: true, message: "请输入名称" },
              { max: 128, message: "字数在128个以内" }
            ],
            placeholder: '请输入名称',
            clearable: true,
            span: 24
          },{
            label: '型号',
            prop: 'instrumentMode',
            el: 'input',
            rules:[{ max: 128, message: "字数在128个以内" }],
            placeholder: '请输入型号',
            clearable: true,
            span: 24
          },{
            label: '序列号',
            prop: 'instrumentSerial',
            el: 'input',
            rules:[{ required: true, message: "请输入序列号" },
              { max: 128, message: "字数在128个以内" }],
            placeholder: '请输入序列号',
            clearable: true,
            span: 24
          },{
            label: '功能说明',
            prop: 'descInChinese',
            el: 'input',
            type:'textarea',
            placeholder: '请输入功能说明',
            rules:[{ max: 500, message: "字数在500个以内" }],
            clearable: true,
            span: 24
          },{
            label: '类型',
            prop: 'instrumentType',
            el: "wSelect",
            getList: async () => ({
              data: (await apiGetInstrumentTypeDict()).data,
            }),
            "value-key": {
              label: "dataName",
              value: "dataCode",
            },
            placeholder: '请选择类型',
            rules:[{ required: true, message: "请选择类型" }],
            clearable: true,
            span: 24
          },{
            label: '标气编号',
            prop: 'gasCode',
            el: 'input',
            rules:[{ max: 128, message: "字数在128个以内" }],
            placeholder: '请输入标气编号',
            clearable: true,
            span: 24
          },{
            label: '标气来源',
            prop: 'gasSource',
            el: 'input',
            rules:[{ max: 128, message: "字数在128个以内" }],
            placeholder: '请输入标气来源',
            clearable: true,
            span: 24
          },{
            label: '标气浓度',
            prop: 'gasConcentration',
            el: 'input',
            rules:[{ max: 128, message: "字数在128个以内" }],
            placeholder: '请输入标气浓度',
            clearable: true,
            append: true,
            appendText: 'ppm',
            span: 24
          },{
            label: '图片',
            prop: 'img',
            span: 24,
          },{
            label: '其他附件',
            prop: 'file',
            span: 24,
          }
        ]
      }else if(typeValue===7){
        return [
          {
            label: '名称',
            prop: 'instrumentName',
            el: 'input',
            rules:[{ required: true, message: "请输入名称" },
              { max: 128, message: "字数在128个以内" }
            ],
            placeholder: '请输入名称',
            clearable: true,
            span: 24
          },{
            label: '型号',
            prop: 'instrumentMode',
            el: 'input',
            rules:[{ max: 128, message: "字数在128个以内" }],
            placeholder: '请输入型号',
            clearable: true,
            span: 24
          },{
            label: '序列号',
            prop: 'instrumentSerial',
            el: 'input',
            rules:[{ required: true, message: "请输入序列号" },
              { max: 128, message: "字数在128个以内" }],
            placeholder: '请输入序列号',
            clearable: true,
            span: 24
          },{
            label: '功能说明',
            prop: 'descInChinese',
            el: 'input',
            type:'textarea',
            placeholder: '请输入功能说明',
            rules:[{ max: 500, message: "字数在500个以内" }],
            clearable: true,
            span: 24
          },{
            label: '类型',
            prop: 'instrumentType',
            el: "wSelect",
            getList: async () => ({
              data: (await apiGetInstrumentTypeDict()).data,
            }),
            "value-key": {
              label: "dataName",
              value: "dataCode",
            },
            placeholder: '请输入功能',
            rules:[{ required: true, message: "请选择类型" }],
            clearable: true,
            span: 24
          },{
            label: '相机ip',
            prop: 'cameraIp',
            el: 'input',
            placeholder: '请输入相机ip',
            rules:[{ max: 30, message: "字数在30个以内" }],
            clearable: true,
            span: 24
          },{
            label: '相机登录名',
            prop: 'loginName',
            el: 'input',
            placeholder: '请输入相机登录名',
            rules:[{ max: 30, message: "字数在30个以内" }],
            clearable: true,
            span: 24
          },{
            label: '相机登录密码',
            prop: 'loginPassword',
            el: 'input',
            type:'password',
            'show-password':true,
            placeholder: '请输入相机登录密码',
            rules:[{ max: 30, message: "字数在30个以内" }],
            clearable: true,
            span: 24
          },{
            label: '相机端口',
            prop: 'cameraPort',
            el: 'input',
            placeholder: '请输入相机端口',
            rules:[{ max: 30, message: "字数在30个以内" }],
            clearable: true,
            span: 24
          },{
            label: '相机通道号',
            prop: 'cameraChannel',
            el: 'input',
            placeholder: '请输入相机通道号',
            rules:[{ max: 30, message: "字数在30个以内" }],
            clearable: true,
            span: 24
          },{
            label: '图片',
            prop: 'img',
            span: 24,
          },{
            label: '其他附件',
            prop: 'file',
            span: 24,
          }
        ]
      }else{
        return [
          {
            label: '名称',
            prop: 'instrumentName',
            el: 'input',
            rules:[{ required: true, message: "请输入名称" },
              { max: 128, message: "字数在128个以内" }
            ],
            placeholder: '请输入名称',
            clearable: true,
            span: 24
          },{
            label: '型号',
            prop: 'instrumentMode',
            el: 'input',
            rules:[{ max: 128, message: "字数在128个以内" }],
            placeholder: '请输入型号',
            clearable: true,
            span: 24
          },{
            label: '序列号',
            prop: 'instrumentSerial',
            el: 'input',
            rules:[{ required: true, message: "请输入序列号" },
              { max: 128, message: "字数在128个以内" }],
            placeholder: '请输入序列号',
            clearable: true,
            span: 24
          },{
            label: '功能说明',
            prop: 'descInChinese',
            el: 'input',
            type:'textarea',
            placeholder: '请输入功能说明',
            rules:[{ max: 500, message: "字数在500个以内" }],
            clearable: true,
            span: 24
          },{
            label: '类型',
            prop: 'instrumentType',
            el: "wSelect",
            getList: async () => ({
              data: (await apiGetInstrumentTypeDict()).data,
            }),
            "value-key": {
              label: "dataName",
              value: "dataCode",
            },
            placeholder: '请选择类型',
            rules:[{ required: true, message: "请选择类型" }],
            clearable: true,
            span: 24
          },{
            label: '图片',
            prop: 'img',
            span: 24,
          },{
            label: '其他附件',
            prop: 'file',
            span: 24,
          }
        ]
      }
    }
  },
  methods: {
    async openDialog(isEdit=false,info={}){
      let record
      if(isEdit){
        record = (await detail(info.id)).data
        if (record) {
          if(record.cameraPort) record.cameraPort = String(record.cameraPort)
          if(record.cameraChannel) record.cameraChannel = String(record.cameraChannel)
        }
        this.formData = cloneDeep(record)
      }else{
        record = info
      }
      if (record && record.fileUrl) {
        this.files = record.fileUrl.split(',')
        this.fileQuery = this.files.map(item => {
          const arr = item.split('/')
          return {
            name: arr[arr.length - 1],
            key: item
          }
        })
      }
      this.isShow = true
      this.isEdit = isEdit
    },
    closeDialog(){
      this.isShow = false
      this.formData = {}
      this.fileQuery = []
      this.files = []
    },
    handleFileSuccess (res, file, fileList) {
      const list = [...fileList]
      const isHave = list.every(item => {
        return item.status === 'success'
      })
      if (isHave) {
        this.isHaveUpload = false
        console.log('打印数据:', file)
        this.fileQuery.push(file)
        this.files.push(file.response.data)
      }
    },
    handleRemove (file, fileList) {
      const list = [...fileList]
      const isHave = list.every(item => {
        return item.status === 'success'
      })
      this.isHaveUpload = !isHave
      this.fileQuery = [...list]
      this.files = fileList.map((item) => {
        return item || item.response.data
      })
    },
    handleChange (file, fileList) {
      const list = [...fileList]
      const isHave = list.every(item => {
        return item.status === 'success'
      })
      this.isHaveUpload = !isHave
    },
    beforeUpload (file) {
      const isLt100M = file.size / 1024 / 1024 > 1024
      if (isLt100M) {
        this.$message.error('上传文件大小不能超过1GB!')
        return false
      }
      return !isLt100M
    },
    submit(){
      this.$refs.wform.validate((valid) => {
        if (valid) {
          const params = {
            ...this.formData,
            stationId: this.stationId,
            fileUrl: this.files.join(',')
          }
          if(this.isEdit) {
            update(this.formData.id, params).then(res=>{
              this.$message.success('操作成功')
              this.$emit('refresh')
              this.closeDialog()
            })
          }
          else {
            create(params).then(res=>{
              this.$message.success('操作成功')
              this.$emit('refresh')
              this.closeDialog()
            })
          }
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>

</style>