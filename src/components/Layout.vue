<template>
  <div :class="['layout' , opened ? '': 'side-bar-close']">
    <WLayout
      v-bind="layoutAttrs"
      :has-hambuger="true"
      :has-breadcrumb="false"
      :has-avatar="false"
      :user="user"
    >
      <template #navLeft>
        <el-dropdown trigger="click">
          <el-link class="text-[#148AFF] text-14px" type="primary" :underline="false">
            {{ station }}<i class="el-icon-sort" style="transform: rotate(90deg);" />
          </el-link>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in stationList" :key="item.id">
              <span @click="handleStation(item)">{{ item.stationName }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
      <template #navRight>
        <!-- <el-link class="text-[#148AFF] text-14px mr-16px" type="primary" :underline="false" @click="gotoPage('/compositeboard')">
          <span class="iconfont icon-jiashicang" />
          综合驾驶舱
        </el-link> -->
        <div class="mr-16px text-20px">
          <el-popover
            placement="bottom"
            trigger="hover">
            <div class="flex">
              <div class="manage-item flex flex-col items-center cursor-pointer" @click="gotoPage('/stationList')">
                <img src="../assets/images/station.png" class="w-40px h-40px" alt="">
                <span class="mt-6px">站点管理</span>
              </div>
              <div class="manage-item flex flex-col items-center ml-12px mr-12px cursor-pointer" @click="gotoPage('/user')">
                <img src="../assets/images/user.png" class="w-40px h-40px" alt="">
                <span class="mt-6px">用户管理</span>
              </div>
              <div class="manage-item flex flex-col items-center cursor-pointer" @click="gotoPage('/system-setting')">
                <img src="../assets/images/system.png" class="w-40px h-40px" alt="">
                <span class="mt-6px">系统管理</span>
              </div>
            </div>
            <div slot="reference">
              <i  class="el-icon-setting" />
            </div>
          </el-popover>
        </div>
        <el-link class="text-[#148AFF] text-14px mr-16px" type="primary" :underline="false" @click="gotoPage('/dashboard')">
          <span class="iconfont icon-jiashicang" />
          站点驾驶舱
        </el-link>
        <div class="avatar-wrapper" :style="{color: layoutAttrs.navTextColor}">
          <el-avatar :src="avatar" size="small" class="mr-2" />
          <span class="mr-4 text-14px">{{ user.userName || 'default' }}</span>
          <i class="el-icon-switch-button text-18px mr-6 cursor-pointer" @click="$router.push('/login')" />
        </div>
      </template>
    </WLayout>
  </div>
</template>

<script>
import WLayout from "@common-ui/w-layout";
import { debounce  } from "lodash-es";
import {asyncRoutes} from '@/router'
export default {
  name: "IndexVue",
  components: {
    WLayout,
  },
  data() {
    return {
      opened: false,
      gridData: [],
      avatar:'',
      layoutAttrs: {
        mode: 'horizontal',
        menu: asyncRoutes,
        navHeight: "50px",
        navTextColor:'rgba(0, 0, 0, 0.65)',
        navBgColor: '#fff',
        menuBg: "#001529",
        menuTextColor: "#fff",
        menuActiveTextColor: "#fff",
      },
      user: {
        userName:'admin'
      },
      timer: null,
      curStation: {}
    };
  },
  computed:{
    station(){
      return this.$store.state.station.station.stationName
    },
    stationList(){
      return this.$store.state.station.stationList
    }
  },
  methods: {
    handleStation(station){
      this.$store.commit("station/SET_STATION",station)
    },
    toggleSideBar() {
      if(!this.opened){
        this.naviAfterCilck()
      }

      this.opened = !this.opened;
    },
    logout() {
      this.$confirm("确认退出登录", "提示", {
        type: "warning",
      }).then(async () => {
        await this.$store.dispatch("user/logout");
        this.$store.commit('permission/RESET_ROUTE')
        this.$router.push(`/login`);
      });
    },
    naviAfterCilck: debounce(async function () {
      this.opened = false;
    }, 30000),
    gotoPage(path){
      this.$router.push({path, query: {stationId: this.$store.state.station.station.id}})
    }
  },
};
</script>

<style scoped lang="scss">
::v-deep{
  .sidebar-container{
    background-color: #001529 !important;
  }
}
</style>

<style lang="scss">
  #app .sidebar-container {
    background-color: rgb(0, 21, 41);
  }
</style>
