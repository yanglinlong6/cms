import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue';
import NotFound from '../views/404.vue';
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

export default router
