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
          class="h-400px"
          label-width="130px"
          :form-data="formData"
          :columns="formColumns"
          size="mini"
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
import { add, edit } from '@/api/interface/system-project'
import { allList } from '@/api/interface/system-point'
const checkNum = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入运维周期'))
  }
  if (!Object.prototype.toString.call(value) === '[object Number]' || isNaN(value)) {
    callback(new Error('请输入数字值'))
  }
  if (value < 1 || value > 365) {
    callback(new Error('请输入1~365之间的数字'))
  }
  callback()
}
export default {
  components: {
    WForm,
  },
  data() {
    return {
      isShow:false,
      isEdit:false,
      formData: {
        roleId:1
      },
      pointList: []
    };
  },

  computed:{
    formColumns(){
      return [
        {
          label: "编号",
          prop: "no",
          el: "input",
          rules: [{ required: true, message: "请输入编号" }],
          placeholder: "请输入编号",
          clearable: true,
          span: 24,
        },
        {
          label: "运维类型",
          prop: "omType",
          el: "select",
          rules: [{ required: true, message: "请选择运维类型", trigger: "blur" }],
          options:[
            {
              value: 1,
              label:'运维作业'
            },
            {
              value: 2,
              label:'运维巡检'
            }
          ],
          // getList: async () => ({
          //   data: (await apiGetStation()).data,
          // }),
          placeholder: "请选择运维类型",
          clearable: true,
          span: 24,
        },
        {
          label: "运维名称",
          prop: "operation",
          el: "input",
          rules: [
            { required: true, message: "请输入运维名称" }
          ],
          placeholder: "请输入运维名称",
          clearable: true,
          span: 24,
        },
        {
          label: "运维周期",
          prop: "cycleTime",
          el: "input",
          rules: [{ required: true, message: "请输入运维周期" },
            { validator: checkNum, trigger: "blur" }],
          placeholder: "请输入1~365",
          clearable: true,
          append: true,
          appendText: '天 / 次',
          span: 24,
        },
        {
          label: "运维内容",
          prop: "content",
          type: "textarea",
          el: "input",
          placeholder: "请输入运维内容",
          clearable: true,
          rules: [
            { required: true, message: "请输入运维内容", trigger: "blur" }
          ],
          span: 24,
        },
        {
          label: "点位",
          prop: "deviceList",
          el: "select",
          multiple: true,
          'collapse-tags':true,
          rules: [{ required: false, message: "请选择点位", trigger: "blur" }],
          options: this.pointList,
          // getList: () => ({
          //   data: this.pointList.map(item => {
          //     return {
          //       value: item.deviceId,
          //       label: item.deviceName
          //     }
          //   }),
          // }),
          placeholder: "请选择点位",
          clearable: true,
          span: 24,
        },
      ]
    }
  },
  mounted () {
    this.onGetDeviceList()
  },
  methods: {
    openDialog(record={}, isEdit=false){
      this.formData = cloneDeep(record)
      if (record.deviceList && record.deviceList.length > 0) {
        this.formData.deviceList = record.deviceList.map(item => {
          return item.deviceId
        })
      }
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
      this.$refs.wform.validate(async(valid) => {
        if (valid) {
          const list = []
          const params = {
            ...this.formData
          }
          if (this.formData.deviceList && this.formData.deviceList.length > 0) {
            this.pointList.forEach(item => {
              if (this.formData.deviceList.includes(item.deviceId)) {
                list.push(item)
              }
            })
            params.deviceList = list
          }
          
          if (this.isEdit) {
            edit(params, this.formData.id).then(res=>{
              this.$message.success(`更新成功！`)
              this.$emit("getList");
              this.closeDialog()
            })
          } else {
            add(params).then(res=>{
              this.$message.success(`新增成功！`)
              this.$emit("getList");
              this.closeDialog()
            })
          }
        }
      })
    },
    onGetDeviceList () {
      allList().then(res => {
        this.pointList = res.data.map(item => {
          return {
            ...item,
            value: item.deviceId,
            label: item.deviceName
          }
        })
      })
    }
  },
};
</script>
