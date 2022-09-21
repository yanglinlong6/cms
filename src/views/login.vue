<template>
  <div class="page-container">
    <el-card class="login-card">
      <div slot="header" class="clearfix">
        <span>黑马面经运营后台</span>
      </div>
      <el-form label-position="top" :model="user">
        <el-form-item label="用户名">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item class="login-operation">
          <el-button type="primary">登录</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.login-card {
    width: 45%;
}

::v-deep .el-card__header {
  background-color: #727cf5;
  color: #fff;
  text-align: center;
}

.login-operation {
    text-align: center;
}
</style>