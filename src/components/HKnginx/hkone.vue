<template>
  <div style="height: 100%; width: 100%">
    <iframe
      id="monitorWindow"
      style="height: 100%; width: 100%"
      class="windows"
      src="./hknginx/monitor.html"
      frameborder="0"
      @load="onload"
    />
  </div>
</template>
<script>
export default {
  props:{
    camera:{
      type: Object,
      default: null
    }
  },
  data(){
    return {
      timer: null
    }
  },
  methods:{
    onload(){
      this.$nextTick(()=>{
        const mapFrame = document.getElementById('monitorWindow')
        this.iframeWindow = mapFrame.contentWindow
        if(this.iframeWindow){
          setTimeout(()=>{
            this.iframeWindow.postMessage(
              {
                connectType: 'login',
                params:{
                  camera: this.camera
                }
              },
              "*"
            );
            this.reciveMessage()
          },500)
        }
      })
    },
    // 接收消息处理
    reciveMessage(){
      window.addEventListener('message', (messageEvent)=>{
        const { connectType } = messageEvent.data;
        // clearInterval(this.timer)
        if (connectType == 'refresh') { 
          clearInterval(this.timer)
          // 全部完成后，定时刷新 查看camera状态 监控页面检查完状态后会发送消息告诉父页面刷新
          this.timer = setInterval(()=>{
            this.iframeWindow.postMessage(
              {
                connectType: 'refresh',
                params:{
                  camera: this.camera
                }
              },
              "*"
            );
          }, 5000)
        }
      })
    }
  }
}
</script>