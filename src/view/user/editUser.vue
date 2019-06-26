<template>
  <div style="width: 100%;">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/user/user-list' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改用户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" :rules="rules" ref="form" :model="form" label-width="80px">
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
      </el-col>
      <el-col :span="20">
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')" size="mini">修改</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
  import { userApi} from "@/view/user/api";

  export default {
    name: "editUser",
    data() {
      return {
        form: {
          userName: '',
          loginName: '',
          status: '',
        },

        rules: {
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

    mounted() {
      this.getUser()
    },

    methods: {
      getUser() {
        const params = {
          id: this.$route.params.id
        }
        userApi.getUser(params).then(res => {
          this.form.status = res.data.status.toString();
          this.form.loginName = res.data.loginName;
          this.form.userName = res.data.userName;
        }).catch((err) => {
          this.$message.error(err.message);
        })
      },


      editUser() {
        const params = {
          ...this.form,
          id: this.$route.params.id
        }
        userApi.editUser(params).then(res => {
          this.$message.success("修改成功");
          this.$router.push({path: '/user/user-list'})
        }).catch((err) => {
          this.$message.error(err.message);
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.editUser();
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
