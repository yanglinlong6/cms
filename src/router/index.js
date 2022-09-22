import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue';
import NotFound from '../views/404.vue';
import store from '../store';

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    // 按需加载
    component: () => import("../views/index.vue"),
  },
  // 404页面配置为最后一项
  {
    path: "*",
    component: NotFound,
  },
]

const router = new VueRouter({
  routes
})

// 配置导航守卫，检查登录
router.beforeEach((to, from, next) => {
  // 登录页不需要检查登录
  if (to.path === "/login") {
    next();
    return;
  }
  // 检查token
  if(store.state.user.token) {
    // 已登录
    next();
    return;
  }
  // 不是登录页，而且没有token
  // 跳转到登录页
  next("/login");
})

export default router
