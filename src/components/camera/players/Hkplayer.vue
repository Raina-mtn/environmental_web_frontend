<!--
 * @Date: 2022-10-20 16:17:05
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2023-03-16 15:48:24
 * @FilePath: \vehicle-web-hzmetro\src\components\camera\players\Hkplayer.vue
-->
<template>
  <iframe
    :id="cpuMonitorInfo.domId"
    style="height: 100%; width: 100%"
    class="windows"
    src="./hknginx/monitor.html"
    frameborder="0"
    @load="onload"
  >
    <slot />
  </iframe>
</template>
<script>
export default {
  props: {
    monitorInfo: {
      type: Object,
      default: () => {},
    },
    height: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      aspectRatio: 1,
    };
  },
  computed: {
    cpuMonitorInfo() {
      return this.monitorInfo;
    },
  },
  beforeDestroy() {
    // this.cpuMonitorInfo.clickStopPlay()
    // this.cpuMonitorInfo.clickLogout()
  },
  methods: {
    onload() {
      this.cpuMonitorInfo.init();
      this.cpuMonitorInfo.clickStartRealPlay();
    },
  },
};
</script>
  <style scoped>
/* @-moz-document url-prefix() { 
    object { 
      background: #333;
      border: 1px solid #ccc;
    } 
  } */
#rtspPlugin {
  position: relative;
  display: flex;
}
.iconfont,
#iframeMask {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #333;
  background: #fff;
  padding: 6px;
  border-radius: 4px;
  font-size: 2rem;
  z-index: 999;
  cursor: pointer;
}
#iframeMask {
  width: calc(2rem + 12px);
  height: calc(2rem + 12px);
  z-index: 888;
  background: transparent;
}
.text-tip {
  display: flex;
  width: 100%;
  height: 100%;
  background: #000;
  color: #fff;
  font-size: 3rem;
  align-items: center;
  justify-content: center;
}
</style>