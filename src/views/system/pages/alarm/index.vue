<template>
  <div class="task-setting">
    <div class="task-setting__contain">
      <div class="contain-left">
        <setting-nav :title="'告警设置'" :nav-list="settingList" @onSendRequest="onSendRequest" />
      </div>
      <div class="contain-right">
        <div class="px-20px bg-white" style="height: calc(100% - 80px);">
          <el-tabs v-model="active">
            <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.dataName" :name="item.dataCode"></el-tab-pane>
          </el-tabs>
          <WTable
            ref="mtable"
            class="h-80vh"
            :table-data="tableData"
            reserve-selection
            :row-key="row => row.id"
            :stripe="false"
            :border="false"
            :columns="columns"
            :show-page="false"
            :size="'mini'"
            :total="total"
            height="100%"
          />
        </div>
      </div>
    </div>

    <EditAlarm ref="editAlarm" @onSuccess="onGetRulesData" />
  </div>
</template>

<script>
import SettingNav from '../../components/SettingNav.vue'
import EditAlarm from '../../components/EditAlarm.vue'
import { getAllClass, getClassEntity, getEntityRule } from '@/api/interface/system-alarm'
import { listMixin } from "@/mixin/list"
import { WForm, WTable } from "@common-ui/w-form"
import { tableColumns } from "./config.js"
export default {
  components: {
    WForm,
    WTable,
    SettingNav,
    EditAlarm
  },

  mixins: [listMixin],
  data() {
    return {
      active: 'first',
      columns:tableColumns(this),
      tableData:[],
      tabList: [],
      total:0,
      // 设置列表
      settingList: [],
      // 当前点击的设置栏
      clickData: null,
      chooseList: [],
    }
  },
  computed:{
    stationId(){
      return this.$store.state.station.station.id
    }
  },
  watch:{
    stationId(){
      this.onGetClass()
    },
    active (val) {
      this.onGetRulesData()
    },
    clickData: {
      deep: true,
      async handler () {
        this.onGetTabData()
      }
    }
  },
  mounted() {
    this.onGetClass()
  },
  methods:{
    // 获取左侧设置列表
    onGetClass () {
      getAllClass().then(res => {
        this.settingList = res.data.map(item => {
          return {
            ...item,
            name: item.className
          }
        })
        this.clickData = res.data[0]
      })
    },

    // 获取tab列表
    onGetTabData () {
      getClassEntity({ classCode: this.clickData.classCode }).then(res => {
        this.active = res.data[0].dataCode
        this.tabList = res.data
      })
    },

    // 获取规则数据
    onGetRulesData () {
      getEntityRule({ dataCode: this.active }).then(res => {
        this.tableData = [{ ...res.data, attribute: '指标正常范围' }]
      })
    },

    onSendRequest (props) {
      this.clickData = {...props}
    },

    handleEdit (props) {
      this.$refs.editAlarm.openDialog(props)
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
