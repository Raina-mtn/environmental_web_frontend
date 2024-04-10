<template>
  <el-dialog width="25%" :visible="isShow" title="角色授权" class="content" @close="closeDialog()">
    <el-scrollbar style="height:300px" class="tree-container">
      <el-tree
        ref="tree"
        class="filter-tree"
        :data="menuTree"
        node-key="id"
        default-expand-all
        show-checkbox
        :expand-on-click-node="false"
        :default-checked-keys="resourceIdList"
        style="width:100%; height:200px"
        @check="checkMenu"
      />
    </el-scrollbar>
    <div slot="footer" class="btn-grops">
      <el-button size="small" plain @click="closeDialog">
        关闭
      </el-button>
      <el-button size="small" type="primary" @click="submit">
        保存
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { cloneDeep } from 'lodash-es'

import { apiGetRoleTree,apiSetRole,apiGetpermissions } from '@/api/interface/userManage'
// import { arrayToTree } from '@/utils/util'
export default {
  data() {
    return {
      // defaultProps: {
      //   children: 'children',
      //   label: 'label'
      // },
      resourceIdList: [],
      menuTree: [],
      checkedKeys: [],
      isShow:false
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    async getMenuList() {
      const { data } = await apiGetRoleTree()
      this.menuTree = data
    },
    submit() {
      apiSetRole({roleId:this.record.id, permissionIds: this.checkedKeys }).then(() => {
        this.$message.success('提交成功')
        this.closeDialog()
      })
    },
    checkMenu(node, checkedNode) {
      this.checkedKeys = checkedNode.checkedKeys.concat(checkedNode.halfCheckedKeys)
    },
    async openDialog(row) {
      this.isShow=true
      this.record = cloneDeep(row)
      const {data} = await apiGetpermissions({roleId:this.record.id})
      this.$refs.tree && this.$refs.tree.setCheckedKeys(data)
      this.checkedKeys = cloneDeep(data)
    },
    closeDialog() {
      this.isShow = false
      this.record={}
    },
  }
}
</script>
<style lang="scss" scoped>
.item-hd{
    font-size: px2rem(16);
    color: #999;
    padding-left: 1rem;
    position: relative;
    margin-bottom: 2rem;
    &:after{
        position: absolute;
        content: '';
        left: 0;
        top: 50%;
        transform: translate(0%, -50%);
        width: 4px;
        height: 1rem;
        border-radius: 2px;
    }
}
.tree-container{
    border: 1px solid #CCCCCC;
    border-radius: 2px;
}
::v-deep{
    .el-dialog__body{
        padding: 30px px2rem(60);
    }
    .el-tree{
      background: none;
      // color: #fff;
    }
    .el-tree-node__content:hover{
      background: rgba(44, 119, 227, 0.5);
    }
}
</style>