<template>
  <div v-if="isShow" class="masking">
    <div class="detail" style="width: 40vw;">
      <div class="detail-header">
        完成任务
        <div class="close" @click="closeDialog">
          <img src="../../../../assets/images/board/header-close.png" alt="">
        </div>
      </div>
      <div class="detail-content">
        <WForm
          ref="wform"
          label-width="130px"
          :form-data="formData"
          :columns="formColumns"
          size="mini"
        >
          <template #img>
            <ImageUpload v-model="formData.imgUrl" :limit="9" tips="支持格式：jpg、png.jpeg、最大不超过10M，可上传9张图片" />
          </template>
        </WForm>
      </div>
      <div class="w-full flex justify-end">
        <div class="flex">
          <el-button class="closebtn" size="mini" @click="closeDialog()">
            关闭
          </el-button>
          <el-button class="closebtn" size="mini" type="primary" :disabled="disable" @click.once="submit()">
            保存
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { WForm } from "@common-ui/w-form";
import { cloneDeep } from 'lodash-es'
import { apiUploadFile,apiFinishContents } from "@/api/interface/dashboard";
import ImageUpload from '@/components/ImageUpload.vue';
export default {
  components: {
    WForm,
    ImageUpload
  },
  data() {
    return {
      isShow:false,
      formData: {},
      parentList:[],
      items:[],
      imgUrl:'',
      disable: false
    };
  },
  computed:{
    formColumns(){
      return [
        {
          label: '运维开始时间',
          prop: 'startTime',
          'popper-class':'mdate-picker',
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
          prop: 'endTime',
          'popper-class':'mdate-picker',
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
          'popper-class':'mselect',
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
          label:'运维照片',
          prop:'img',
          span:24,
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
        
      ]
    }
  },
  methods: {
    openDialog(record=[]){
      this.isShow = true
      this.items = record
    },
    closeDialog() {
      this.isShow = false
      this.formData = {}
      this.$emit('finishTaskClick')
    },
    submit() {      
      this.disable = true
      this.$refs.wform.validate(async(valid) => {
        if (valid) {
          let data
          if(Array.isArray(this.items)){
            data = {...this.formData,items:this.items}
          }else{
            data = {...this.formData,items:[this.items]}
          }
          apiFinishContents(data).then(res=>{
            this.$message.success(`完成任务成功！`)
            // this.$emit("getList");
            this.isShow = false
            this.formData = {}
            this.disable = false
            // this.$emit('finishTaskClick')
          }).catch(() => {
            this.disable = false
          })
        }
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.masking {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .6);
}
:deep(.el-upload__tip){
  color:#fff !important;
}
::v-deep{
  .el-input__inner,.el-textarea__inner,.el-upload{
    background-color: #133864!important;
    border-color: #4EA7F9 !important;
    color:#fff;
  }
}



.detail {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(180deg, rgba(60,110,175,0.86) 0%, rgba(13,47,88,0.95) 100%);
  padding-bottom: 60px;
  z-index: 99;
  padding: 24px;
  &-header {
    position: relative;
    width: 100%;
    height: 32px;
    font-size: 20px;
    letter-spacing: 1px;
    color: #FFFFFF;
    background: url('../../../../assets/images/board/header_bg.png') no-repeat;
    background-size: 460px 32px;
    padding-left: 48px;

    .close {
      position: absolute;
      top: 7px;
      right: 24px;
      width: 18px;
      height: 18px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  max-height:700px;

  &-content {
    margin-top: 16px;

    .subtitle {
      font-size: 16px;
      font-weight: 500;
      color: #E2EDFF;
    }
  }

  .closebtn {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 64px;
    height: 36px;
    background: linear-gradient(180deg, rgba(19,47,95,0.7) 0%, rgba(80,140,245,0.7) 100%);
    border-radius: 4px;
    border: 1px solid #148FF5;
    font-size: 16px;
    color: #E2EDFF;
    cursor: pointer;
  }

}
::v-deep .el-form-item__label{
  color:#fff !important;
}
</style>
