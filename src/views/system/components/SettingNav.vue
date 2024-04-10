<template>
  <div class="setting-nav">
    <div class="setting-nav__header">
      <div class="header-line" />
      <div class="header-name">
        {{ title }}
      </div>
    </div>
    <div class="setting-nav__list">
      <div v-for="(item, index) in navList" :key="item.id" class="list-item" :class="activeIndex === index ? 'active' : ''" @click="onSendRequest(item, index)">
        <i class="iconfont icon-xitongguanli" />
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '运维内容设置'
    },

    navList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },

  data () {
    return {
      activeIndex: 0
    }
  },

  created () {

  },

  methods: {
    onSendRequest (props, index) {
      this.activeIndex = index
      this.$emit('onSendRequest', props)
    }
  }
}
</script>

<style scoped lang='scss'>
  .setting-nav {
    width: 200px;
    height: 100%;
    overflow-x: auto;

    &__header {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #E8E8E8;
      padding: 16px 20px 10px;
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

    &__list {
      padding: 8px 0 16px;

      .list-item {
        display: flex;
        align-items: center;
        padding: 8px 20px;
        font-size: 14px;
        color: rgba(0,0,0,0.85);
        cursor: pointer;

        span {
          margin-left: 6px;
        }
      }

      // .list-item:hover {
      //   background-color: #E8E8E8;
      // }

      .active {
        background-color: rgba(20,138,255,0.1);
      }
    }
  }
</style>
