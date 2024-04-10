<template>
  <el-dialog
    :visible="isShow"
    :title="isEdit ? '编辑' : '新增'"
    :destroy-on-close="true"
    width="600px"
    @close="closeDialog()"
  >
    <div class="container">
      <div>
        <WForm
          ref="wform"
          label-width="130px"
          :form-data="formData"
          :columns="formColumns"
          size="mini"
          @currentObj="onCurrentObj"
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
import { WForm } from "@common-ui/w-form";
import { cloneDeep } from 'lodash-es'
import { add, edit } from '@/api/interface/system-point'
import { contents } from '@/api/interface/system-project'
// import { isPhone } from "@/utils/validate.js";
// import { apiGetStation } from '@/api/interface/user'
const checkNum = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入坐标'))
  }
  if (!Object.prototype.toString.call(value) === '[object Number]' || isNaN(value)) {
    callback(new Error('请输入数字值'))
  }
  callback()
}
export default {
  components: {
    WForm,
  },

  props: {
    robotList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      isShow:false,
      isEdit:false,
      formData: {
        roleId:1,
        robotTypeName: '',
        robotCode: ''
      },
      parentList:[]
    };
  },
  computed:{
    formColumns(){
      return [
        {
          label: "机器人",
          prop: "robotCode",
          el: "wSelect",
          rules: [{ required: true, message: "请选择机器人编号" }],
          // options: [],
          getList: async () => ({
            data: this.robotList,
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
          label: "机器人类型",
          prop: "robotTypeName",
          el: "input",
          disabled: true,
          rules: [{ required: true, message: "请选择机器人类型" }],
          // options:[{
          //   value:'1000000001',
          //   label:'西溪湿地站'
          // },],
          // getList: async () => ({
          //   data: (await apiGetStation()).data,
          // }),
          // "value-key": {
          //   label: "stationName",
          //   value: "id",
          // },
          placeholder: "请选择机器人类型",
          clearable: true,
          span: 24,
        },
        {
          label: "点位编号",
          prop: "spotCode",
          el: "input",
          rules: [{ required: true, message: "请输入点位编号" }],
          placeholder: "请输入点位编号",
          clearable: true,
          span: 24,
        },
        {
          label: "点位名称",
          prop: "spotName",
          el: "input",
          rules: [{ required: true, message: "请输入点位名称" }],
          placeholder: "请输入点位名称",
          clearable: true,
          span: 24,
        },
        // {
        //   label: "坐标[X]",
        //   prop: "coordinateX",
        //   el: "input",
        //   rules: [
        //     { required: true, message: "请输入坐标" },
        //     { validator: checkNum, trigger: "blur" }
        //   ],
        //   placeholder: "请输入坐标",
        //   clearable: true,
        //   span: 24,
        // },
        // {
        //   label: "坐标[Y]",
        //   prop: "coordinateY",
        //   el: "input",
        //   rules: [
        //     { required: true, message: "请输入坐标" },
        //     { validator: checkNum, trigger: "blur" }
        //   ],
        //   placeholder: "请输入坐标",
        //   clearable: true,
        //   span: 24,
        // },
        // {
        //   label: "运维内容",
        //   prop: "contentId",
        //   el: "wSelect",
        //   rules: [{ required: true, message: "请选择运维内容" }],
        //   // options:[{
        //   //   value:'1000000001',
        //   //   label:'西溪湿地站'
        //   // },],
        //   getList: async () => ({
        //     data: (await contents()).data,
        //   }),
        //   "value-key": {
        //     label: "content",
        //     value: "id",
        //   },
        //   placeholder: "请选择运维内容",
        //   clearable: true,
        //   span: 24,
        // }
      ]
    },
    stationId(){
      return this.$store.state.station.station.id
    }
  },
  methods: {
    openDialog(record={}, isEdit=false){
      this.formData = cloneDeep(record)
      this.formData.stationIdList = Number(this.formData.stationIdList)
      this.isShow = true
      this.isEdit = isEdit
    },
    closeDialog() {
      this.isShow = false
      this.formData={
        roleId:1,
        robotTypeName: '',
        robotCode: ''
      }
    },

    onCurrentObj  (data, key) {
      if (key === 'robotCode' && data) {
        // this.formData.robotTypeName = data.equipmentType
        this.$set(this.formData, 'robotTypeName', data.equipmentType)
        this.formData.robotType = data.equipmentTypeId
      }
    },
    submit() {
      this.$refs.wform.validate(async(valid) => {
        if (valid) {
          if (this.isEdit) {
            edit(this.formData, this.formData.id).then(res=>{
              this.$message.success(`更新成功！`)
              this.$emit("getList");
              this.closeDialog()
            })
          } else {
            add({ ...this.formData, stationId: this.stationId, subDeviceId: 0 }).then(res=>{
              this.$message.success(`新增成功！`)
              this.$emit("getList");
              this.closeDialog()
            })
          }
        }
      })
    },
  },
};
</script>
