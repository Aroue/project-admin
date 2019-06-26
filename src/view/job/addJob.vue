<template>
  <div style="width: 100%;">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="border-bottom: 1px">
      <el-breadcrumb-item :to="{ path: '/dept/dept-list' }">职位管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加职位</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :rules="rules" :inline="true" ref="form" :model="form" label-width="100px" style="padding-top: 15px">
      <el-col :span="20">
        <el-form-item label="职位名称:" prop="name">
          <el-input clearable style="width: 125px;" size="mini" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="详细描述:" prop="remark">
          <el-input clearable style="width: 400px;" size="mini" v-model="form.remark"></el-input>
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
  import { jobApi } from "@/view/job/api";

  export default {
    name: "addJob",
    data() {
      return {
        form: {
          name: '',
          remark: ''
        },

        rules: {
          name: [
            {required: true, message: '请输入职位名称', trigger: 'blur'},
          ],
          remark: [
            {required: true, message: '请输入详细描述', trigger: 'blur'}
          ]
        }

      }
    },
    methods: {
      addJob() {
        const params = {
          ...this.form
        }
        jobApi.addJob(params).then(res => {
          this.$message.success("添加成功");
          this.$router.push({path: '/job/job-list'})
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addJob();
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
