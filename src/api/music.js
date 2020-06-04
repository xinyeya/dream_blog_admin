import request from "../utils/request";

// 获取所有音乐
export const musicList = (pageIndex, pageSize) => {
    return request({
        method: 'GET',
        url: `musics?pageIndex=${pageIndex}&pageSize=${pageSize}`
    })
}

// 添加音乐
export const musicAdd = data => {
    return request({
        method: 'POST',
        url: 'musics/insert',
        data: data
    })
}