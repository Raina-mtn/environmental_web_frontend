import Vue from "vue";
import App from "./App.vue";
import ELEMENT from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import store from "./store";
import './style/common.scss'
import '@/px2rem'
import 'windi.css'
import '@/assets/font/iconfont.css'

Vue.use(ELEMENT);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus=this//安装全局事件总线
  },
  render: h => h(App),
}).$mount("#app");
