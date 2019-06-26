<template>
  <div style="width: 100%">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="border-bottom: 1px">
      <el-breadcrumb-item :to="{ path: '/dept/dept-list' }">职位管理</el-breadcrumb-item>
      <el-breadcrumb-item>职位查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" ref="form" :model="form" label-width="80px" style="padding-top: 15px">
      <el-form-item label="职位名称:">
        <el-input clearable @clear="getJobList" style="width: 125px;" size="mini" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getJobList" size="mini">搜索</el-button>
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
        width="100">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="name"
        label="职位名称"
        width="300">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="remark"
        label="详细信息">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <router-link :to="'/job/edit-job/' + scope.row.id">
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
  import { jobApi } from "@/view/job/api";

  export default {
    name: "index",
    data() {
      return {
        form: {
          name: ''
        },
        tableData: [],
        multipleSelection: [],
        disable: true,
        page: 1,
        pageSize: 10,
        totalCount: 0,

      }
    },
    mounted() {
      this.getJobList()
    },

    methods: {
      open() {
        this.$confirm('此操作将永久删除该职位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.deleteJob();
        }).catch(() => {
          this.$message.info("已取消删除");
        });
      },
      getJobList() {
        const params = {
          ...this.form,
          page: this.page,
          pageSize: this.pageSize,
        }
        jobApi.getJobList(params).then(res => {
          this.tableData = res.data;
          this.page = res.page;
          this.pageSize = res.pageSize;
          this.totalCount = res.totalCount
        })
      },

      deleteJob() {
        const params = {
          ids: this.multipleSelection
        }
        jobApi.deleteJob(params).then(res => {
          this.getJobList();
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
