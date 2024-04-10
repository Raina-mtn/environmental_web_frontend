<template>
  <el-dialog width="25%" :visible="isShow" :title="isEdit?'编辑':'新增'" :destroy-on-close="true" @close="closeDialog()">
    <div class="container">
      <WForm
        ref="wform"
        :form-data="formData"
        :columns="formColumns"
        label-width="110px"
        size="mini"
      />
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
import {apiCreateMaintenance} from '@/api/interface/maintenance'
import { WForm } from "@common-ui/w-form";
export default {
  components:{
    WForm
  },
  data() {
    return {
      isShow:false,
      isEdit:false,
      formColumns:[
      //   {
      //   label: '运维编号',
      //   prop: 'code',
      //   el: 'input',
      //   placeholder: '请输入运维编号',
      //   rules:[{ required: true, message: "请输入运维编号" }],
      //   clearable: true,
      //   span: 24
      // },
        {
          label: '项目名称',
          prop: 'title',
          el: 'input',
          placeholder: '请输入项目名称',
          rules:[{ required: true, message: "请输入项目名称" }],
          clearable: true,
          span: 24
        },{
          label: '运维人员',
          prop: 'operator',
          el: 'input',
          placeholder: '请输入运维人员',
          clearable: true,
          span: 24
        },{
          label: '运维开始时间',
          prop: 'startTime',
          el: 'date-picker',
          type:'datetime',
          placeholder: '请选择开始时间',
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          rules:[{ required: true, message: "请选择开始时间" }],
          clearable: true,
          span: 24
        },{
          label: '运维结束时间',
          prop: 'endTime',
          el: 'date-picker',
          type:'datetime',
          placeholder: '请选择结束时间',
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          rules:[{ required: true, message: "请选择结束时间" }],
          clearable: true,
          span: 24
        },{
          label: '工作描述',
          prop: 'content',
          el: 'input',
          type:'textarea',
          placeholder: '请输入工作描述',
          clearable: true,
          span: 24
        }],
      formData:{},
    }
  },
  computed:{
    stationId(){
      return this.$store.state.station.station.id
    }
  },
  watch:{
    stationId(){
      this.refresh()
    }
  },
  methods: {
    openDialog(isEdit=false){
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
          apiCreateMaintenance({...this.formData,stationId:this.stationId}).then(res=>{
            this.$message.success('新增成功！')
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