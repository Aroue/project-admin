<template>
  <el-menu
    :unique-opened = true
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#2A3542"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-star-off"></i>
        <span>用户管理</span>
      </template>
      <router-link :to="'/user/user-list'">
        <el-menu-item index="1-1">用户查询</el-menu-item>
      </router-link>
      <router-link :to="'/user/add-user'">
        <el-menu-item index="1-2">添加用户</el-menu-item>
      </router-link>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-star-off"></i>
        <span>部门管理</span>
      </template>
      <router-link :to="'/dept/dept-list'">
        <el-menu-item index="2-1">部门查询</el-menu-item>
      </router-link>
      <router-link :to="'/dept/add-dept'">
        <el-menu-item index="2-2">添加部门</el-menu-item>
      </router-link>

    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-star-off"></i>
        <span>职位管理</span>
      </template>
      <router-link :to="'/job/job-list'">
        <el-menu-item index="3-1">职位查询</el-menu-item>
      </router-link>
      <router-link :to="'/job/add-job'">
        <el-menu-item index="3-2">添加职位</el-menu-item>
      </router-link>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-star-off"></i>
        <span>员工管理</span>
      </template>
      <router-link :to="'/employee/employee-list'">
        <el-menu-item index="4-1">员工查询</el-menu-item>
      </router-link>
      <router-link :to="'/employee/add-employee'">
        <el-menu-item index="4-2">添加员工</el-menu-item>
      </router-link>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-star-off"></i>
        <span>公告管理</span>
      </template>
      <router-link :to="'/notice/notice-list'">
        <el-menu-item index="5-1">公告查询</el-menu-item>
      </router-link>
      <router-link :to="'/notice/add-notice'">
        <el-menu-item index="5-2">添加公告</el-menu-item>
      </router-link>

    </el-submenu>
  </el-menu>

</template>

<script>
  export default {
    name: "SliderBarMenu",
    methods: {
    }
  }
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }
</style>
