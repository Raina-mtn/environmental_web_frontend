<template>
  <div class="user-manage">
    <section class="department">
      <div class="current-dep">
        <div class="title_wrapper">
          当前选中
        </div>
        <div class="box">
          <div class="main">
            {{ currentDev.name }}
          </div>
          <i class="el-icon-edit-outline text-15px leading-20px cursor-pointer w-30px" @click="editUser" />
          <i class="el-icon-delete text-15px leading-20px cursor-pointer w-30px" @click="deleteDev" />
        </div>
      </div>
      <div class="add-dep text-right">
        <el-button
          class="inline-block"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="$refs.departmentDialog.openDialog(false)"
        >
          添加部门
        </el-button>
      </div>
      <div class="tree-dep p-16px">
        <el-input
          v-model="selectDev"
          class="w-full mb-16px"
          placeholder="请输入部门名称"
          prefix-icon="el-icon-search"
          size="mini"
        />
        <div class="trees">
          <el-tree
            :data="organizationData"
            :props="defaultProps"
            @node-click="handleNodeClick"
          />
        </div>
      </div>
    </section>
    <section class="user bg-white p-21px">
      <WForm
        label-width="60px"
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
      <div class="mb-16px flex justify-between">
        <div class="text-15px mt-10px">
          用户列表
        </div>
        <div>
          <el-button type="primary" size="small" icon="el-icon-plus" @click="$refs.userDialog.openDialog(false)">
            添加用户
          </el-button>
        </div>
      </div>
      <WTable
        ref="mtable"
        :table-data="tableData"
        show-num
        :stripe="false"
        :selection="false"
        :border="false"
        :columns="columns"
        :page="formData.page"
        :size="'mini'"
        :total="total"
        style="height: calc(80% - 40px);"
        height="100%"
        @pageChange="getList"
      />
    </section>
    <DepartmentDialog ref="departmentDialog" @getTree="getTree" />
    <UserDialog ref="userDialog" @getList="refresh" />
    <EditPassword ref="passwordDialog" @getList="refresh" />
  </div>
</template>

<script>
import { listMixin } from "@/mixin/list";
import { WForm, WTable } from "@common-ui/w-form";
import { formColumns, tableColumns } from "./config.js";
import DepartmentDialog from "./components/addOrEditDepartment.vue";
import {apiGetOrganizationTree,apiDeleteOrganizationTree,apiGetUserList,apiDeleteUser} from '@/api/interface/userManage'
import UserDialog from "./components/addOrEditUser.vue";
import EditPassword from "./components/editPassword.vue";
export default {
  components: {
    WForm,
    WTable,
    DepartmentDialog,
    UserDialog,
    EditPassword,
  },
  mixins: [listMixin],
  data() {
    return {
      formColumns,
      selectDev:'',
      currentDev:{},
      columns: tableColumns(this),
      tableData: [],
      total: 0,
      formData: {
        page: {
          pageIndex: 1,
          pageSize: 10,
        },
      },
      organizationData: [],
      defaultProps: {
        children: "subList",
        label: "name",
        value:'id'
      },
      isShowUser: false,
      isEditUser: true,
      userData: {},
      isShowPassword: false,
    };
  },
  watch:{
    currentDev:{
      handler(){
        this.getList()
      },
      deep:true
    }
  },
  mounted() {
    this.getList();
    this.getTree();
  },
  methods: {
    getTree(){
      apiGetOrganizationTree().then(res=>{
        this.organizationData = [res.data]
      })
    },
    getList(){
      this.formData.rootOrgId = this.currentDev.id
      this.formData.pageNum = this.formData.pageIndex?this.formData.pageIndex:1
      apiGetUserList(this.formData).then(res=>{
        this.tableData = res.data
        this.total = Number(res.totalCount)
      })
    },
    reset(){
      this.formData = {
        pageNum: 1,
        pageIndex: 1,
        pageSize: 10,
        equipmentTypeId:7,
        stationId:this.stationId
      }
      this.getList()
    },
    handleNodeClick(data) {
      this.currentDev = data
    },
    deleteDev(){
      if(!Object.keys(this.currentDev).length){
        this.$message.error('请先选择部门！')
      }else{
        apiDeleteOrganizationTree({id:this.currentDev.id}).then(()=>{
          this.$message.success('删除成功！')
          this.getTree();
        })
      }
    },
    deletUser(row){
      apiDeleteUser({id:row.id}).then(()=>{
        this.$message.success('删除成功！')
        this.getList();
      })
      
    },
    editUser(){
      if(!Object.keys(this.currentDev).length){
        this.$message.error('请先选择部门！')
      }else{
        this.$refs.departmentDialog.openDialog(true,this.currentDev)
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.user-manage {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 10px 0px 10px 10px;
  .department {
    width: 350px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    border: none;
    border-radius: 4px;
    box-shadow: none;
    height: 100%;
    padding: 35px 10px 10px 10px;
    display: flex;
    flex-direction: column;
    .current-dep {
      display: flex;
      height: 30px;
      .title_wrapper {
        width: 80px;
        font-size: 16px;
        padding-top: 3px;
      }
      .box {
        flex: 1;
        border-radius: 4px;
        border: 1px solid rgba(215, 215, 215, 1);
        padding-top: 3px;
        display: flex;
        .main {
          flex: 1;
          font-size: 15px;
          padding-left: 8px;
        }
        .btn1 {
          width: 40px;
          font-size: 15px;
          color: #c280ff;
          cursor: pointer;
        }
        .btn2 {
          width: 40px;
          font-size: 15px;
          color: #d9001b;
          cursor: pointer;
        }
      }
    }
    .add-dep {
      margin-top: 10px;
    }
    .tree-dep {
      margin-top: 10px;
      width: 100%;
      height: calc(100% - 100px);
      border: 1px solid rgba(215, 215, 215, 1);
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      .search {
        display: flex;
        padding: 5px 0px;
        height: 40px;
        border-bottom: 1px solid rgba(215, 215, 215, 1);
        .input {
          flex: 1;
          padding-left: 5px;
          width: 200px;
          height: 24px;
          line-height: 24px;
          font-size: 14px;
          padding: 5px 8px;
        }
        .input:empty::before {
          content: attr(placeholder);
          color: rgba(215, 215, 215, 1);
        }
        .btn {
          padding-left: 5px;
          width: 70px;
        }
      }
      .trees {
        flex: 1;
      }
    }
  }
  .user {
    flex: 1;
    margin-left: 20px;
    margin-right: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    .table {
      height: 100%;
      background: inherit;
      background-color: rgba(255, 255, 255, 1);
      border: none;
      border-radius: 4px;
      box-shadow: none;
    }
  }
}
</style>
