<template>
  <div class="errPage-container">
    <div class="content">
      <img src="@/assets/images/emptyPage.png" width="350" height="200">
      <!-- <h1 class="text-jumbo text-ginormous">
        Oops!
      </h1> -->
      <h2 class="text-jumbo text-ginormous">该功能还在努力开发中，敬请期待哦～</h2>
    </div>
  </div>
</template>

<script>
// import errGif from '@/assets/401_images/401.gif'

export default {
  name: 'Page401',
  data () {
    return {
      // errGif: errGif + '?' + +new Date(),
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
      dialogVisible: false
    }
  },
  methods: {
    back () {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/dashboard' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.errPage-container {
  max-width: 100%;
  padding: 16px;
  height: calc(100% + 0px);
  

  .content {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 100px 0;
    background-color: #fff;
  }
  .pan-back-btn {
    background: #148AFF;
    color: #fff;
    border: none!important;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    font-size: 14px;
    font-weight: 700;
    color: #484848;
    margin-top: 24px;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      color: #008489;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
