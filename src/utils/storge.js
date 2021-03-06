const localStorage = window.localStorage

// 获取缓存
export const getStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

// 保存缓存
export const saveStorage = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val))
}

// 删除缓存
export const removeStorage = (key) => {
    localStorage.removeItem(key)
}