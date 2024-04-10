<template>
  <el-dialog top="5vh" :visible="isShow" title="编辑" :destroy-on-close="true" @close="closeDialog()">
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
        <el-date-picker
          v-model="record.gmtModified"
          class="!w-4/5"
          size="mini"
          type="datetime"
          placeholder=""
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-descriptions-item>
      <el-descriptions-item label="填写人">
        <el-input v-model="record.signed" disabled size="mini" class="w-4/5" placeholder="" />
      </el-descriptions-item>
    </el-descriptions>
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

import { WTable } from "@common-ui/w-form";
import {isOrNotNormalObj} from '@/utils/config'
import { cloneDeep } from 'lodash-es'
import {apiUpdateReport} from '@/api/interface/pollingManage'
export default {
  components:{
    WTable
  },
  data() {
    return {
      isShow:false,
      record:{
        signed:'系统生成',
        gmtModified:null
      },
      isOrNotNormalObj,
    }
  },
  computed:{
    columns(){
      return [
        {
          label:'项目',
          prop:'project'
        },
        {
          label:'监视结果',
          render(h,{row}) {
            return (
              <el-select v-model={row.result} placeholder="" size="mini">
                <el-option
                  label="正常"
                  value='NORMAL'>
                </el-option>
                <el-option
                  label="异常"
                  value='ERROR'>
                </el-option>
              </el-select>
            )
          },
        },
        {
          label:'备注',
          render(h,{row}) {
            return (<el-input v-model={row.memo} size="mini" placeholder=""></el-input>)
          },
        },
      ]
    }
  },
  methods: {
    openDialog(record){
      this.record = cloneDeep(record)
      this.isShow = true
    },
    closeDialog(){
      this.isShow = false
      this.record = {
        signed:'系统生成',
        gmtModified:null
      }
    },
    submit(){
      apiUpdateReport(this.record).then(()=>{
        this.$message.success('更新成功！')
        this.$emit('refresh')
        this.closeDialog()
      })
    },
  }
}
</script>
<style lang="scss" scoped>
</style>