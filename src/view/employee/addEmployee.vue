<template>
  <div style="width: 100%;">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="border-bottom: 1px">
      <el-breadcrumb-item :to="{ path: '/employee/employee-list' }">员工管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加员工</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :inline="true" :rules="rules" ref="form" :model="form" label-width="100px" style="padding-top: 15px">
      <el-col :span="20">
        <el-form-item label="姓名:" prop="name">
          <el-input clearable style="width: 130px;" size="mini" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码:" prop="cardId">
          <el-input clearable style="width: 200px;" size="mini" v-model="form.cardId"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-form-item label="性别:" prop="sex">
          <el-select clearable v-model="form.sex" size="mini"
                     style="width: 130px;">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位:" prop="jobId">
          <el-select clearable v-model="form.jobId" size="mini"
                     style="width: 200px;">
            <el-option
              v-for="item in jobList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-form-item label="学历:" prop="education">
          <el-input clearable style="width: 130px;" size="mini" v-model="form.education"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input clearable style="width: 200px;" size="mini" v-model="form.email"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-form-item label="手机:" prop="phone">
          <el-input clearable style="width: 130px;" size="mini" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="tel">
          <el-input clearable style="width: 200px;" size="mini" v-model="form.tel"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-form-item label="政治面貌:" prop="parity">
          <el-input clearable style="width: 250px;" size="mini" v-model="form.parity"></el-input>
        </el-form-item>
        <el-form-item label="QQ 号码:" prop="qqNum">
          <el-input clearable style="width: 150px;" size="mini" v-model="form.qqNum"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-form-item label="联系地址:" prop="address">
          <el-input clearable style="width: 250px;" size="mini" v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码:" prop="postCode">
          <el-input clearable style="width: 150px;" size="mini" v-model="form.postCode"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-form-item label="出生日期:" prop="birthday">
          <el-date-picker
            style="width: 250px;"
            v-model="form.birthday"
            type="datetime"
            placeholder="选择日期"
            format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="民族:" prop="race">
          <el-input clearable style="width: 150px;" size="mini" v-model="form.race"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-form-item label="所学专业:" prop="speciality">
          <el-input clearable style="width: 250px;" size="mini" v-model="form.speciality"></el-input>
        </el-form-item>
        <el-form-item label="爱好:" prop="hobby">
          <el-input clearable style="width: 150px;" size="mini" v-model="form.hobby"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-form-item label="备注:" prop="remark">
          <el-input clearable style="width: 250px;" size="mini" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item label="所属部门:" prop="deptId">
          <el-select clearable v-model="form.deptId" size="mini"
                     style="width: 150px;">
            <el-option
              v-for="item in deptList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
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
  import {jobApi} from "@/view/job/api";
  import { deptApi } from "@/view/dept/api";
  import {employeeApi} from "@/view/employee/api";
  import {isvalidPhone} from "@/tools/utils";

  export default {
    name: "addEmployee",
    data() {
      let validPhone=(rule, value,callback)=>{
        if (value === null) {
          callback()
        }
        else if (!isvalidPhone(value)){
          callback(new Error('请输入正确的11位手机号码'))
        }else {
          callback()
        }
      };
      return {
        form: {
          name: '',
          cardId: '',
          sex: '',
          jobId: '',
          deptId: '',
          education: '',
          email: '',
          phone: '',
          tel: '',
          birthday: '',
          race: '',
          address: '',
          postCode: '',
          parity: '',
          qqNum: '',
          speciality: '',
          remark: '',
          hobby: ''
        },
        jobList: [],
        deptList: [],

        rules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
          ],
          cardId: [
            {required: true, message: '请输入身份证号码', trigger: 'blur'}
          ],
          jobId: [
            { required: true, message: '请选择职位', trigger: 'blur' }
          ],
          deptId: [
            { required: true, message: '请选择部门', trigger: 'blur' }
          ],
          email: [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]

        }
      }
    },

    mounted() {
      this.getJobList();
      this.getDeptList();
    },

    methods: {
      getJobList() {
        const params = {
        }
        jobApi.getJobList(params).then(res => {
          this.jobList = res.data
        })
      },

      getDeptList() {
        const params = {
        }
        deptApi.getDeptList(params).then(res => {
          this.deptList = res.data
        })
      },

      addEmployee() {
        const params = {
          ...this.form
        }
        employeeApi.addEmployee(params).then(res => {
          this.$message.success("添加成功");
          this.$router.push({path: '/employee/employee-list'})
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addEmployee();
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
