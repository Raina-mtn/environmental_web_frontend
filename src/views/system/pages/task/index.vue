<template>
  <div class="task-setting">
    <div class="task-setting__contain">
      <div class="contain-left">
        <setting-nav :title="'自动任务配置'" :nav-list="settingList" @onSendRequest="onSendRequest" />
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
              运维列表
            </div>
            <div class="relative">
              <!-- <el-button type="primary" size="mini" icon="el-icon-plus" @click="$refs.addTasks.openDialog()">
                新增
              </el-button>
              <el-button size="mini" icon="el-icon-delete" @click="handleDeleteTask(chooseList)">
                删除
              </el-button> -->
              <el-button size="mini" icon="iconfont icon-renwuguanli" @click="handleCreatePlan">
                生成计划任务
              </el-button>
            </div>
          </div>
          <WTable
            ref="mtable"
            class="h-4/5"
            :table-data="tableData"
            :selection="true"
            :selectable="() => selectList"
            reserve-selection
            :row-key="row => row.id"
            :stripe="false"
            :border="false"
            :columns="columns"
            :show-page="false"
            :page="formData"
            :size="'mini'"
            :total="total"
            height="100%"
            @pageChange="getList"
            @selectionChange="selectionChange"
          />
        </div>
      </div>
    </div>

    <AddTask ref="addTasks" :task-id="clickData && clickData.id" @getList="refresh" />
    <PlanTask ref="planTask" :config-id="clickData && clickData.id" :task-ids="chooseList" @getList="refresh" />
  </div>
</template>

<script>
import SettingNav from '../../components/SettingNav.vue'
import AddTask from '../../components/AddTask.vue'
import PlanTask from '../../components/PlanTask.vue'
// import {apiGetMaintenanceList} from '@/api/interface/maintenance'
import { settingList, tasksById, removeTasksById, tasksByIdExclude } from '@/api/interface/system-task'
import { listMixin } from "@/mixin/list"
import { WForm, WTable } from "@common-ui/w-form"
import { formColumns, tableColumns } from "./config.js"
export default {
  components: {
    WForm,
    WTable,
    SettingNav,
    AddTask,
    PlanTask
  },

  mixins: [listMixin],
  data() {
    return {
      formColumns,
      columns:tableColumns(this),
      tableData:[],
      total:0,
      // 设置列表
      settingList: [],
      formData: {
        // pageNum: 1,
        // pageSize: 10
      },
      // 当前点击的任务设置
      clickData: null,
      chooseList: [],
      selectList: []
    }
  },
  computed:{
    stationId(){
      return this.$store.state.station.station.id
    },
    taskIds () {
      const arr = this.tableData.map(item => {
        return item.id
      })
      return arr
    }
  },
  watch:{
    stationId(){
      this.refresh()
    },
    clickData: {
      deep: true,
      async handler () {
        await this.getOthersList()
        await this.getList()
        // 回显勾选数据
        this.$nextTick(() => {
          const idList = this.tableData.map(item => {
            return item.id
          })
          this.selectList.forEach(item => {
            if (idList.includes(item.id)) {
              this.$refs.mtable.toggleRowSelection([item], true)
            }
          })
        })
      }
    }
  },
  mounted() {
    // this.getList()
    this.onGetSettingList()
  },
  methods:{
    // 获取未关联的运维项目
    async getOthersList () {
      await tasksByIdExclude({ ...this.formData, taskConfigId: this.clickData.id }).then(res=>{
        this.tableData = [...res.data, ...this.tableData]
      })
    },
    // 获取已关联的运维项目
    async getList(){
      // this.formData.pageNum = this.formData.pageIndex?this.formData.pageIndex:1
      await tasksById({ ...this.formData, taskConfigId: this.clickData.id }).then(res=>{
        this.tableData = [...res.data, ...this.tableData]
        this.selectList = res.data
        // console.log('打印数据:', this.$refs.mtable)
        
       
        // this.total = res.totalCount
      })
    },
    // 获取任务设置列表数据
    onGetSettingList () {
      settingList({}).then(res => {
        this.clickData = res.data[0]
        const list = res.data.map(item => {
          return {
            ...item,
            name: item.autoTaskConfigName
          }
        })
        this.settingList = [list[0]]
      })
    },

    onSendRequest (props) {
      // this.clickData = {...props}
    },

    handleDeleteTask (props) {
      this.$alert('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        type: 'warning',
      }).then(() => {
        const list = props.map(item => {
          return {
            operationId: item,
            taskConfigId: this.clickData.id
          }
        })
        removeTasksById(list).then(res => {
          this.$message.success('删除成功！')
          this.getList()
          this.$refs.addTasks.getList()
        }).finally(() => {
          this.refresh()
        })
      })
    },

    handleCreatePlan () {
      if (this.chooseList.length > 0) {
        this.$refs.planTask.openDialog()
      } else {
        this.$message.warning('当前没有选择运维项目，请先选择运维项目！')
      }
      
    },

    async refresh(){
      // this.formData.pageNum = 1
      // this.formData.pageSize = 10
      this.tableData = []
      await this.getOthersList()
      await this.getList()
    },

    selectionChange (props) {
      this.chooseList = props.map(item => {
        return item.id
      })
    },

    async reset(){
      this.formData = {}
      this.tableData = []
      await this.getOthersList()
      await this.getList()
    },
  }
}
</script>

<style scoped lang='scss'>
  .task-setting {
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
        background-color: #fff;
        margin-left: 16px;
        border-radius: 2px;
        ::v-deep .iconfont {
          font-size: 12px;
        }
      }
    }

    
  }
</style>
