<template>
  <div class="zr-login">
    <el-card class="login-container" title="健康养生论坛" :hoverable="true">
      <div slot="header" >
        <div>
          <span style="font-family:'Britannic Bold', 'Britannic';color:#3BC5BB;">CSI员工</span>
          <span style="font-family:'Segoe UI Emoji Bold', 'Segoe UI Emoji Normal', 'Segoe UI Emoji';color:#1D4474;"></span>
          <span style="font-family:'Segoe UI Emoji Bold', 'Segoe UI Emoji Normal', 'Segoe UI Emoji';color:#FF9A4C;">之家</span>
        </div>
      </div>
      <el-form :inline="true" :model="formData" status-icon :rules="loginRules" ref="formData" label-width="100px">
        <el-col :span="40">
          <el-form-item prop="loginName" label="用户名:">
            <el-input
              style="width: 200px;"
              v-model="formData.loginName"
              placeholder="请输入用户名">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="40">
          <el-form-item prop="password" label="密码:">
            <el-input
              style="width: 200px;"
              type="password"
              show-password
              v-model="formData.password"
              placeholder="请输入密码">
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <el-form-item label-width="0px">
            <el-checkbox>记住密码</el-checkbox>
          </el-form-item>
        </el-col>

        <el-col :span="20">
          <el-button
            style="width: 40%;"
            type="primary"
            @click="submitForm">
            登录
          </el-button>
        </el-col>

      </el-form>
    </el-card>
  </div>

</template>

<script>
  import {userApi} from "@/view/user/api";
  import db from "@/store/user/db"

  export default {
    name: "login",
    data() {

      return {
        formData: {
          loginName: '',
          password: ''
        },

        loginRules: {
          loginName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
        },

      }
    },

    methods: {
      submitForm() {
        const params = {
          ...this.formData
        };
        userApi.login(params).then(res => {
          db.set('user', res.data);
          db.set('login', true);
          this.$router.push({path: '/'})
        }).catch((err) => {
          db.remove('login');
          db.remove('user');
          this.$message.error(err.message);
        })

      },
      // submitRegisterForm(formName) {
      //   this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       this.userRegister();
      //     } else {
      //       this.$message.error('输入有误，请重新输入！');
      //       return false;
      //     }
      //   });
      // },
      // userRegister() {
      //   const params = {
      //     ...this.ruleForm
      //   };
      //   ysUserApi.Register(params).then(res => {
      //     this.$message.success('注册成功');
      //     this.resetForm('ruleForm');
      //     this.onClose();
      //   }).catch((err) => {
      //     this.$message.error('注册失败');
      //   })
      //
      // },

    }

  }
</script>

<style scoped>
  .zr-login {
    width: 100%;
    height: 100%;
    background-color: #222538;
    min-width: 1000px;
  }
  .login-container {
    background-color: #222538;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 25%;
    height: 30%;
    /*background: rgba(255, 255, 255, .8);*/
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    overflow: hidden;
    min-width: 430px;
    text-align: center;
    letter-spacing: 2px;
    color: #505458;
    min-height: 300px;
  }
</style>
