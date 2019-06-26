<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="border-bottom: 1px">
      <el-breadcrumb-item :to="{ path: '/employee/employee-list' }">员工管理</el-breadcrumb-item>
      <el-breadcrumb-item>员工查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" ref="form" :model="form" label-width="80px" style="padding-top: 15px">
      <el-col :span="20">
        <el-form-item label="职位:">
          <el-select clearable @change="getEmployeeList" v-model="form.jobId" placeholder="--请选择职位--" size="mini"
                     style="width: 130px;">
            <el-option
              v-for="item in jobList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名:">
          <el-input clearable @change="getEmployeeList" style="width: 125px;" size="mini" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号:">
          <el-input clearable @change="getEmployeeList" style="width: 178px;" size="mini" v-model="form.cardId"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-form-item label="性别:">
          <el-select clearable @change="getEmployeeList" v-model="form.sex" placeholder="--请选择性别--" size="mini"
                     style="width: 130px;">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机:">
          <el-input clearable @change="getEmployeeList" style="width: 125px;" size="mini" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="所属部门:">
          <el-select clearable @change="getEmployeeList" v-model="form.deptId" placeholder="--请选择部门--" size="mini"
                     style="width: 130px;">
            <el-option
              v-for="item in deptList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getEmployeeList" size="mini">搜索</el-button>
          <el-button :disabled="disable" type="danger" @click="open" size="mini">删除</el-button>
        </el-form-item>
      </el-col>
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
        fixed
        header-align="center"
        align="center"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        fixed
        header-align="center"
        align="center"
        prop="name"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="sex"
        label="性别"
        width="50">
        <template slot-scope="scope">
          <span v-if="scope.row.sex === 1">男</span>
          <span v-if="scope.row.sex === 2">女</span>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="phone"
        label="手机号码"
        width="150">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="jobName"
        label="职位"
        width="80">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="education"
        label="学历"
        width="80">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="cardId"
        label="身份证号"
        width="180">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="deptName"
        label="部门"
        width="100">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="address"
        label="联系地址"
        width="250">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="建档日期"
        width="200">
        <template slot-scope="scope">{{ scope.row.createdAt }}</template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <router-link :to="'/employee/edit-employee/' + scope.row.id">
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
  import {employeeApi} from "@/view/employee/api";
  import {jobApi} from "@/view/job/api";
  import {deptApi} from "@/view/dept/api";

  export default {
    name: "index",
    data() {
      return {
        form: {
          cardId: '',
          deptId: '',
          jobId: '',
          name: '',
          phone: '',
          sex: ''
        },
        tableData: [],
        jobList: [],
        deptList: [],
        multipleSelection: [],
        disable: true,
        page: 1,
        pageSize: 10,
        totalCount: 0,
      }
    },
    beforeMount() {
      this.getJobList();
      this.getDeptList()
    },

    mounted() {
      this.getEmployeeList()
    },

    methods: {
      open() {
        this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.deleteEmployee();
        }).catch(() => {
          this.$message.info("已取消删除");
        });
      },
      getEmployeeList() {
        const params = {
          ...this.form,
          page: this.page,
          pageSize: this.pageSize,
        }
        employeeApi.getEmployeeList(params).then(res => {
          this.tableData = res.data;
          this.page = res.page;
          this.pageSize = res.pageSize;
          this.totalCount = res.totalCount
        })
      },
      deleteEmployee() {
        const params = {
          ids: this.multipleSelection
        }
        employeeApi.deleteEmployee(params).then(res => {
          this.getEmployeeList();
          this.$message.success("删除成功");
        }).catch((err) => {
          this.$message.error(err.message);
        })
      },
      getJobList() {
        const params = {}
        jobApi.getJobList(params).then(res => {
          this.jobList = res.data
        })
      },
      getDeptList() {
        const params = {}
        deptApi.getDeptList(params).then(res => {
          this.deptList = res.data
        })
      },

      handleSelectionChange(val) {
        if (val.length !== 0) {
          for (let i = 0; i < val.length; i++) {
            if (this.multipleSelection.indexOf(val[i].id) === -1) {
              this.multipleSelection.push(val[i].id);
              // this.multipleSelection.push(val[i].id)
            }
          }
          this.disable = this.multipleSelection.length === 0;
        }
      },

    }
  }
</script>

<style scoped>

</style>
