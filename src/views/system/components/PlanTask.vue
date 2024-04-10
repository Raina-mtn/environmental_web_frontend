<template>
  <el-dialog
    :visible="isShow"
    :title="isEdit ? '编辑' : '生成计划任务'"
    :destroy-on-close="true"
    width="600px"
    @close="closeDialog()"
  >
    <div class="container">
      <div>
        <WForm
          ref="wform"
          class="h-300px"
          label-width="140px"
          :form-data="formData"
          :columns="formColumns"
          size="mini"
        />
        <div class="flex text-14px pl-2">
          <i class="el-icon-warning-outline leading-10" />
          <div class="ml-4 leading-12">
            计划说明：系统将基于此任务时间范围及运维项目周期规范，生成每日运维任务，任务列表见【任务计划】页面
          </div>
        </div>
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
import { WForm } from "@common-ui/w-form";
import { cloneDeep } from 'lodash-es'
// import { apiAddUser,apiUpdateUser } from "@/api/interface/userManage";
import {apiGetEquipmentList} from '@/api/interface/equipment'
import { createPlanTask } from '@/api/interface/system-task'
import { robotAllList } from '@/api/interface/equipment'
export default {
  components: {
    WForm,
  },
  props: {
    taskIds: {
      type: Array,
      default: () => []
    },
    configId: {
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {
      isShow:false,
      isEdit:false,
      formData: {
      },
      parentList:[]
    };
  },
  computed:{
    formColumns(){
      return [
        {
          label: "任务名称",
          prop: "autoTaskConfigName",
          el: "input",
          rules: [{ required: true, message: "请输入任务名称" }, { max: 30, message: "长度在30个字符以内"}],
          placeholder: "请输入任务名称",
          clearable: true,
          span: 24,
        },
        {
          label: "机器人",
          prop: "equipmentCode",
          multiple:false,
          'multiple-limit':1,
          el: "wSelect",
          rules: [{ required: true, message: "请选择机器人" }],
          // options:[{
          //   value:'1000000001',
          //   label:'西溪湿地站'
          // },],
          getList: async () => ({
            data: (await robotAllList({ equipmentTypeIdList: [3], stationId: this.stationId })).data.map(item => {
              return {
                ...item,
                label: `${item.equipmentName}[${item.equipmentCode}]`
              }
            }),
          }),
          "value-key": {
            label: "label",
            value: "equipmentCode",
          },
          placeholder: "请选择机器人",
          clearable: true,
          span: 24,
        },
        {
          label: "附属设备",
          prop: "attachEquips",
          multiple:true,
          el: "wSelect",
          rules: [{ required: false, message: "请选择附属设备" }],
          // options:[{
          //   value:'1000000001',
          //   label:'西溪湿地站'
          // },],
          getList: async () => ({
            data: (await apiGetEquipmentList({equipmentTypeId:7,stationId:this.stationId})).data,
          }),
          "value-key": {
            label: "equipmentName",
            value: "id",
          },
          placeholder: "请选择附属设备",
          clearable: true,
          span: 24,
        },
        {
          label: '首次任务时间',
          prop: 'startTime',
          el: 'date-picker',
          type:'datetime',
          'pickerOptions':{
            disabledDate(i) {
              return i.getTime() < (Date.now()-(24 * 60 * 60 * 1000));
            }
          },
          placeholder: '请选择首次任务时间',
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          rules:[{ required: true, message: "请选择首次任务时间" }],
          clearable: true,
          span: 24
        },
        {
          label: '生成任务截止日期',
          prop: 'endTime',
          el: 'date-picker',
          type:'datetime',
          'pickerOptions':{
            disabledDate(i) {
              return i.getTime() < (Date.now()-(24 * 60 * 60 * 1000));
            }
          },
          placeholder: '请选择生成任务截止日期',
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          rules:[{ required: true, message: "请选择生成任务截止日期" }],
          clearable: true,
          span: 24
        }
      ]
    },
    stationId(){
      return this.$store.state.station.station.id
    }
  },
  methods: {
    openDialog(isEdit=false,record={}){
      // apiGetOrganizationTree().then(res=>{
      //   this.parentList = [res.data]
      // })
      this.formData = cloneDeep(record)
      // this.formData.roleId = 1
      // this.formData.orgId = Number(this.formData.orgId)
      // this.formData.stationIdList = Number(this.formData.stationIdList)
      this.isShow = true
      this.isEdit = isEdit
    },
    closeDialog() {
      this.isShow = false
      this.formData={}
    },
    submit() {
      // const api = this.isEdit?apiUpdateUser:apiAddUser
      this.$refs.wform.validate(async(valid) => {
        if (valid) {
          const planStartTime = new Date(
            this.formData.startTime
          ).getTime()
          const planEndTime = new Date(
            this.formData.endTime
          ).getTime()
          if (planStartTime > planEndTime) {
            this.$message.error('任务截止时间需大于首次任务时间')
            return
          }
          const params = {
            ...this.formData,
            id: this.configId,
            patrolOperations: this.taskIds
          }
          createPlanTask(params).then(res=>{
            this.$message.success(`计划生成成功！`)
            this.$emit("getList");
            this.closeDialog()
          })
        }
      })
    },
  },
};
</script>
