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
        class="w-full mt-20px"
        border
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
          prop="result"
          label="检查情况记录"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.result" placeholder="" size="mini">
              <el-option
                label="正常"
                value="NORMAL"
              />
              <el-option
                label="异常"
                value="ERROR"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="memo"
          label="备注"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.memo" size="mini" placeholder="" />
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
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
import {isOrNotNormalObj} from '@/utils/config'
import { cloneDeep } from 'lodash-es'
import {apiUpdateReport} from '@/api/interface/pollingManage'
export default {
  data() {
    return {
      isShow:false,
      tableData:[],
      spanList:{},//合并表格
      isOrNotNormalObj,
      record:{
        signed:'系统生成',
        time:null
      },
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
  }
}
</script>
<style lang="scss" scoped>
</style>