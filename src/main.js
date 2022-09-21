import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./utils/element-ui";
// 导入公共样式
import "./styles/index.scss";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
