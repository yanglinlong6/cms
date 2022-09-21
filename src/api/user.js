import request from '../utils/request';

// 登录接口
// data -> { username, password }
export function login(data) {
    return request.post("/auth/login", data);
};
