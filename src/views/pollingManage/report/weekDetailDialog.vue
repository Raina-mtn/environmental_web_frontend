<template>
  <el-dialog top="5vh" :visible="isShow" title="报告详情" :destroy-on-close="true" @close="closeDialog()">
    <div>
      <div class="h-32px text-center leading-32px font-bold text-black" style="background: linear-gradient(270deg, rgba(20,138,255,0) 0%, rgba(33,167,255,0.2) 50%, rgba(20,138,255,0) 100%);">
        水质自动监测站周巡视结果记录表
      </div>
      <div class="h-32px text-center leading-32px font-bold text-black">
        西溪湿地站
      </div>
    </div>
    <el-scrollbar class="h-400px">
      <el-table
        :data="record.detailList"
        :span-method="spanMethod"
        border
        class="w-full mt-20px"
      >
        <el-table-column
          type="index"
        />
        <el-table-column
          prop="project"
          label="项目"
        />
        <el-table-column
          prop="deviceName"
          label="检查要求"
        />
        <el-table-column
          prop="record"
          label="检查情况记录"
        >
          <template slot-scope="scope">
            <el-tag size="small" :type="scope.row.result==='NORMAL'?'success':'danger'">
              {{ isOrNotNormalObj[scope.row.result] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="memo"
          label="备注"
        />
      </el-table>
    </el-scrollbar>
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
import {isOrNotNormalObj} from '@/utils/config'
import {apiExportList} from '@/api/interface/pollingManage'
export default {
  data() {
    return {
      isShow:false,
      spanList:{},//合并表格
      isOrNotNormalObj,
      record:{}
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
    spanMethod ({ row, column, rowIndex, columnIndex }) {
      const arr = this.getSpan(this.record.detailList);
      if (columnIndex < 2) {     
        const row = arr[rowIndex].row;    
        const col = arr[rowIndex].col;     
        return {        
          rowspan: row,         
          colspan: col      
        };    
      }
    },
    getSpan(list) {
      const newArr = [];  
      const obj = {};   
      for (let i = 0; i < list.length; i++) { 
        if (i === 0) {    
          obj.row = 1;    
          obj.col = 1;     
          newArr.push(obj);    
        } else {     
          if (list[i].project === list[i - 1].project) { 
            newArr.push({ row: 0, col: 0 });     
            const index = list.findIndex(item => { 
              return item.project === list[i - 1].project;    
            });          
            newArr[index].row++;   
          } else {      
            newArr.push({ row: 1, col: 1 });  
          }   
        }  
      }
      return newArr; 
    },
    exportFile(){
      const params={id:this.record.id}
      this.$confirm('确认导出该文件？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        // inputValidator:(value)=>value?true:'请输入导出文件名！'
      }).then(({value})=>{
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