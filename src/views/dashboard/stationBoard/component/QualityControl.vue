<template>
  <div v-if="isShow" class="masking">
    <div class="detail" style="width: 800px;">
      <div class="detail-header">
        远程质控
        <div class="close" @click="closePopup">
          <img src="../../../../assets/images/board/header-close.png" alt="">
        </div>
      </div>
      <div class="detail-content">
        <el-scrollbar class="h-500px">
          <WTable
            ref="mtable"
            :table-data="tableData"
            class="mtable"
            :stripe="true"
            :border="true"
            :columns="columns"
            :size="'mini'"
            :show-page="false"
            style="height: calc(100% - 20px);s"
            height="100%"
          />
        </el-scrollbar>
      </div>
      <div class="btns">
        <div class="w-full flex closebtn ml-12px" @click="closePopup">
          关闭
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { WTable } from "@common-ui/w-form";
import { apiGetQcContents,apiRemoteQc } from '@/api/interface/dashboard.js'
export default {
  components:{
    WTable
  },
  data() {
    return {
      type: "",
      typeName: '',
      isShow: false,
      tableData:[]
    }
  },
  computed:{
    columns(){
      return [
        {
          label:"质控类型",
          prop:'qcTypeName'
        },
        {
          label:"质控仪器",
          prop:'instrumentName',
        },
        {
          label:"质控名称",
          prop:'qcName',
        },
        {
          label:"质控内容",
          prop:'qcContent',
        },
        {
          label: "操作",
          render: (h, { row }) => {
            console.log('row :>> ', row);
            return <el-link  type="primary" underline={false} onClick={() => {this.remoteQuality(row.id)}}>远程质控</el-link>
          },
        },
      ]
    }
  },
  methods: {
    openPopup(type) {
      this.isShow = true
      this.type = type
      apiGetQcContents(type).then(res=>{
        this.tableData = res.data
      })
      
    },
    closePopup() {
      this.isShow = false
      this.tableData = []
    },
    async remoteQuality(id){
      try {
        await apiRemoteQc(id)
        this.$message.success('远程质控成功!')
      } catch (error) {
        console.log('error :>> ', error);
      }
    }
  }

}
</script>

<style lang="scss" scoped>

.masking {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .6);
}
.detail {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #10325B;
  padding-bottom: 60px;
  &-header {
    position: relative;
    width: 100%;
    height: 32px;
    font-size: 22px;
    letter-spacing: 1px;
    color: #FFFFFF;
    background: url('../../../../assets/images/board/header_bg.png') no-repeat;
    background-size: 460px 32px;
    padding-left: 48px;

    .close {
      position: absolute;
      top: 7px;
      right: 24px;
      width: 18px;
      height: 18px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  &-content {
    padding: 24px;

    .subtitle {
      font-size: 16px;
      font-weight: 500;
      color: #E2EDFF;
    }

    .charts {
      height: 300px;
    }
  }

  .closebtn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 84px;
    height: 36px;
    background: linear-gradient(180deg, rgba(19,47,95,0.7) 0%, rgba(80,140,245,0.7) 100%);
    border-radius: 4px;
    border: 1px solid #148FF5;
    font-size: 16px;
    color: #E2EDFF;
    font-weight: 600;
    cursor: pointer;
  }

  .btns {
    position: absolute;
    right: 24px;
    display: flex;
  }

  ::v-deep .el-descriptions__body {
    background: none;
    color: #FFFFFF;
  }
}
</style>