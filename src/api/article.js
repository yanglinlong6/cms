import request from '../utils/request';

// 获取面经列表
export function getArticleList(current, pageSize) {
    return request.get("/admin/interview/query", {
        params: {
            current,
            pageSize,
        }
    })
}

// 创建面经
// data -> { stem, content }
export function createArticle(data) {
    return request.post("/admin/interview/create", data);
}