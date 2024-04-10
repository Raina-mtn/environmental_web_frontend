<template>
  <div class="masking" v-if="isShow">
    <div class="detail" style="width: 800px;">
    <!-- <div class="relative">
      <img :src="url" alt="">
    </div> -->
    <div class="detail-header">
      站房内外周边环境巡检
      <div class="close" @click="closeImg">
        <img src="../../../../assets/images/board/header-close.png" alt="">
      </div>
    </div>
    <div class="detail-content">
      <div class="container">
        <div class=" mt-16px pb-24px" style="margin: 0;padding: 0;">
          <div class="titlelist">
            <span style="width: 200px;">环境类别</span>
            <span style="width: 540px;">巡查内容</span>
          </div>
          <div class="content">
            <div v-for="(item, index) in tableData" :key="item.omProjectId + String(index)">
              <!-- <div class="left">
                <el-checkbox v-model="checkAll" @change="handleCheckAllChange" style="color: #fff;" :label="item.omProject"></el-checkbox>
              </div>
              <div class="right" style="display: inline-block;">
                <ul>
                  <li v-for="ite in item.omContents" :key="ite.omContentId">
                    <el-checkbox :v-model="checkes" style="color: #fff;" :label="ite.omContent"></el-checkbox>
                  </li>
                </ul>
              </div> -->
              <check-box :chooseList="item.omContents" :projectName="item.omProject" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex submit" @click="submit">
      保存
    </div>
    <div class="w-full flex closebtn" @click="closeImg">
      关闭
    </div>
  </div>
  </div>
  
</template>

<script>
import CheckBox from './CheckBox.vue'
export default {
  components: {
    CheckBox
  },
  data() {
    return {
      checkAll:false,
      record: "",
      isShow: false,
      tableData: [
        {
          omContents: [
            {
              omContentId: 1,
              omContent: '点位周围环境变化情况'
            },
            {
              omContentId: 2,
              omContent: '点位周围安全隐患'
            },
            {
              omContentId: 3,
              omContent: '点位周围道路、供电线路、通讯线路、排水设施完好或损坏状况'
            },
            {
              omContentId: 4,
              omContent: '站房外围的防护栏、隔离带有无损坏情况'
            },
            {
              omContentId: 5,
              omContent: '周围树木是否需要修剪'
            },
            {
              omContentId: 6,
              omContent: '站房防雷接地是否完好'
            },
            {
              omContentId: 7,
              omContent: '站房屋顶是否完好、有无漏雨'
            },
          ],
          omProjectId: 'a',
          omProject: '站房外部及周边'
        },
        {
          omContents: [
            {
              omContentId: 8,
              omContent: '站房环境卫生是否合格'
            },
            {
              omContentId: 9,
              omContent: '站房内部的供电、通讯是否畅通'
            },
            {
              omContentId: 10,
              omContent: '数采仪工作是否正常、工控机显示数据与仪器数据是否一致'
            },
            {
              omContentId: 11,
              omContent: '视频系统工作是否正常'
            },
            {
              omContentId: 12,
              omContent: '室内温度、湿度是否符合要求（空调系统）'
            },
            {
              omContentId: 13,
              omContent: '排风扇是否正常运行'
            },
            {
              omContentId: 14,
              omContent: '稳压电源、UPS参数是否正常'
            },
            {
              omContentId: 15,
              omContent: '各电源插头、线板工作是否正常'
            },
            {
              omContentId: 16,
              omContent: '仪器气泵工作是否正常'
            },
            {
              omContentId: 17,
              omContent: '检查钢瓶及减压阀安全情况'
            }
          ],
          omProjectId: 'b',
          omProject: '站房内部'
        }
      ],
      checkes: []
    }
  },

  methods: {
    openImg() {
      this.isShow = true
      // this.tableData = tableData
      // console.log('打印数据:', tableData)
    },
    closeImg() {
      this.isShow = !this.isShow
      // this.tableData = []
    },
    submit(){
      this.isShow = !this.isShow
      // this.tableData = []
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
  background:#10325B;
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
    font-weight: 600;
    cursor: pointer;
  }
  .submit{
    position: absolute;
    right: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 36px;
    background: linear-gradient(180deg, rgba(19,47,95,0.7) 0%, rgba(80,140,245,0.7) 100%);
    background-color: #0B8EFA ;
    border-radius: 4px;
    border: 1px solid #148FF5;
    font-size: 16px;
    color: #E2EDFF;
    font-weight: 600;
    cursor: pointer;
  }

  ::v-deep .el-descriptions__body {
    background: none;
    color: #FFFFFF;
  }
}

.container{
  position: relative;
  font-size: 14px;
  color: #FFFFFF;
  border: 1px solid #295599;

  .titlelist{
    height: 40px;
    line-height: 40px;
    background: rgba(80,140,245,0.4);

    span{
      display: inline-block;
      padding-left: 20px;
    }
  }

  .content{
    width: 100%;
    height: 400px;
    // padding-top: 10px;
    overflow-y: auto;
  }
  .left{
    width: 200px;
    display: inline-block;
    margin-left: 10px;


    //  .el-checkbox__label {
    //     display: inline-grid;
    //     width:200px;
    //     white-space: pre-line;
    //     word-wrap: break-word;
    //   }

  }
  .right{
    padding-left: 10px;
    border-left: 1px solid #295599;
  }

  li{
    height: 40px;
    line-height: 40px;
  }

  .all{
    border-bottom: 1px solid #295599;
    white-space: nowrap;
  }

}
</style>