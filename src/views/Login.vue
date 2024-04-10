<template>
  <div class="login-container">
    <!-- <div class="logo">
      <img :src="logoSrc" height="100%">
    </div> -->
    <div class="bg" />
    <div class="form absolute w-500px h-520px bg-white" style="top:30%;">
      <div class="font-bold text-center mt-80px mb-30px text-24px">
        环境在线监测运维管控平台
      </div>
      <div class="w-360px mx-auto">
        <el-form
          ref="loginForm"
          :model="loginForm"
          label-width="100px"
          :rules="loginRules"
          label-position="top"
        >
          <el-form-item prop="userName">
            <el-input
              v-model="loginForm.userName"
              placeholder="请输入账号"
              @keyup.enter.native="handleLogin"
            >
              <i slot="prefix" class="el-icon-user" />
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              show-password
              @keyup.enter.native="handleLogin"
            >
              <i slot="prefix" class="el-icon-lock" />
            </el-input>
          </el-form-item>
          <el-checkbox v-model="checked" class="mb-40px">
            记住密码
          </el-checkbox>
          <el-button class="w-full bg-[#148AFF] text-white" @click="handleLogin">
            登录
          </el-button>
          <div class="w-full text-center mx-auto mt-24px text-14px" style="color:rgba(0, 0, 0, 0.60);">
            <div>@2021 杭州申昊科技股份有限公司 SHENHAO</div>
            <div>浙ICP备09015103号-3</div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { apiGetStation } from "@/api/interface/user.js";
// import {asyncRoutes} from '@/router'
export default {
  data() {
    return {
      isShow:false,
      checked:true,
      // logoSrc: require("@/assets/images/login_logo.png"),
      // titleSrc: require("@/assets/images/login_title.png"),
      loginForm: {},
      loginRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 20, message: "请输入4-20位字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      stationList:[]
    };
  },
  mounted() {
    this.loginForm = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{}
  },
  methods: {
    async handleLogin() {
      this.$refs.loginForm.validate(async(valid) => {
        if (valid) {
          if(this.loginForm.userName==='admin'&&this.loginForm.password==='123456'){
            if(this.checked){
              localStorage.setItem("user", JSON.stringify({userName:'admin',password:'123456'}));
            }else{
              localStorage.removeItem("user")
            }
            // asyncRoutes.forEach(routeObj => {
            //   this.$router.addRoute('index', routeObj)
            // })
            await apiGetStation().then(res=>{
              this.stationList = res.data
            })
            await this.$store.commit("station/SET_STATION",this.stationList[0])
            await this.$store.commit("station/SET_STATIONLIST",this.stationList)

            this.$router.push('/robot-list')
          }else {
            this.$message.error('账号或密码错误！')
            this.loginForm.password = ''
          }
          // apiLogin(this.loginForm).then((res) => {
          //   this.$router.push('/board')
          // });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.login-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  background-color: #f0f4fd;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 1280px) {
    .bg {
      width: 100%;
      height: 100%;
      background: url("~@/assets/images/bg.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
    }
    .form{
      left: 60%;
    }
  }

  @media screen and (max-width: 1280px) {
    .bg {
      display: none;
    }
  }
}
</style>
