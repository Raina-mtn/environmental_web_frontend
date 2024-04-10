<template>
  <el-dialog width="25%" :visible="isShow" :title="isEdit?'编辑':'新增'" :destroy-on-close="true" @close="closeDialog()">
    <div class="container">
      <WForm
        ref="wform"
        :form-data="formData"
        :columns="formColumns"
        label-width="110px"
        size="mini"
      >
        <template #type>
          <el-input disabled value="正常" placeholder="请输入内容" />
          <el-input disabled value="异常" placeholder="请输入内容" />
        </template>
      </WForm>
    </div>
    <template #footer>
      <el-button size="mini" @click="isShow = false">
        关闭
      </el-button>
      <el-button size="mini" type="primary" @click="submit">
        保存
      </el-button>
    </template>
  </el-dialog>
</template>
<script>

import { WForm } from "@common-ui/w-form";
import {isOrNotNormal,deviceState} from '@/utils/config'
import {apiUpdateDevice} from '@/api/interface/device'
import { cloneDeep } from 'lodash-es'
export default {
  components:{
    WForm
  },
  data() {
    return {
      isOrNotNormal,
      isShow:false,
      isEdit:false,
      formData:{},
    }
  },
  computed:{
    formColumns(){
      return [{
        label: '巡检点名称',
        prop: 'deviceName',
        el: 'input',
        placeholder: '请输入巡检点名称',
        rules:[{ required: true, message: "请输入巡检点名称" }],
        clearable: true,
        span: 24
      },{
        label: '巡检周期',
        prop: 'periodicType',
        el: 'select',
        options:deviceState,
        rules:[{ required: true, message: "请选择巡检类型" }],
        placeholder: '请选择巡检类型',
        clearable: true,
        span: 24
      },{
        label: '横坐标',
        prop: 'coordinateX',
        el: 'input',
        disabled:true,
        placeholder: '请选择横坐标',
        clearable: true,
        span: 24
      },{
        label: '纵坐标',
        prop: 'coordinateY',
        el: 'input',
        disabled:true,
        placeholder: '请选择纵坐标',
        clearable: true,
        span: 24
      },{
        label: '检测项目',
        prop: 'project',
        el: 'input',
        type:'textarea',
        placeholder: '请输入检测项目',
        rules:[{ required: true, message: "请输入检测项目" }],
        clearable: true,
        span: 24
      },{
        label: '巡检结果类型',
        prop: 'type',
        // el: 'select',
        // options:this.isOrNotNormal,
        // disabled:true,
        // // rules:[{ required: true, message: "请选择巡检结果类型" }],
        // placeholder: '请选择巡检结果类型',
        // clearable: true,
        span: 24
      }]
    }
  },
  methods: {
    openDialog(isEdit=false,record){
      this.formData = cloneDeep(record)
      this.formData.type = 'NORMAL'
      this.isShow = true
      this.isEdit = isEdit
    },
    closeDialog(){
      this.isShow = false
    },
    submit(){
      this.$refs.wform.validate((valid) => {
        if (valid) {
          apiUpdateDevice(this.formData).then(res=>{
            this.$message.success(`${this.isEdit?'编辑':'新增'}成功!`)
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