<template>
  <div class="page-container">
    <el-card class="login-card">
      <div slot="header" class="clearfix">
        <span>黑马面经运营后台</span>
      </div>
      <el-form
        ref="loginForm"
        :rules="rules"
        label-position="top"
        :model="user"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item class="login-operation">
          <el-button type="primary" @click="submit">登录</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from "../api/user";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.loginForm.validate(async (valid) => {
        // 表单校验正确
        if (valid) {
          // 调用登录接口
          const res = await login(this.user);
          // 解构取出token
          const { token } = res.data.data;
          console.log(1, token);
          // 存储token，Vuex和本地存储
          this.$store.commit("user/updateToken", token);
          // 跳转首页
          this.$router.push("/");
        } else {
          // 表单校验不正确
          console.log("error submit!!");
          return false;
        }
      });
    },
    reset() {
      this.$refs.loginForm.resetFields();
    },
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/login-bg.svg");
  background-size: 100%;
  background-position: center center;
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