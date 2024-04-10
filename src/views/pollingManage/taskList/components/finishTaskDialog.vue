<template>
  <div>
    <el-dialog width="50%" :visible="isShow" title="完成任务" :destroy-on-close="true" top="60px" @close="closeDialog()">
      <div class="h-600px">
        <WTable
          ref="mtable"
          :table-data="tableData"
          class="h-560px"
          :stripe="false"
          :border="false"
          :selection="true"
          :selectable="(row) => row.executeState === -1"
          :columns="columns"
          :size="'mini'"
          :span-method="cellMerge"
        />
      </div>
      <template #footer>
        <el-button size="mini" @click="closeDialog()">
          关闭
        </el-button>
        <el-button size="mini" type="primary" @click="openFinishDialog()">
          批量完成
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { WTable } from "@common-ui/w-form";
import { tableColumns } from "./config";
import { apiOverList } from '@/api/interface/opex/task'
export default {
  components: {
    WTable,
  },
  data() {
    return {
      columns:tableColumns(this),
      checkAll:false,
      record: "",
      isShow: false,
      tableData: [],
      checkes: [],
      spanArr:[],
      pos:0,
      taskId: ''
    }
  },
  mounted(){
    // this.getSpanArr(this.tableData)
  },
  methods: {
    openDialog(id) {
      this.taskId = id
      this.isShow = true
      this.onGetList()
      // if (value.length >= 1) {
      //   this.tableData = value
      //   this.getSpanArr(value)
      // }
    },
    closeDialog() {
      this.isShow = false
      this.spanArr = [] // 清空合并单元格信息数组
      this.tableData = []
      this.pos = 0
    },
    // 获取列表数据
    onGetList () {
      apiOverList(this.taskId).then(res => {
        this.tableData = res.data
        this.getSpanArr(res.data)
      })
    },

    submit(){
      this.isShow = false
      // this.tableData = []
    },
    getSpanArr(data) {
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if(data[i].taskName === data[i - 1].taskName) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
    },
    cellMerge({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    openFinishDialog(value){
      const items = this.$refs.mtable.$children[0].selection.map(i=>i)
      if(items.length >=1 || value){
        const list = items.filter(item => {
          return item.executeState === -1
        })
        if (list.length >=1 || value) {
          this.closeDialog()
          this.$emit('openFinishDialog',list.length>0 ? list :value)
        } else {
          this.$message({
            type:'warning',
            message:'请选择未执行的任务！'
          })
        }
      }else{
        this.$message({
          type:'warning',
          message:'请在多选栏选择后再点击！'
        })
      }
    }
  }

}
</script>

<style lang="scss" scoped>
</style>