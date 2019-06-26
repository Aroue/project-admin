<template>
  <div style="width: 100%;">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="border-bottom: 1px">
      <el-breadcrumb-item :to="{ path: '/dept/dept-list' }">公告管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加公告</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :rules="rules" ref="form" :model="form" label-width="100px" style="padding-top: 15px">
      <el-form-item label="公告标题:" prop="title">
        <el-input clearable style="width: 250px;" size="mini" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="公告内容:" prop="content">
        <el-input :autosize="{ minRows: 2,maxRows: 3}" type="textarea" style="width: 450px;" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')" size="mini">添加</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  import { noticeApi } from "@/view/notice/api";

  export default {
    name: "addNotice",
    data() {
      return {
        form: {
          title: '',
          content: ''
        },

        rules: {
          title: [
            {required: true, message: '请输入公告标题', trigger: 'blur'},
          ],
          content: [
            {required: true, message: '请输入公告内容', trigger: 'blur'}
          ]
        }
      }
    },

    methods: {
      addNotice() {
        const params = {
          ...this.form,
          userId: 1
        }
        noticeApi.addNotice(params).then(res => {
          this.$message.success("添加成功");
          this.$router.push({path: '/notice/notice-list'})
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addNotice();
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
