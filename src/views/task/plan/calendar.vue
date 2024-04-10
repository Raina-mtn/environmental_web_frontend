<template>
  <div class="h-full w-full flex flex-row wrapper">
    <div class="w-3/5 mr-16px relative overflow-auto bg-white">
      <el-calendar ref="mCalendar" v-model="date" class="h-full">
        <template slot="dateCell" slot-scope="{ date, data }">
          <div class="h-full">
            <p :class="data.isSelected ? 'is-selected' : ''">
              {{ dayjs(date).date() }}
            </p>
            <el-scrollbar class="h-80px">
              <calendar-item
                v-for="item in tableList[data.day]"
                :key="item.code"
                ref="calendarItem"
                :record="item"
              />
            </el-scrollbar>
          </div>
        </template>
      </el-calendar>
    </div>
    <div class="w-2/5 h-full bg-white">
      <div class="flex justify-between mt-16px px-24px">
        <div class="font-bold text-2xl">
          任务列表
        </div>
        <div>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="$refs.chooseType.openDialog()"
          >
            新增
          </el-button>
          <el-button size="small" icon="el-icon-delete" @click="handleDelete($refs.mtable.$children[0].selection.map(i=>i.id),'idList')">
            删除
          </el-button>
          <el-button-group class="ml-16px">
            <el-button size="small" @click="$router.push('/opex/design')">
              列表视图
            </el-button>
            <el-button size="small" class="btn">
              日历视图
            </el-button>
          </el-button-group>
        </div>
      </div>
      <WTable
        ref="mtable"
        :table-data="tableData"
        show-num
        :selectable="()=>true"
        :selection="true"
        :stripe="false"
        :border="false"
        :columns="columns"
        :show-page="false"
        :size="'mini'"
        style="height: calc(90% - 60px)"
        height="100%"
      />
    </div>
    <edit-dialog ref="editdialog" @refresh="getList" />
    <choose-type ref="chooseType" @handleNext="handleNext" />
  </div>
</template>
<script>
import { listMixin } from "@/mixin/list";
import { WTable } from "@common-ui/w-form";
import { timeTypeObj,operateTypeObj } from "@/utils/config";
import {apiStartPlanTask} from '@/api/interface/task'
import { list, deleted } from '@/api/interface/opex/plan'
import calendarItem from "./calendarItem.vue";
import editDialog from "./editDialog.vue";
import ChooseType from './components/ChooseType.vue';
import dayjs from "dayjs";
export default {
  components: {
    WTable,
    calendarItem,
    editDialog,
    ChooseType,
  },
  mixins: [listMixin],
  data() {
    return {
      total: 0,
      timeTypeObj,
      tableData: [],
      tableList: {},
      formData:{
        minPlanStartTime:dayjs().startOf('month').format('YYYY-MM-DD 00:00:00'),
        maxPlanStartTime:dayjs().endOf('month').format('YYYY-MM-DD 23:59:59'),
        pageNum: 1,
        pageSize: 100000,
        // stationId:'1000000033'
      },
      date: new Date(),
      dayjs,
      deleteAPi:deleted,
    };
  },
  computed: {
    columns() {
      const that = this
      return [
        {
          label: "计划编号",
          prop: "id",
        },
        {
          label: "任务名称",
          prop: "maintenanceTaskName",
        },
        {
          label: "任务类型",
          prop: "generateTaskTypeName",
        },
        {
          label: "操作",
          // width: 240,
          render: (h, { row }) => {
            return [
              <el-link type="primary" underline={false} onClick={()=>{this.$refs.editdialog.openDialog(true,row)}}>编辑</el-link>,
              <el-link class="mx-4" type="primary" underline={false} onClick={()=>{this.handleDelete([row.id],'ids')}}>删除</el-link>,
            ];
          },
        },
      ];
    },
    currentMonth(){
      return dayjs(this.date).month()
    },
    stationId(){
      return this.$store.state.station.station.id
    }
  },
  watch: {
    date(value) {
      this.tableData = this.tableList[dayjs(this.date).format("YYYY-MM-DD")];
    },
    currentMonth(value){
      this.formData.minPlanStartTime = dayjs(this.date).startOf('month').format('YYYY-MM-DD 00:00:00'),
      this.formData.maxPlanStartTime = dayjs(this.date).endOf('month').format('YYYY-MM-DD 23:59:59')
      
      this.getList()
    },
    stationId(){
      this.getList()
    }
  },
  mounted(){
    this.getList()
  },
  methods: {
    async getList(){
      this.tableList = {}
      await list({...this.formData,stationId:this.stationId}).then(res=>{
        res.data.forEach(i=>{
          //新建属性名
          if (Object.keys(this.tableList).indexOf('' + i.planStartTime.split(' ')[0]) === -1) {
            this.$set(this.tableList,i.planStartTime.split(' ')[0],[])
          }
          //对应插入属性值
          this.tableList[i.planStartTime.split(' ')[0]].push(i)
        })

        this.tableData = this.tableList[dayjs(this.date).format("YYYY-MM-DD")];
      })
    },
    handleDelete(deleteList,paramsName){
      if(Array.isArray(deleteList) && !deleteList.length){
        this.$message.error('请至少选择一条记录！')
      }else{
        this.$alert('确认删除?', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        }).then(() => {
          this.deleteAPi({
            [paramsName]: deleteList
          }).then(() => {
            this.$message.success('删除成功')
          }).finally(() => {
            this.refresh()
            this.tableData = this.tableList[dayjs(this.date).format("YYYY-MM-DD")];
          })
        })
      }
    },
    
    // 启动
    handleStart(id){
      apiStartPlanTask({id}).then(res=>{
        this.$message.success('启动中...')
      })
    },
    
    // 处理新建任务下一步
    handleNext (props) {
      this.$refs.editdialog.openDialog(false, { taskOperateType: props })
    },
  },
};
</script>
<style lang="scss" scoped>
.is-today {
  p {
    text-align: center;
    padding-top: 3px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
}

.btn,
.btn:hover {
  color: #1890ff;
  border-color: #1890ff;
  margin-right: 0 !important;
  background: #ffffff;
}
::v-deep {
  .el-calendar-day {
    height: 110px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .el-calendar__body {
    height: 90%;
  }
  .el-calendar-table {
    height: 100%;
    td.is-today {
      .el-calendar-day {
        p {
          background: #1890ff;
          color: #fff;
        }
      }
    }
  }
  .el-calendar__header {
    display: block;
    text-align: center;
    .el-calendar__title {
      font-weight: bold;
      font-size: 16px;
    }
  }

  .el-calendar__button-group {
    .el-button-group {
      display: flex;
      justify-content: space-between;
    }

    .el-button-group::after,
    .el-button-group::before {
      content: unset;
    }

    .el-button-group > .el-button:not(:first-child):not(:last-child) {
      display: none;
    }

    .el-button-group > .el-button:first-child:before {
      content: "<";
    }

    .el-button-group > .el-button:last-child:before {
      content: ">";
    }

    .el-button-group > .el-button:first-child {
      position: absolute;
      top: 10px;
    }

    .el-button-group > .el-button:last-child {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    .el-button-group > .el-button:first-child span,
    .el-button-group > .el-button:last-child span {
      display: none;
    }
  }
}
</style>
