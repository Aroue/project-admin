<template>
  <div style="width: 100%">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/user/user-list' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" ref="form" :model="form" label-width="80px" style="padding-top: 15px">
      <el-form-item label="用户名:">
        <el-input clearable @clear="getUserList" style="width: 125px;" size="mini" v-model="form.loginName"></el-input>
      </el-form-item>
      <el-form-item label="用户状态:">
        <el-select clearable @change="getUserList" v-model="form.status" placeholder="全部" size="mini"
                   style="width: 98px;">
          <el-option label="全部" value=""></el-option>
          <el-option label="管理员" value="1"></el-option>
          <el-option label="普通用户" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getUserList" size="mini">搜索</el-button>
        <el-button :disabled="disable" type="danger" @click="open" size="mini">删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      size="mini"
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        header-align="center"
        align="center"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="loginName"
        label="登陆名"
        width="200">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="password"
        label="密码">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="userName"
        label="用户名"
        width="200">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="status"
        label="状态"
        width="100">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="创建日期"
        width="250">
        <template slot-scope="scope">{{ scope.row.createdAt }}</template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <router-link :to="'/user/edit-user/' + scope.row.id">
            <el-button
              type="text"
              size="small">
              <i class="el-icon-edit"></i>
              修改
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>

  </div>


</template>

<script>
  import {userApi} from './api';

  export default {
    name: "index",
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        disable: true,
        page: 1,
        pageSize: 10,
        totalCount: 0,

        form: {
          loginName: '',
          status: '',
        }
      }
    },

    mounted() {
      this.getUserList()
    },

    methods: {

      open() {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.deleteUser();
        }).catch(() => {
          this.$message.info("已取消删除");
        });
      },
      getUserList() {
        const params = {
          ...this.form,
          page: this.page,
          pageSize: this.pageSize,
        }
        userApi.getUserList(params).then(res => {
          this.tableData = res.data;
          this.page = res.page;
          this.pageSize = res.pageSize;
          this.totalCount = res.totalCount
        })
      },

      deleteUser() {
        const params = {
          ids: this.multipleSelection
        }
        userApi.deleteUser(params).then(res => {
          this.getUserList()
          this.$message.success("删除成功");
        }).catch((err) => {
          this.$message.error(err.message);
        })
      },

      handleSelectionChange(val) {
        if (val.length !== 0) {
          for (let i = 0; i < val.length; i++) {
            if (this.multipleSelection.indexOf(val[i].id) === -1) {
              this.multipleSelection.push(val[i].id);
            }
          }
          this.disable = this.multipleSelection.length === 0;
        }
      },


      handleSizeChange(val) {
        this.pageSize = val;
        this.getUserList()
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getUserList()
      }


    }
  }
</script>

<style scoped>
  i {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }
</style>
