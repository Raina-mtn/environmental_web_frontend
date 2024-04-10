<template>
  <div class="system-setting">
    <div class="setting-list">
      <div v-for="(item, index) in setList" :key="index" class="list-item">
        <div class="list-item__header">
          <div class="header-line" />
          <div class="header-name">
            {{ item.headerName }}
          </div>
        </div>
        <div v-if="item.sublist && item.sublist.length > 0" class="flex">
          <div v-for="(its, idx) in item.sublist" :key="idx" class="list-item__name mr-24px" @click="toSetPage(its.path)">
            <div class="name-icon">
              <img :src="its.img" alt="">
            </div>
            <div class="name">
              {{ its.title }}
            </div>
          </div>
        </div>
        <div v-else class="list-item__name" @click="toSetPage(item.path)">
          <div class="name-icon">
            <img :src="item.img" alt="">
          </div>
          <div class="name">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      setList: [
        {
          title: '运维项目设置',
          img: require('../../assets/images/project.png'),
          headerName: '基础数据',
          path: '/project-setting',
          sublist: [
            {
              title: '运维内容设置',
              img: require('../../assets/images/project.png'),
              path: '/project-setting',
            },
            {
              title: '质控内容设置',
              img: require('../../assets/images/quality.png'),
              path: '/quality-setting',
            },
            // {
            //   title: '仪器设置',
            //   img: require('../../assets/images/instrument.png'),
            //   path: '/instrument-setting',
            // },
          ]
        },
        {
          title: '点位设置',
          img: require('../../assets/images/point.png'),
          // icon: require('../../assets/imgs/order-type.png'),
          headerName: '点位数据',
          path: '/point-setting'
        },
        // {
        //   title: '自动任务设置',
        //   img: require('../../assets/images/task.png'),
        //   // icon: require('../../assets/imgs/order-type.png'),
        //   headerName: '自动任务',
        //   path: '/task-setting'
        // },
        {
          title: '告警设置',
          img: require('../../assets/images/alarm.png'),
          // icon: require('../../assets/imgs/order-type.png'),
          headerName: '告警设置',
          path: '/alarm-setting'
        }
      ]
    }
  },

  created () {

  },

  methods: {
    toSetPage (path) {
      this.$router.push({ path })
    }
  }
}
</script>

<style scoped lang='scss'>
  .system-setting {
    width: 100%;
    padding: 16px;

    .setting-list {
      width: 100%;

      .list-item {
        width: 100%;
        height: 166px;
        border-radius: 2px;
        background-color: #fff;
        padding: 20px 24px;
        margin-bottom: 16px;

        &__header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          .header-line {
            width: 3px;
            height: 12px;
            background: #0089FF;
          }

          .header-name {
            font-size: 16px;
            font-weight: 600;
            color: #000000;
            margin-left: 8px;
          }
        }

        &__name {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 84px;
          cursor: pointer;

          .name-icon {
            width: 50px;
            height: 50px;
            margin-bottom: 10px;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .name {
            font-size: 14px;
            font-weight: 400;
            color: rgba(0,0,0,0.85);
          }
        }
      }
    }
  }
</style>
