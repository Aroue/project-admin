<template>
  <div style="width: 100%;">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/user/user-list' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加用户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" :rules="rules" ref="form" :model="form" label-width="80px" style="padding-top: 15px">
      <el-col :span="20">
        <el-form-item label="姓名:" prop="userName">
          <el-input clearable style="width: 125px;" size="mini" v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-select clearable v-model="form.status" size="mini"
                     style="width: 178px;">
            <el-option label="管理员" value="1"></el-option>
            <el-option label="普通用户" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-form-item label="登录名:" prop="loginName">
          <el-input clearable style="width: 125px;" size="mini" v-model="form.loginName"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input clearable style="width: 178px;" size="mini" v-model="form.password"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')" size="mini">添加</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
  import { userApi } from "@/view/user/api";

  export default {
    name: "addUser",
    data() {
      return {
        form: {
          userName: '',
          loginName: '',
          password: '',
          status: '',
        },

        rules: {
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
          ],
          userName: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          loginName: [
            { required: true, message: '请输入登录名', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '请选择状态', trigger: 'blur' }
          ]
        }

      }
    },

    methods: {
      addUser() {
        const params = {
          ...this.form
        }
        userApi.addUser(params).then(res => {
          this.$message.success("添加成功");
          this.$router.push({path: '/user/user-list'})
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addUser();
          } else {
            this.$message.error('输入有误，请重新输入！');
            return false;
          }
        });
      },

    }

  }
</script>

<style scoped>

</style>
