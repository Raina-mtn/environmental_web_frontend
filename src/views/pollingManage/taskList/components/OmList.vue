<template>
  <el-dialog
    :visible="isShow"
    title="运维内容"
    :destroy-on-close="true"
    append-to-body
    width="800px"
    top="30px"
    @close="closeDialog()"
  >
    <div class="container">
      <div>
        <WTable
          ref="mtable"
          class="h-600px"
          :table-data="tableData"
          :selection="false"
          :stripe="false"
          :border="false"
          :columns="columns"
          :size="'mini'"
          :total="total"
          :showPage="false"
          height="100%"
        />
      </div>
    </div>
    <template #footer>
      <el-button size="mini" @click="closeDialog()">
        关闭
      </el-button>
      <!-- <el-button type="primary" size="mini" @click="submit()">
        保存
      </el-button> -->
    </template>
  </el-dialog>
</template>

<script>
import { WTable } from "@common-ui/w-form";
import { apiGetPlanList } from '@/api/interface/opex/task'
import { listMixin } from "@/mixin/list"
export default {
  components: {
    WTable
  },
  mixins: [listMixin],
  data() {
    return {
      isShow:false,
      taskId: '',
      formData: {
        pageNum: 1,
        pageSize: 10
      },
      columns: [
        {
          label: '编号',
          prop: 'no'
        },
        {
          label: "运维类型",
          prop:'omTypeName'
        },
        {
          label: "运维周期(天/次)",
          prop:'cycleTime'
        },
        {
          label: "运维名称",
          prop:'operation'
        },
        {
          label: '运维内容',
          prop: 'content'
        },
      ],
      tableData:[],
      total:0,
      // 当前选中的数据
      chooseList: []
    };
  },

  watch: {
    isShow (val) {
      if (val) {
        // this.getList()
      }
    }
  },

  methods: {
    getList(id){
      this.formData.pageNum = this.formData.pageIndex?this.formData.pageIndex:1
      apiGetPlanList(id).then(res=>{
        this.tableData = res.data
        this.total = res.totalCount
      })
    },

    openDialog(id){
      this.isShow = true
      if (id) {
        this.taskId = id
        this.getList(id)
      }
    },

    closeDialog() {
      this.isShow = false
      this.tableData = []
      this.formData={}
    },

    selectionChange (props) {
      this.chooseList = [...props]
    },

    submit () {
      this.$message.success(`新增成功！`)
      this.$emit("sendList", this.chooseList)
      this.closeDialog()
    }
  },
};
</script>
