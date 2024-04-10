<template>
  <el-dialog width="35%" :visible="isShow" title="详情" :destroy-on-close="true" @close="closeDialog()">
    <div class="h-min-400px">
      <WTable
        ref="mtable"
        :table-data="tableData"
        :stripe="false"
        :border="false"
        :show-page="false"
        :columns="columns"
        :size="'mini'"
        style="height: calc(90% - 20px)"
        height="100%"
      />
    </div>
    <template #footer>
      <!-- <el-button type="primary" size="mini" @click="updateStartTime()">
        保存
      </el-button> -->
      <el-button size="mini" @click="closeDialog()">
        关闭
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import { WTable } from "@common-ui/w-form";
import { detail } from '@/api/interface/datacenter-key'
export default {
  components:{
    WTable
  },
  data() {
    return {
      tableData:[],
      isShow:false,
      id:'',
      columns:[
        {
          label: '关键参数列表',
          prop: 'dataName',
          width: 180,
        },
        {
          label: '检查值',
          prop: 'dataValue'
        },
        {
          label: '正常范围',
          prop: 'normalScope',
        },
        {
          label: '检查结果',
          render: (h, { row }) => {
            return (
              <span style={{ color: row.dataStatus === 'normal' ? '#52C41A' : '#FF4D4F'}}>{ row.dataStatusName }</span>
            )
          }
        },
      ]
    }
  },
  methods:{
    async openDialog(dataCode,id){
      this.isShow = true;
      this.id = id;
      this.tableData = (await detail(dataCode,id)).data
    },
    closeDialog(){
      this.isShow = false;
    },
  }
}
</script>

<style scoped>

</style>