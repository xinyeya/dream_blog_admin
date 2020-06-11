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

// 删除音乐
export const musicDel = id => {
    return request({
        method: 'DELETE',
        url: 'musics/del',
        data: {id}
    })
}

// 显示要修改的音乐数据
export const musicEditShow = id => {
    return request({
        method: 'GET',
        url: `musics/editshow?id=${id}`
    })
}

export const musicEdit = (id, data) => {
    return request({
        method: 'POST',
        url: `musics/insert?id=${id}`,
        data: data
    })
}

