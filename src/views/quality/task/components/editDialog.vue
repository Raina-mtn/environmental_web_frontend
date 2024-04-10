<template>
  <el-dialog width="25%" :visible="isShow" title="编辑" :destroy-on-close="true" @close="closeDialog()">
    <el-form ref="formRef" :model="formData">
      <el-form-item class="flex" label="任务开始时间" prop="taskStartTime" :rules="[{ required: true,message:'请选择任务开始时间'}]">
        <el-date-picker
          v-model="formData.taskStartTime"
          type="datetime"
          placeholder="请选择"
          size="mini"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" size="mini" @click="updateStartTime()">
        保存
      </el-button>
      <el-button size="mini" @click="closeDialog()">
        关闭
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import {apiUpdateStartTime} from '@/api/interface/mission'
export default {
  data() {
    return {
      formData:{
        taskStartTime:''
      },
      isShow:false,
      id:''
    }
  },
  methods:{
    openDialog(record){
      console.log('record.taskStartTime :>> ', record.taskStartTime);
      this.isShow = true;
      this.id = record.id;
      this.formData.taskStartTime = record.taskStartTime;
    },
    closeDialog(){
      this.isShow = false;
      this.formData.taskStartTime = '';
    },
    updateStartTime(){
      this.$refs.formRef.validate(async(valid)=> {
        if (valid) {
          apiUpdateStartTime({id:this.id,taskStartTime:this.formData.taskStartTime}).then(() => {
            this.$message({
              type:'success',
              message:'编辑成功'
            })
            this.$emit('refresh')
            this.closeDialog();
          })
        }else{
          this.$message({
            type:'error',
            message:'编辑失败，请重试！'
          })
        }
      })
      
    }
  }
}
</script>

<style scoped>

</style>