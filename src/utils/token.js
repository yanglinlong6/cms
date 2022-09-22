const StorageKey = "hm-admin-token";

// 读取token
export function getToken() {
    return localStorage.getItem(StorageKey);
}
// 存储token
export function saveToken(token) {
    localStorage.setItem(StorageKey, token);
}
// 删除token
export function deleteToken() {
    localStorage.removeItem(StorageKey);
}
