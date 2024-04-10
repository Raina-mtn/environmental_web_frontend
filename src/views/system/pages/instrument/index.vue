<template>
  <div class="instrument-setting">
    <div class="instrument-setting__contain">
      <div class="contain-left">
        <setting-nav :title="'仪器设置'" :nav-list="settingList" />
      </div>
      <div class="contain-right">
        <div v-for="(its) in lists" :key="its.dataType" class="instrument-item mb-16px">
          <div class="item-header flex justify-between">
            <div class="title">
              <div class="title_name">
                {{ its.name }}
              </div>
            </div>
            <div class="btn">
              <el-button type="primary" size="mini" :icon="its.isEdit ? 'el-icon-folder-checked' : 'el-icon-edit-outline'" @click="handleEdit(its)">
                {{ its.isEdit ? '保存' : '编辑' }}
              </el-button>
            </div>
          </div>
          <div class="item-form">
            <template v-if="!its.isEdit">
              <template v-if="its.dataType !== '5'">
                <el-descriptions class="mt-16px" :column="2" border>
                  <el-descriptions-item label="仪器名称">
                    {{ its.formInline.dataName }}
                  </el-descriptions-item>
                  <el-descriptions-item label="仪器编号">
                    {{ its.formInline.dataCode }}
                  </el-descriptions-item>
                  <el-descriptions-item label="标气来源">
                    {{ its.formInline.gasSource }}
                  </el-descriptions-item>
                  <el-descriptions-item label="标气编号">
                    {{ its.formInline.gasCode }}
                  </el-descriptions-item>
                </el-descriptions>
              </template>
              <template v-else>
                <el-descriptions class="mt-16px" :column="2" border>
                  <el-descriptions-item label="PM10序列号">
                    {{ its.formInline.pm10Serial }}
                  </el-descriptions-item>
                  <el-descriptions-item label="PM2.5序列号">
                    {{ its.formInline.pm25Serial }}
                  </el-descriptions-item>
                </el-descriptions>
              </template>
            </template>
            <template v-else>
              <el-form :ref="'form' + its.dataType" :inline="true" :model="its.formInline" size="mini" label-width="130px" class="w-full mt-16px">
                <template v-if="its.dataType !== '5'">
                  <el-form-item
                    label="仪器名称"
                    style="width: 45%"
                    prop="dataName"
                    :rules="[
                      { required: true, message: '请输入仪器名称', trigger: 'blur' },
                      { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ]"
                  >
                    <el-input v-model="its.formInline.dataName" placeholder="请输入" />
                  </el-form-item>
                  <el-form-item
                    label="仪器编号"
                    style="width: 45%"
                    prop="dataCode"
                    :rules="[
                      { required: true, message: '请输入仪器编号', trigger: 'blur' },
                      { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ]"
                  >
                    <el-input v-model="its.formInline.dataCode" placeholder="请输入" />
                  </el-form-item>
                  <el-form-item
                    label="标气来源"
                    style="width: 45%"
                    prop="gasSource"
                    :rules="[
                      { required: true, message: '请输入标气来源', trigger: 'blur' },
                      { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ]"
                  >
                    <el-input v-model="its.formInline.gasSource" placeholder="请输入" />
                  </el-form-item>
                  <el-form-item
                    label="标气编号"
                    style="width: 45%"
                    prop="gasCode"
                    :rules="[
                      { required: true, message: '请输入标气编号', trigger: 'blur' },
                      { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ]"
                  >
                    <el-input v-model="its.formInline.gasCode" placeholder="请输入" />
                  </el-form-item>
                </template>
                <template v-else>
                  <el-form-item
                    label="PM10序列号"
                    style="width: 45%"
                    prop="pm10Serial"
                    :rules="[
                      { required: true, message: '请输入PM10序列号', trigger: 'blur' },
                      { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ]"
                  >
                    <el-input v-model="its.formInline.pm10Serial" placeholder="请输入" />
                  </el-form-item>
                  <el-form-item
                    label="PM2.5序列号"
                    style="width: 45%"
                    prop="pm25Serial"
                    :rules="[
                      { required: true, message: '请输入PM2.5序列号', trigger: 'blur' },
                      { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ]"
                  >
                    <el-input v-model="its.formInline.pm25Serial" placeholder="请输入" />
                  </el-form-item>
                </template>
              </el-form>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SettingNav from '../../components/SettingNav.vue'
import { getInstrumentByType, updateInstrument } from '@/api/interface/report'
import { listMixin } from "@/mixin/list"
export default {
  components: {
    SettingNav,
  },

  mixins: [listMixin],
  data() {
    return {
      // 设置列表
      settingList: [{
        name: '仪器参数配置'
      }],
      formInline: {
        user: '',
        region: ''
      },
      lists: [
        {
          name: 'SO2',
          isEdit: false,
          dataType: '1',
          formInline: {
            dataCode: '',
            dataName: '',
            gasSource: '',
            gasCode: '',
          },
        },
        {
          name: 'NOx',
          isEdit: false,
          dataType: '2',
          formInline: {
            dataCode: '',
            dataName: '',
            gasSource: '',
            gasCode: '',
          },
        },
        {
          name: 'Co',
          isEdit: false,
          dataType: '3',
          formInline: {
            dataCode: '',
            dataName: '',
            gasSource: '',
            gasCode: '',
          },
        },
        {
          name: 'O3',
          isEdit: false,
          dataType: '4',
          formInline: {
            dataCode: '',
            dataName: '',
            gasSource: '',
            gasCode: '',
          },
        },
        {
          name: '颗粒物',
          isEdit: false,
          dataType: '5',
          formInline: {
            pm10Serial: '',
            pm25Serial: ''
          },
        }
      ],
      isEdit: false
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
      this.getContent()
    }
  },
  created() {
    this.getContent()
  },
  methods:{
    // 获取仪器内容
    getContent () {
      this.lists.forEach(async item => {
        await getInstrumentByType(item.dataType).then(res=>{
          item.formInline = {
            ...res.data
          }
        })
      })
    },
    // 处理编辑
    handleEdit (props) {
      if (props.isEdit) {
        // console.log('打印数据:', this.$refs['form' + props.dataType])
        this.$refs['form' + props.dataType][0].validate((valid) => {
          if (valid) {
            updateInstrument(props.dataType, props.formInline).then(res => {
              if (res.status.code === 1) {
                this.$message.success('保存成功')
                props.isEdit = false
              }
            })
          } else {
            return false;
          }
        })
      }
      if (!props.isEdit) {
        props.isEdit = true
      }
    }
  }
}
</script>

<style scoped lang='scss'>
  .instrument-setting {
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
        padding: 24px;
        overflow: auto;
        ::v-deep .iconfont {
          font-size: 12px;
        }
      }
    }
    .title {
      display: flex;
      align-items: center;
      &_name {
        font-size: 16px;
        font-weight: 600;
        color: #000000;
      }
    }
    ::v-deep .el-form-item__content {
      width: calc(100% - 130px);
    }
    ::v-deep .el-descriptions-item__label  {
      text-align: right;
      width: 140px;
    }

    ::v-deep .el-descriptions-item__content {
      width: 320px !important;
    }
  }
</style>
