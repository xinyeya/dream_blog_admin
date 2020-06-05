import request from "../utils/request";

// 获取所有音乐
export const musicList = (pageIndex, pageSize, title) => {
    if (!title) {
        return request({
            method: 'GET',
            url: `musics?pageIndex=${pageIndex}&pageSize=${pageSize}`
        })
    }else{
        console.log(pageIndex)
        return request({
            method: 'GET',
            url: `musics?pageIndex=${pageIndex}&pageSize=${pageSize}&title=${title}`
        })
    }

}

// 添加音乐
export const musicAdd = data => {
    return request({
        method: 'POST',
        url: 'musics/insert',
        data: data
    })
}

// 搜索音乐
// export const musicSearch = (pageIndex, pageSize, title) => {
//
// }

// 删除单个音乐

// 删除多个音乐

// 修改音乐
