<template>
  <div>
    <el-dialog :visible="isShow" :title="isEdit?'编辑计划':'新建计划'" top="30px" width="60%" @close="closeDialog()">
      <div class="container">
        <div>
          <div class="title">
            任务信息
          </div>
          <el-scrollbar class="h-250px mt-16px">
            <WForm
              ref="wform"
              label-width="140px"
              :form-data="formData"
              :columns="formColumns"
              size="mini"
              style="height: 150px;"
            />
          </el-scrollbar>
        </div>
        <div>
          <div class="title">
            质控内容
          </div>
          <div class="mt-16px">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="$refs.addTasks.openDialog()">
              新增
            </el-button>
            <el-button size="mini" icon="el-icon-delete" @click="handleDeleteTask">
              批量删除
            </el-button>
          </div>
          <div class=" mt-16px pb-24px">
            <WTable
              ref="mtable"
              :table-data="tableData"
              :selection="true"
              :selectable="() => []"
              :stripe="false"
              :border="false"
              :columns="columns"
              :page="page"
              :size="'mini'"
              :total="total"
              @pageChange="getList"
              @selectionChange="selectionChange"
            />
          </div>
        </div>
      </div>
      <template #footer>
        <el-button size="mini" @click="isShow = false">
          关闭
        </el-button>
        <el-button type="primary" size="mini" @click="submit">
          保存
        </el-button>
      </template>
    </el-dialog>
    <AddTask ref="addTasks" @sendList="handleSendList" />
  </div>
</template>

