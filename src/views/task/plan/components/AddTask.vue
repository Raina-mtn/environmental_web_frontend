<template>
  <el-dialog
    :visible="isShow"
    :title="isEdit ? '编辑' : '新增'"
    :destroy-on-close="true"
    append-to-body
    width="800px"
    top="30px"
    @close="closeDialog()"
  >
    <div class="container">
      <div>
        <div v-if="false" class="flex items-center">
          <div class="w-3px h-12px bg-blue-500" />
          <div class="ml-6px font-semibold text-black">
            添加运维项目
          </div>
        </div>
        <WForm
          class="form-bg"
          :form-data="formData"
          :columns="formColumns"
          size="mini"
        >
          <template slot="btns">
            <el-button
              size="mini"
              type="primary"
              @click="refresh"
            >
              查询
            </el-button>
            <el-button
              size="mini"
              @click="reset"
            >
              重置
            </el-button>
          </template>
        </WForm>
        <WTable
          ref="mtable"
          class="h-4/5"
          :table-data="tableData"
          :selection="true"
          :selectable="() => []"
          :stripe="false"
          :border="false"
          :columns="columns"
          :page="formData"
          :size="'mini'"
          :total="total"
          height="100%"
          @pageChange="getList"
          @selectionChange="selectionChange"
        />
      </div>
    </div>
    <template #footer>
      <el-button size="mini" @click="closeDialog()">
        关闭
      </el-button>
      <el-button type="primary" size="mini" @click="submit()">
        保存
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import { WTable, WForm } from "@common-ui/w-form";
// import { tasksByIdExclude } from '@/api/interface/system-task'
import { opexList } from '@/api/interface/task'
import { listMixin } from "@/mixin/list"
export default {
  components: {
    WTable,
    WForm
  },
  mixins: [listMixin],
  data() {
    return {
      isShow:false,
      isEdit:false,
      formData: {
        pageNum: 1,
        pageSize: 10
      },
      parentList:[],
      formColumns: [{
        label: '编号',
        prop: 'no',
        el: 'input',
        placeholder: '请输入',
        clearable: true,
        span: 8
      },{
        label: '运维类型',
        prop: 'omType',
        el: 'select',
        options:[
          {
            label:'运维作业',
            value:1
          },
          {
            label:'运维巡检',
            value:2
          }
        ],
        placeholder: '请选择',
        clearable: true,
        span: 8
      },{
        prop:'btns',
        span:8
      }
      ],
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
        {
          label: '点位数量',
          prop:'deviceCount'
        },
        // {
        //   label: "操作",
        //   width: 120,
        //   render: (h, { row }) => {
        //     return [
        //       <el-link type="primary" underline={false} onClick={()=>{}}>删除</el-link>,
        //     ];
        //   },
        // },
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
        this.getList()
      }
    }
  },

  created () {
    this.getList()
  },

  methods: {
    getList(){
      this.formData.pageNum = this.formData.pageIndex?this.formData.pageIndex:1
      opexList({...this.formData}).then(res=>{
        this.tableData = res.data
        this.total = res.totalCount
      })
    },

    openDialog(isEdit=false){
      this.isShow = true
      this.isEdit = isEdit
    },

    closeDialog() {
      this.isShow = false
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
