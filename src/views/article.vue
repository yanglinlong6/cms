<template>
  <div class="article-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>面经后台</el-breadcrumb-item>
      <el-breadcrumb-item>面经管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never" border="false">
      <template #header>
        <div class="header">
          <span>共 {{ amount }} 条记录</span>
          <el-button
            icon="el-icon-plus"
            size="small"
            type="primary"
            round
            @click="addArticle"
          >
            添加面经
          </el-button>
        </div>
      </template>

      <el-table :data="articleList" border style="width: 100%">
        <el-table-column prop="stem" label="标题"> </el-table-column>
        <el-table-column prop="creator" label="作者"> </el-table-column>
        <el-table-column prop="likeCount" label="点赞"> </el-table-column>
        <el-table-column prop="views" label="浏览数"> </el-table-column>
        <el-table-column prop="createdAt" label="更新时间"> </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #default="{ row }">
            <div class="actions">
              <i class="el-icon-view"></i>
              <i class="el-icon-edit-outline" @click="editArticle(row.id)"></i>
              <i class="el-icon-delete"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="amount"
        :page-size="pageSize"
        @current-change="onPageChange"
      >
      </el-pagination>
    </el-card>

    <el-drawer
      :title="form.id ? '编辑面经' : '添加面经'"
      :visible.sync="showDrawer"
      size="50%"
      @close="onDrawerClose"
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="标题" prop="stem">
          <el-input v-model="form.stem"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- <el-input v-model="form.content"></el-input> -->
          <quill-editor
            v-model="form.content"
            @blur="$refs.form.validateField('content')"
          >
          </quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">确认</el-button>
          <el-button @click="showDrawer = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import {
  getArticleList,
  createArticle,
  getArticleDetail,
} from "../api/article";
export default {
  name: "article-page",
  data() {
    return {
      articleList: [],
      currentPage: 1,
      pageSize: 15,
      amount: 0,
      showDrawer: false,
      form: {
        stem: "",
        content: "",
      },
      rules: {
        stem: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    };
  },
  created() {
    this.loadArticleList();
  },
  methods: {
    async loadArticleList() {
      const res = await getArticleList(this.currentPage, this.pageSize);
      this.amount = res.data.data.total;
      this.articleList = res.data.data.rows;
      // 每次加载完数据，滚动页面到顶部
      this.$nextTick(() => {
        document.querySelector(".el-main").scrollTop = 0;
      });
    },
    onPageChange(page) {
      // 更新当前页
      this.currentPage = page;
      // 调用列表接口更新数据
      this.loadArticleList();
    },
    addArticle() {
      this.showDrawer = true;
      this.form = {
        stem: "",
        content: "",
      };
    },
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          await createArticle(this.form);
          this.loadArticleList();
          this.showDrawer = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onDrawerClose() {
      this.$refs.form.resetFields();
    },
    async editArticle(id) {
      const res = await getArticleDetail(id);
      this.form = res.data.data;
      // 打开抽屉
      this.showDrawer = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 25px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
  }
  .actions {
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    color: #666;
    > i:hover {
      color: rgba(114, 124, 245, 1);
      cursor: pointer;
    }
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-breadcrumb {
  margin-top: 10px;
}
.el-form {
  padding-right: 40px;
}
.quill-editor {
  ::v-deep .ql-editor {
    height: 300px;
  }
}
.el-rate {
  padding: 10px 0;
}
.article-preview {
  padding: 0 40px 40px 40px;
  > h5 {
    font-size: 20px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 30px;
    margin: 0 0 20px 0;
  }
}
</style>
