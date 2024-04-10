<template>
  <el-dialog top="5vh" :visible="isShow" title="报告详情" :destroy-on-close="true" @close="closeDialog()">
    <div>
      <div class="h-32px text-center leading-32px font-bold text-black" style="background: linear-gradient(270deg, rgba(20,138,255,0) 0%, rgba(33,167,255,0.2) 50%, rgba(20,138,255,0) 100%);">
        水质自动监测站日监视结果记录表
      </div>
      <div class="h-32px text-center leading-32px font-bold text-black">
        西溪湿地站
      </div>
    </div>
    <WTable
      ref="mtable"
      :show-page="false"
      :show-num="true"
      :table-data="record.detailList"
      :stripe="false"
      :border="false"
      :columns="columns"
      :size="'mini'"
      height="400px"
    />
    <el-descriptions :column="2" class="mt-10px">
      <el-descriptions-item label="填写日期">
        {{ record.gmtModified }}
      </el-descriptions-item>
      <el-descriptions-item label="填写人">
        系统生成
      </el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <el-button size="mini" @click="isShow = false">
        关闭
      </el-button>
      <el-button size="mini" type="primary" @click="exportFile">
        导出
      </el-button>
    </template>
  </el-dialog>
</template>
<script>

import {apiExportList} from '@/api/interface/pollingManage'
import { WTable } from "@common-ui/w-form";
import {isOrNotNormalObj} from '@/utils/config'
export default {
  components:{
    WTable
  },
  data() {
    return {
      isOrNotNormalObj,
      isShow:false,
      record:{},
    }
  },
  computed:{
    columns(){
      const that = this
      return [
        {
          label:'项目',
          prop:'project'
        },
        {
          label:'监视结果',
          render(h,{row}) {
            return (
              <el-tag size="small" type={row.result==='NORMAL'?'success':'danger'}>
                { that.isOrNotNormalObj[row.result] }
              </el-tag>
            )
          }
        },
        {
          label:'备注',
          prop:'memo'
        },
      ]
    }
  },
  methods: {
    openDialog(record){
      this.record = record
      this.isShow = true
    },
    closeDialog(){
      this.isShow = false
      this.record = {}
    },
    
    exportFile(){
      const params={id:this.record.id}
      this.$confirm('确认导出该文件？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        // inputValidator:(value)=>value?true:'请输入导出文件名！'
      }).then(()=>{
        console.log('params :>> ', params);
        const url = '/robot-patrol/report/export'
        // const token = this.$store?.state?.user?.token
        apiExportList({url, params, name:this.record.reportCode})
      })
    },
  }
}
</script>
<style lang="scss" scoped>
</style>