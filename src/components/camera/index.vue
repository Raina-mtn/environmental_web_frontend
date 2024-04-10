<!--
 * @Date: 2022-10-20 14:43:50
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2022-10-24 10:26:00
 * @FilePath: \explosive-robot\src\components\camera\index.vue
-->

<template>
  <div style="height: 100%;width: 100%">
    <Hkplayer
      v-if="cpuMonitorInfo.producer === 'HK'"
      :monitor-info="cpuMonitorInfo"
    >
      <slot name="HK" />
    </Hkplayer>
    <VlcPlayer
      v-else-if="cpuMonitorInfo.producer === 'FZ'"
      :monitor-info="cpuMonitorInfo"
    >
      <slot name="Vlc" />
    </VlcPlayer>
  </div>
</template>
<script>

import Hkplayer from './players/Hkplayer.vue'
import VlcPlayer from './players/VlcPlayer.vue'
export default {
  components: {
    VlcPlayer,
    Hkplayer
  },
  props: {
    monitorInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isPlay: true,
      aspectRatio: "",
    };
  },
  computed:{
    cpuMonitorInfo(){
      return this.monitorInfo;
    }
  },
  methods: {},
};
</script>