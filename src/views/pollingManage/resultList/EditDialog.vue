<template>
  <el-dialog
    :visible="isShow"
    title="编辑"
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
        >
          <template #img>
            <ImageUpload v-model="formData.imageUrls" :imageList="formData.imageUrls" :limit="9" tips="支持格式：jpg、png.jpeg、最大不超过10M，可上传9张图片" @update:imageList="handleUpdate" />
          </template>
        </WForm>
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
import { apiEdit } from "@/api/interface/opex/record";
import ImageUpload from '@/components/ImageUpload.vue';
export default {
  components: {
    WForm,
    ImageUpload
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
          label: '运维开始时间',
          prop: 'omStartTime',
          el: 'date-picker',
          type:'datetime',
          placeholder: '请选择开始时间',
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          rules:[{ required: true, message: "请选择开始时间" }],
          clearable: true,
          span: 24
        },
        {
          label: '运维结束时间',
          prop: 'omEndTime',
          el: 'date-picker',
          type:'datetime',
          placeholder: '请选择结束时间',
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          rules:[{ required: true, message: "请选择结束时间" }],
          clearable: true,
          span: 24
        },
        {
          label: "运维结果",
          prop: "omResult",
          el: 'select',
          options:[
            {
              label:'正常',
              value:0
            },
            {
              label:'未识别',
              value:1
            },
            {
              label:'异常',
              value:2
            }
          ],
          placeholder: "请选择运维结果",
          rules:[{ required: true, message: "请选择运维结果" }],
          clearable: true,
          span: 24,
        },
        {
          label: '备注',
          prop: 'remark',
          el: 'input',
          type:'textarea',
          placeholder: '请输入备注',
          clearable: true,
          span: 24
        },
        {
          label: '运维照片',
          prop: 'img',
          span: 24,
        }
      ]
    }
  },
  methods: {
    openDialog(record={}, isEdit=false){
      this.formData = cloneDeep(record)
      this.formData.stationIdList = Number(this.formData.stationIdList)
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
          apiEdit(this.formData).then(res=>{
            this.$message.success(`${this.isEdit?'更新':'新增'}成功！`)
            this.$emit("getList");
            this.closeDialog()
          })
        }
      })
    },
    handleUpdate (value) {
      this.formData.imageUrls = value
    }
  },
};
</script>
