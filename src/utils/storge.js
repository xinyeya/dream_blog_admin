const localStorage = window.localStorage

// 获取缓存
export function getStorage (key) {
    return JSON.parse(localStorage.getItem(key))
}

// 保存缓存
export function saveStorage (key, val) {
    localStorage.setItem(key, val)
}

// 删除缓存
export function removeStorage(key) {
    localStorage.removeItem(key)
}