<script>
import {planTask,periodSetting} from '@/utils/config'
import { WForm,WTable } from "@common-ui/w-form";
import { cloneDeep, truncate } from 'lodash-es'
import { add, edit,apiGetTaskType,apiGetExecuteType,apiGetPeriodType,apiGetPlanDetail} from '@/api/interface/quality-plan'
// import { tasksById } from '@/api/interface/system-task'
import AddTask from './AddTask.vue';
const checkNum = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入执行次数'))
  }
  if (!Object.prototype.toString.call(value) === '[object Number]' || isNaN(value)) {
    callback(new Error('请输入数字值'))
  }
  if (!(/(^[1-9]\d*$)/.test(value))) {
    callback(new Error('请输入正整数'))
  }
  callback()
}
export default {
  components:{
    WForm,
    WTable,
    AddTask
  },
  data() {
    return {
      isShow:false,
      isEdit:false,
      formData:{},
      page:{
        pageNum: 1,
        pageSize: 10,
        stationId:'',
      },
      tableData:[],
      total:0,
      // 已选择的列表
      chooseList: [],
      columns:[
        {
          label: '编号',
          prop: 'qcExternalCode'
        },
        {
          label: "质控类型",
          prop:'qcType'
        },
        {
          label: "质控仪器",
          prop:'instrumentName'
        },
        {
          label: "质控周期(天/次)",
          prop:'qcCycleTime'
        },
        {
          label: "质控名称",
          prop:'qcName'
        },
        {
          label: '质控内容',
          prop: 'qcContent'
        },
        {
          label: "操作",
          width: 120,
          render: (h, scope) => {
            return [
              <el-link type="primary" underline={false} onClick={()=>{ this.tableData.splice(scope.$index, 1) }}>删除</el-link>,
            ];
          },
        },
      ],
      equipmentList:[],
      // 设备列表
      deviceList: []
    }
  },
  computed:{
    formColumns(){
      if(this.formData.generateTaskType=='1'){
        return [{
          label: '任务名称',
          prop: 'qcTaskName',
          el: 'input',
          rules:[{ required: true, message: "请输入任务名称" }],
          placeholder: '请输入任务名称',
          clearable: true,
          span: 12
        },{
          label: '任务类型',
          prop: 'generateTaskType',
          el: "wSelect",
          getList: async () => ({
            data: (await apiGetTaskType()).data,
          }),
          "value-key": {
            label: "value",
            value: "key",
          },
          disabled:true,
          rules:[{ required: true, message: "请选择任务类型" }],
          placeholder: '请选择任务类型',
          clearable: true,
          span: 12
        },{
          label: '执行类型',
          prop: 'executeType',
          el: "wSelect",
          getList: async () => ({
            data: (await apiGetExecuteType()).data,
          }),
          "value-key": {
            label: "value",
            value: "key",
          },
          rules:[{ required: true, message: "请选择执行类型" }],
          placeholder: '请选择执行类型',
          clearable: true,
          span: 12
        },{
          label: '计划开始时间 ',
          prop: 'planStartTime',
          el: 'date-picker',
          type:'datetime',
          'pickerOptions':{
            disabledDate(i) {
              return i.getTime() < (Date.now()-(24 * 60 * 60 * 1000));
            }
          },
          placeholder: '请选择计划开始时间 ',
          rules:[{ required: true, message: "请选择计划开始时间" }],
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          clearable: true,
          span: 12
        },{
          label: '备注',
          prop: 'remark',
          el: 'input',
          type:'textarea',
          placeholder: '请输入备注',
          clearable: true,
          span: 12
        }]
      }else if(this.formData.generateTaskType=='2'){
        if(this.formData.periodType === '2'){
          return [{
            label: '任务名称',
            prop: 'qcTaskName',
            el: 'input',
            rules:[{ required: true, message: "请输入任务名称" }],
            placeholder: '请输入任务名称',
            clearable: true,
            span: 12
          },{
            label: '任务类型',
            prop: 'generateTaskType',
            el: "wSelect",
            getList: async () => ({
              data: (await apiGetTaskType()).data,
            }),
            "value-key": {
              label: "value",
              value: "key",
            },
            disabled:true,
            options:planTask,
            rules:[{ required: true, message: "请选择任务类型" }],
            placeholder: '请选择任务类型',
            clearable: true,
            span: 12
          },{
            label: '执行类型',
            prop: 'executeType',
            el: "wSelect",
            getList: async () => ({
              data: (await apiGetExecuteType()).data,
            }),
            "value-key": {
              label: "value",
              value: "key",
            },
            rules:[{ required: true, message: "请选择执行类型" }],
            placeholder: '请选择执行类型',
            clearable: true,
            span: 12
          },{
            label: '周期类型',
            prop: 'periodType',
            el: "wSelect",
            getList: async () => ({
              data: (await apiGetPeriodType()).data,
            }),
            "value-key": {
              label: "value",
              value: "key",
            },
            rules:[{ required: true, message: "请选择周期类型" }],
            placeholder: '请选择周期类型',
            clearable: true,
            span: 12
          },{
            label: '任务周期',
            prop: 'taskPeriod',
            el: 'select',
            multiple:true,
            options:periodSetting,
            rules:[{ required: true, message: "请选择任务周期" }],
            placeholder: '请选择任务周期',
            clearable: true,
            span: 12
          },{
            label: '计划开始时间',
            prop: 'planStartTime',
            el: 'date-picker',
            type:'datetime',
            placeholder: '请选择计划开始时间',
            'pickerOptions':{
              disabledDate(i) {
                return i.getTime() < (Date.now()-(24 * 60 * 60 * 1000));
              }
            },
            rules:[{ required: true, message: "请选择计划开始时间" }],
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
            clearable: true,
            span: 12
          },{
            label: '执行次数',
            prop: 'executeTimes',
            el: 'input',
            type:'number',
            placeholder: '请输入',
            clearable: true,
            span: 12,
            min:0,
            rules:[
              { required: true,  message: "请输入执行次数" },
              { validator: checkNum, trigger: "blur" }],
          }
          ,{
            label: '备注',
            prop: 'remark',
            el: 'input',
            type:'textarea',
            placeholder: '请输入备注',
            clearable: true,
            span: 12
          }]
        }else{
          return [{
            label: '任务名称',
            prop: 'qcTaskName',
            el: 'input',
            rules:[{ required: true, message: "请输入任务名称" }],
            placeholder: '请输入任务名称',
            clearable: true,
            span: 12
          },{
            label: '任务类型',
            prop: 'generateTaskType',
            el: "wSelect",
            getList: async () => ({
              data: (await apiGetTaskType()).data,
            }),
            "value-key": {
              label: "value",
              value: "key",
            },
            disabled:true,
            options:planTask,
            rules:[{ required: true, message: "请选择任务类型" }],
            placeholder: '请选择任务类型',
            clearable: true,
            span: 12
          },{
            label: '执行类型',
            prop: 'executeType',
            el: "wSelect",
            getList: async () => ({
              data: (await apiGetExecuteType()).data,
            }),
            "value-key": {
              label: "value",
              value: "key",
            },
            rules:[{ required: true, message: "请选择执行类型" }],
            placeholder: '请选择执行类型',
            clearable: true,
            span: 12
          },{
            label: '周期类型',
            prop: 'periodType',
            el: "wSelect",
            getList: async () => ({
              data: (await apiGetPeriodType()).data,
            }),
            "value-key": {
              label: "value",
              value: "key",
            },
            rules:[{ required: true, message: "请选择周期类型" }],
            placeholder: '请选择周期类型',
            clearable: true,
            span: 12
          },{
            label: '计划开始时间',
            prop: 'planStartTime',
            el: 'date-picker',
            type:'datetime',
            placeholder: '请选择计划开始时间',
            'pickerOptions':{
              disabledDate(i) {
                return i.getTime() < (Date.now()-(24 * 60 * 60 * 1000));
              }
            },
            rules:[{ required: true, message: "请选择计划开始时间" }],
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
            clearable: true,
            span: 12
          },{
            label: '执行次数',
            prop: 'executeTimes',
            el: 'input',
            type:'number',
            placeholder: '请输入',
            clearable: true,
            span: 12,
            min:0,
            rules:[
              { required: true,  message: "请输入执行次数" },
              { validator: checkNum, trigger: "blur" }],
          }
          ,{
            label: '备注',
            prop: 'remark',
            el: 'input',
            type:'textarea',
            placeholder: '请输入备注',
            clearable: true,
            span: 12
          }]
        }
      }else{
        return [{
          label: '任务名称',
          prop: 'qcTaskName',
          el: 'input',
          rules:[{ required: true, message: "请输入任务名称" }],
          placeholder: '请输入任务名称',
          clearable: true,
          span: 12
        },{
          label: '任务类型',
          prop: 'generateTaskType',
          el: "wSelect",
          getList: async () => ({
            data: (await apiGetTaskType()).data,
          }),
          "value-key": {
            label: "value",
            value: "key",
          },
          disabled:true,
          options:planTask,
          rules:[{ required: true, message: "请选择任务类型" }],
          placeholder: '请选择任务类型',
          clearable: true,
          span: 12
        },{
          label: '执行类型',
          prop: 'executeType',
          el: "wSelect",
          getList: async () => ({
            data: (await apiGetExecuteType()).data,
          }),
          "value-key": {
            label: "value",
            value: "key",
          },
          rules:[{ required: true, message: "请选择执行类型" }],
          placeholder: '请选择执行类型',
          clearable: true,
          span: 12
        },{
          label: '首次任务时间',
          prop: 'planStartTime',
          el: 'date-picker',
          type:'datetime',
          placeholder: '请选择首次任务时间',
          'pickerOptions':{
            disabledDate(i) {
              return i.getTime() < (Date.now()-(24 * 60 * 60 * 1000));
            }
          },
          rules:[{ required: true, message: "请选择首次任务时间" }],
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          clearable: true,
          span: 12
        },{
          label: '生成任务截止日期',
          prop: 'generateEndTime',
          el: 'date-picker',
          type:'datetime',
          placeholder: '请选择生成任务截止日期',
          'pickerOptions':{
            disabledDate(i) {
              return i.getTime() < (Date.now()-(24 * 60 * 60 * 1000));
            }
          },
          rules:[{ required: true, message: "请选择生成任务截止日期" }],
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          clearable: true,
          span: 12
        },{
          label: '备注',
          prop: 'remark',
          el: 'input',
          type:'textarea',
          placeholder: '请输入备注',
          clearable: true,
          span: 12
        }]
      }
    },
    stationId(){
      return this.$store.state.station.station.id
    }
  },
  methods: {
    openDialog(isEdit=false,record={}){
      this.formData = cloneDeep(record)
      this.isEdit = isEdit
      this.isShow = true
      if (isEdit) {
        this.getPlanDetail(record.id)
      }
    },
    closeDialog(){
      this.isShow = false
      this.formData={}
      this.tableData = []
    },
    submit(){
      if (this.tableData.length === 0) {
        return  this.$message.warning('请至少添加一条运维项目！')
      }
      this.$refs.wform.validate((valid) => {
        if (valid) {
          const api = this.isEdit?edit:add
          this.formData.stationId= this.page.stationId
          this.formData.taskPeriod = this.formData.taskPeriod?this.formData.taskPeriod.join():''
          this.formData.qcContentIds = this.tableData.map(item => {
            return item.id
          })
          api({...this.formData}).then(res=>{
            this.$message.success(this.isEdit?'编辑成功！':'新增成功！')
            this.$emit('refresh')
            this.closeDialog()
          })
        }
      })
      
    },

    // 处理添加质控内容
    handleSendList (list) {
      if (this.tableData.length === 0) {
        this.tableData = [...list]
      } else {
        // 去重
        const newlist = [...this.tableData, ...list]
        let map = new Map();
        for (let item of newlist) {
          if (!map.has(item.id)) {
            map.set(item.id, item)
          }
        }
        this.tableData = [...map.values()]
      }
    },

    // 批量删除
    handleDeleteTask () {
      this.tableData = this.tableData.filter((item, index) => {
        return !this.chooseList.includes(item.id)
      })
    },

    // 表格选择框变化事件
    selectionChange (props) {
      this.chooseList = props.map(item => {
        return item.id
      })
    },

    getList(){
      if(this.formData.taskOperateType && this.page.stationId){
        this.page.pageNum = this.page.pageIndex?this.page.pageIndex:1
        // apiGetDeviceList(this.page).then(res=>{
        //   this.tableData = res.data
        //   this.total = res.totalCount
        // })
      }
    },
    // 获取质控内容列表
    getPlanDetail(id) {
      apiGetPlanDetail(id).then(res => {
        const {qcContentVOList,...args} = res.data
        this.tableData = qcContentVOList
        this.total = qcContentVOList.length
        this.formData = args
        this.formData.generateTaskType = String(this.formData.generateTaskType)
        this.formData.periodType = String(this.formData.periodType)
        
        if(this.formData.taskPeriod){
          this.formData.taskPeriod = this.formData.taskPeriod.split(',')
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
</style>