<template>
  <div class="point-setting">
    <div class="point-setting__contain">
      <div class="contain-left">
        <setting-nav title="点位设置" :nav-list="[{id: 1, name: '点位列表'}]" />
      </div>
      <div class="contain-right">
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
        <div class="px-20px bg-white" style="height: calc(100% - 80px);">
          <div class="flex items-center flex-row w-full mb-16px justify-between">
            <div class="text-14px">
              点位列表
            </div>
            <div class="relative">
              <el-button type="primary" size="mini" icon="el-icon-plus" @click="$refs.AddPoint.openDialog()">
                新增
              </el-button>
              <el-button size="mini" icon="el-icon-delete" @click="handleDelete($refs.mtable.$children[0].selection.map(i=>i.id),'ids')">
                删除
              </el-button>
              <el-button size="mini" icon="el-icon-refresh" @click="asyncVisable = true">
                同步点位
              </el-button>
            </div>
          </div>
          <WTable
            ref="mtable"
            class="h-4/5 w-full"
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
          />
          <!-- <base-table
            ref="muilipleTable"
            class="listTable"
            :loading="listLoadingAlarm"
            :table-data="tableDataAlarm"
            :selection="selection"
            :table-columns="tableHeaderAlarm"
            :default-column-config="{align: 'center'}"
            :total="total"
            :border="false"
            :pagination="pagination"
            @handleSizeChange="onSizeChange"
            @handleIndexChange="onIndexChange"
            @selectionChange="onSelectionChange"
          /> -->
        </div>
      </div>
    </div>

    <AddPoint ref="AddPoint" :robot-list="robotList" @getList="refresh" />
    <el-dialog
      v-if="asyncVisable"
      :visible="asyncVisable"
      title="同步"
      :destroy-on-close="true"
      width="30%"
      @close="asyncVisable = false"
    >
      <div class="container">
        <el-select v-model="robotId" size="mini" placeholder="请选择机器人">
          <el-option
            v-for="item in robotList"
            :key="item.equipmentCode"
            :label="item.label"
            :value="item.equipmentCode"
          />
        </el-select>
      </div>
      <template #footer>
        <el-button size="mini" @click="asyncVisable = false">
          关闭
        </el-button>
        <el-button type="primary" size="mini" @click="handleAsync">
          同步
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import SettingNav from '../../components/SettingNav.vue'
import AddPoint from '../../components/AddPoint.vue'
import { list, deleted, asynced } from '@/api/interface/system-point'
import { robotAllList } from '@/api/interface/equipment'
import { listMixin } from "@/mixin/list";
import { WForm, WTable } from "@common-ui/w-form";
import { formColumns, tableColumns } from "./config.js";
export default {
  components: {
    WForm,
    WTable,
    SettingNav,
    AddPoint
  },

  mixins: [listMixin],
  data() {
    return {
      formColumns,
      columns:tableColumns(this),
      tableData:[],
      total:0,
      formData: {
        pageNum: 1,
        pageSize: 10
      },
      deleteAPi: deleted,
      robotList: [],
      robotId: '',
      asyncVisable: false
    }
  },
  computed:{
    stationId(){
      return this.$store.state.station.station.id
    }
  },
  watch:{
    stationId(){
      this.refresh()
      this.onGetAllRobotList()
    }
  },
  created () {
    this.onGetAllRobotList()
  },
  mounted() {
    this.getList()
  },
  methods:{
    getList(){
      this.formData.pageNum = this.formData.pageIndex?this.formData.pageIndex:1
      list({ ...this.formData, stationId: this.stationId }).then(res=>{
        this.tableData = res.data
        this.total = res.totalCount
      })
    },

    // 获取所有机器人
    onGetAllRobotList () {

      
      robotAllList({ equipmentTypeIdList: [3], stationId: this.stationId }).then(res => {
        this.robotList = res.data.map(item => {
          return {
            ...item,
            label: `${item.equipmentName}[${item.equipmentCode}]`
          }
        })
      })
    },

    reset(){
      this.formData = {
        pageNum: 1,
        pageIndex: 1,
        pageSize: 10
      }
      this.refresh()
    },
    onDelete (ids) {
      this.$alert('确认删除?', '提示', {
        confirmButtonText: '确定',
        type: 'warning',
      }).then(() => {
        deleted({ids}).then(res => {
          this.$message.success(`删除成功！`)
          this.refresh()
        })
      })
    },
    handleAsync () {
      if (!this.robotId) {
        return this.$message.warning(`请先选择机器人！`)
      }
      asynced({ robotCode: this.robotId, stationId: this.stationId }).then(res => { this.$message.success(`同步成功！`) })
    }
  }
}
</script>

<style scoped lang='scss'>
  .point-setting {
    width: 100%;
    height: 100%;
    padding: 16px;

    &__contain {
      display: flex;
      width: 100%;
      height: 100%;

      .contain-left {
        width: 200px;
        height: 100%;
        background-color: #fff;
        border-radius: 2px;
      }

      .contain-right {
        flex: auto;
        height: 100%;
        width: calc(100% - 216px);
        background-color: #fff;
        margin-left: 16px;
        border-radius: 2px;
      }
    }
  }
</style>
