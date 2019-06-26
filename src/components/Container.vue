<!--suppress ALL -->
<template>
  <el-container>
    <el-header>
      <div class="navbar-header" style="width:20%;text-align: left;float: left">
        <div class="brand-text" style="padding-top: 6px;">
          <img alt="" src="../assets/LOGO.jpg" style="float: left">
          <div style="float: left;font-size: 18px;padding-top: 10px">
            <span style="font-family:'Britannic Bold', 'Britannic';color:#3BC5BB;">CSI员工</span>
            <span
              style="font-family:'Segoe UI Emoji Bold', 'Segoe UI Emoji Normal', 'Segoe UI Emoji';color:#1D4474;"> </span>
            <span
              style="font-family:'Segoe UI Emoji Bold', 'Segoe UI Emoji Normal', 'Segoe UI Emoji';color:#FF9A4C;">之家</span>
          </div>
        </div>
      </div>
      <div v-if="this.userName !== null && this.userName !==''" style="color: #ffffff;float:left;padding-top: 19px;padding-left: 850px">
       欢迎登陆: {{this.userName}}
      </div>
      <div v-if="this.userName !== null && this.userName !==''" style="color: #ffffff;float:left;padding-top: 19px;padding-left: 60px">
        <router-link :to="'/login'">
          退出登陆
        </router-link>
      </div>
    </el-header>
    <el-container>
      <el-aside width="150px">
        <SliderBarMenu></SliderBarMenu>
      </el-aside>
      <el-main>
        <router-view>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import SliderBarMenu from '../components/SliderBarMenu';
  import db from "@/store/user/db"

  export default {
    name: "Container",
    components: {
      SliderBarMenu
    },
    data() {
      return {
        userName: db.get('user').userName,
      }
    },
    mounted() {
    },

    methods: {}
  }
</script>

<style scoped>
  .el-header {
    background-color: #2A3542;
    color: #333;
    /*text-align: center;*/
    height: 50px;

  }

  .el-aside {
    background-color: #2A3542;
    color: #333;
    /*text-align: center;*/
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /*text-align: center;*/
    height: 100%;
  }

  .el-container {
    margin: 0;
    height: 100%;
  }

  a {
    text-decoration: none;
    color: #ffffff;
  }
</style>
