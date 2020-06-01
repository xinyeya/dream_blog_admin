const localStorage = window.localStorage

// 获取缓存
export function getStorage () {
    return JSON.parse(localStorage.getItem(USER_KEY))
}

// 保存缓存
export function saveStorage (val) {
    localStorage.setItem(USER_KEY, val)
}

// 删除缓存
export function removeStorage() {
    localStorage.removeItem(USER_KEY)
}