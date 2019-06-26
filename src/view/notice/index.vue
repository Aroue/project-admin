<template>
  <div style="width: 100%">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="border-bottom: 1px">
      <el-breadcrumb-item :to="{ path: '/dept/dept-list' }">公告管理</el-breadcrumb-item>
      <el-breadcrumb-item>公告查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" ref="form" :model="form" label-width="80px" style="padding-top: 15px">
      <el-form-item label="公告名称:">
        <el-input clearable @clear="getNoticeList" style="width: 125px;" size="mini" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="公告内容:">
        <el-input clearable @clear="getNoticeList" style="width: 125px;" size="mini" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getNoticeList" size="mini">搜索</el-button>
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
        prop="title"
        label="公告名称"
        width="200">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="content"
        label="公告内容"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="创建日期"
        width="200">
        <template slot-scope="scope">{{ scope.row.createdAt }}</template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="userName"
        label="公告人"
        width="100">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <router-link :to="'/notice/edit-notice/' + scope.row.id">
            <el-button
              type="text"
              size="small">
              <i class="el-icon-edit"></i>
              修改
            </el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="预览"
        width="100">
        <template slot-scope="scope">
          <i class="el-icon-view" @click="preView(scope.row.title,scope.row.content)"></i>
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
    <el-dialog
      title="公告预览"
      :visible.sync="dialogVisible"
      width="30%">
      <h3 style="text-align: center">{{dialog.title}}</h3>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;{{dialog.content}}</span>
    </el-dialog>
  </div>
</template>

<script>
  import {noticeApi} from "@/view/notice/api";

  export default {
    name: "index",
    data() {
      return {
        form: {
          title: '',
          content: ''
        },
        dialog: {
          title: '',
          content: ''
        },
        dialogVisible: false,
        tableData: [],
        multipleSelection: [],
        disable: true,
        page: 1,
        pageSize: 10,
        totalCount: 0,
      }
    },

    mounted() {
      this.getNoticeList()
    },

    methods: {
      open() {
        this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.deleteNotice();
        }).catch(() => {
          this.$message.info("已取消删除");
        });
      },
      getNoticeList() {
        const params = {
          ...this.form,
          page: this.page,
          pageSize: this.pageSize,
        }
        noticeApi.getNoticeList(params).then(res => {
          this.tableData = res.data;
          this.page = res.page;
          this.pageSize = res.pageSize;
          this.totalCount = res.totalCount
        })
      },
      deleteNotice() {
        const params = {
          ids: this.multipleSelection
        }
        noticeApi.deleteNotice(params).then(res => {
          this.getNoticeList();
          this.$message.success("删除成功");
        }).catch((err) => {
          this.$message.error(err.message);
        })
      },

      preView(title,content) {
        this.dialogVisible = true;
        this.dialog.title = title;
        this.dialog.content = content;
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
