<template>
  <div class="project-setting">
    <div class="project-setting__contain">
      <div class="contain-left">
        <setting-nav title="质控内容配置" :nav-list="[{id: 1, name: '质控内容列表'}]" />
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
              质控列表
            </div>
            <div class="relative">
              <el-button type="primary" size="mini" icon="el-icon-plus" @click="$refs.addQuality.openDialog()">
                新增
              </el-button>
              <el-button type="primary" size="mini" icon="el-icon-delete" @click="handleDelete($refs.mtable.$children[0].selection.map(i=>i.id),'ids')">
                删除
              </el-button>
            </div>
          </div>
          <WTable
            ref="mtable"
            class="h-4/5"
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
        </div>
      </div>
    </div>

    <AddQuality ref="addQuality" @getList="refresh" />
  </div>
</template>

<script>
import SettingNav from '../../components/SettingNav.vue'
import AddQuality from '../../components/AddQuality.vue'
import { list, deleted } from '@/api/interface/system-quality'
import { listMixin } from "@/mixin/list";
import { WForm, WTable } from "@common-ui/w-form";
import { formColumns, tableColumns } from "./config.js";
export default {
  components: {
    WForm,
    WTable,
    SettingNav,
    AddQuality
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
      deleteAPi:deleted
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
    }
  },
  mounted() {
    this.getList()
  },
  methods:{
    getList(){
      this.formData.pageNum = this.formData.pageIndex?this.formData.pageIndex:1
      list({ ...this.formData, stationId:this.stationId }).then(res=>{
        this.tableData = res.data
        this.total = res.totalCount
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
    }
  }
}
</script>

<style scoped lang='scss'>
  .project-setting {
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
      }
    }
  }
</style>
