<template>
  <div v-if="isShow" class="masking">
    <div class="detail" style="width: 50vw;">
      <div class="detail-header">
        关键参数
        <div class="close" @click="closeDialog">
          <img src="../../../../assets/images/board/header-close.png" alt="">
        </div>
      </div>
      <div class="detail-content">
        <!-- <div class="title subtitle mb-16px">
        运维信息
      </div> -->
        <div>
          <!-- <component :is="keyComponent" :params-data="keyData" /> -->
          <el-scrollbar class="h-500px">
            <WTable
              ref="mtable"
              :table-data="keyData"
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
      </div>
      <div class="w-full flex closebtn" @click="closeDialog">
        关闭
      </div>
    </div>
  </div>
</template>

<script>
import { gasDetailLast } from '@/api/interface/report'
import { WTable } from "@common-ui/w-form";
import { isOrNotNormalObj } from "@/utils/config";
import { upperCase } from 'lodash-es';
// import Keyso2 from '../keyListComponents/Keyso2.vue'
// import Keyco from '../keyListComponents/Keyco.vue'
// import Keynox from '../keyListComponents/Keynox.vue'
// import Keyo3 from '../keyListComponents/Keyo3.vue'
// import Keypm from '../keyListComponents/Keypm.vue'
export default {
  components: {
    WTable
    // Keyso2,
    // Keyco,
    // Keynox,
    // Keyo3,
    // Keypm
  },

  data() {
    return {
      record: "",
      isShow: false,
      keyData: [],
      keyComponent: '',
      columns:[
        {
          label: '关键参数列表',
          prop: 'dataName'
        },
        {
          label: '检查值',
          prop: 'dataValue'
        },
        {
          label: '检查时间',
          prop: 'dataTime'
        },
        {
          label: '正常范围',
          prop: 'normalScope'
        },
        {
          label: '检查结果',
          render(h,{row:{dataStatus}}) {
            return (<span style={{ color: dataStatus==='error' ? '#FF5C43' : '#63E7B7' }}>{ dataStatus==='error' ? '异常' : '正常'}</span>)
          },
        },
      ],
      isOrNotNormalObj
    }
  },

  methods: {
    openDialog(record) {
      this.record = record
      this.keyComponent = 'Key' + record
      if (record && record !== 'pm') {
        this.onGetData(record)
      } else {
        this.isShow = true
      }
    },
    closeDialog() {
      this.isShow = !this.isShow
      this.keyData = null
    },
    onGetData (type) {
      this.isShow = true
      gasDetailLast(type).then(({data}) => {
        this.keyData = data
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.detail {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(180deg, rgba(60,110,175,0.86) 0%, rgba(13,47,88,0.95) 100%);
  padding-bottom: 60px;
  z-index: 99;
  &-header {
    position: relative;
    width: 100%;
    height: 32px;
    font-size: 20px;
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
  }

  .closebtn {
    position: absolute;
    right: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 36px;
    background: linear-gradient(180deg, rgba(19,47,95,0.7) 0%, rgba(80,140,245,0.7) 100%);
    border-radius: 4px;
    border: 1px solid #148FF5;
    font-size: 16px;
    color: #E2EDFF;
    cursor: pointer;
  }

}

</style>