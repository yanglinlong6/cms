import axios from 'axios';
import { Message } from 'element-ui'
import store from '../store/index';
import router from '../router';

// 配置axios根路径
axios.defaults.baseURL = "http://interview-api-t.itheima.net/";

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = store.state.user.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log(error);
    const msg = error.response.data.message;
    // 判断token失效
    if (error.response.status === 401) {
        // 提示: token失效，请重新登录
        Message.error("token失效，请重新登录");
        // 删除token
        store.commit("user/delToken");
        // 跳转登录页
        router.push("/login");
    } else if (msg) {
        Message.error(msg)
    }
    return Promise.reject(error);
});

export default axios;
