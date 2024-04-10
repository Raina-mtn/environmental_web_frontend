<!--
 * @Date: 2022-10-20 16:17:05
 * @LastEditors: zhusisheng zhusisheng@shenghaoinfo.com
 * @LastEditTime: 2022-10-27 19:06:50
 * @FilePath: \indicator-gather\src\components\camera\players\VlcPlayer.vue
-->
<template>
  <div
    id="rtspPlugin"
    ref="rtspPlugin"
    style="width: 100%; height: 100%; z-index: 9"
  >
    <object
      :id="cpuMonitorInfo.domId"
      :ref="cpuMonitorInfo.domId"
      type="application/x-vlc-plugin"
      pluginspage="http://www.videolan.org/"
      events="true"
      width="100%"
    >
      <param
        name="volume"
        value="0"
      >
      <param
        name="autoplay"
        value="false"
      >
      <param
        name="loop"
        value="false"
      >
      <param
        name="fullscreen"
        value="true"
      >
      <param
        name="controls"
        value="false"
      >
      <param
        name="wmode"
        value="transparent"
      >
    </object>
  </div>
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
  mounted() {
    this.$nextTick(() => {
      this.setSize();
      let vlcContainer = this.$refs["rtspPlugin"];
      this.resizeObserver(vlcContainer);

      const vlc = this.$refs[this.cpuMonitorInfo.domId];
      this.cpuMonitorInfo.init(vlc);
      this.cpuMonitorInfo.clickStartRealPlay();
    });
  },

  methods: {
    setSize() {
      const vlc = this.$refs[this.cpuMonitorInfo.domId];
      if (vlc && vlc.playlist) {
        const { clientWidth, clientHeight } = vlc;
        vlc.video.aspectRatio = `${clientWidth}:${clientHeight}`;
        this.aspectRatio = `${clientWidth}:${clientHeight}`;
      }
    },

    // 监听
    resizeObserver(element) {
      let resizeObserver = new ResizeObserver((items) => {
        this.setSize();
      });

      resizeObserver.observe(element);
      this.$once("hook:beforeDestroy", () => {
        resizeObserver.unobserve(element);
        resizeObserver = null;
      });
    },
  },
};
</script>
<style scoped>
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