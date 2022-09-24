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

// 获取面经详情
export function getArticleDetail(id) {
    return request.get("/admin/interview/show", {
        params: {
            id,
        }
    })
}

// 编辑面经
export function updateArticle(data) {
    return request.put("/admin/interview/update", data);
}

// 删除面经
export function deleteArticle(id) {
    return request.delete("/admin/interview/remove", {
        data: {
            id,
        }
    })
}