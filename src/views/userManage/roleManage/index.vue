<template>
  <div class="h-full wrapper">
    <WForm
      class="form-bg"
      label-width="100px"
      :form-data="formData"
      :columns="formColumns"
      size="mini"
    >
      <template slot="btns">
        <el-button size="mini" type="primary" @click="refresh">
          查询
        </el-button>
        <el-button size="mini" @click="reset">
          重置
        </el-button>
      </template>
    </WForm>
    <div class="mt-16px p-21px bg-white" style="height: calc(100% - 80px)">
      <div class="text-14px mb-21px" style="color: rgba(0, 0, 0, 0.85);">
        角色列表
      </div>
      <WTable
        ref="mtable"
        class="h-4/5"
        :table-data="tableData"
        :show-num="true"
        :stripe="false"
        :border="false"
        :columns="columns"
        :page="formData"
        :size="'mini'"
        :total="total"
        style="height: calc(100vh - 290px)"
        height="100%"
        @pageChange="getList"
      />
    </div>
    <EditDialog ref="editDialog" @getList="refresh" />
    <EmpowerDialog ref="empowerDialog" />
  </div>
</template>
<script>
import {
  apiGetRoleList,
  apiDeleteRole,
} from "@/api/interface/userManage";
import { listMixin } from "@/mixin/list";
import { WForm, WTable } from "@common-ui/w-form";
import { formColumns, tableColumns } from "./config.js";
import EditDialog from "./components/editDialog.vue";
import EmpowerDialog from "./components/empowerDialog.vue";
export default {
  components: {
    WForm,
    WTable,
    EditDialog,
    EmpowerDialog,
  },
  mixins: [listMixin],
  data() {
    return {
      formColumns,
      columns: tableColumns(this),
      tableData: [],
      total: 0,
      formData: {
        pageNum: 1,
        pageSize: 10,
        'minGmtCreate,maxGmtCreate': []
      },
      isShowEdit: false,
      isShowEmpower: false,
    };
  },
  mounted(){
    this.getList()
  },
  methods: {
    getList() {
      apiGetRoleList(this.formData).then(res=>{
        this.tableData = res.data
        this.total = Number(res.totalCount)
      })
    },
    reset() {
      this.formData = {
        pageNum: 1,
        pageSize: 10,
        roleName: "",
      };
    },
    handleDelete(deleteList) {
      if (Array.isArray(deleteList) && !deleteList.length) {
        this.$message.error("请至少选择一条记录！");
      } else {
        this.$alert("确认删除该角色吗?", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        }).then(() => {
          apiDeleteRole({roleId:deleteList})
            .then(() => {
              this.$message.success("删除成功");
            })
            .finally(() => {
              this.refresh();
            });
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  .content {
    width: 100%;
    height: 100%;
    .btns {
      margin-bottom: 20px;
    }
  }
}
</style>