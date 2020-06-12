import request from "../utils/request";

// 获取标签列表
export const labelsList = () => {
    return request({
        method: 'GET',
        url: 'labels'
    })
}

// 保存文章
export const articleText = data => {
    return request({
        method: 'POST',
        url: 'articles/insert',
        data: data
    })
}

// 获取所有文章信息
export const articleInfo = data => {
    console.log(data)
    if (data.search) {
        return request({
            method: 'GET',
            url: `articles?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}&search=${data.search}`
        })
    }
    return request({
        method: 'GET',
        url: `articles?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`
    })
}

// 修改文章状态
export const articleState = data => {
    return request({
        method: 'PUT',
        url: 'articles/state',
        data:data
    })
}

// 删除文章
export const articleDel = id => {
    return request({
        method: 'DELETE',
        url: 'articles/del',
        data: {id}
    })
}

// 获取单个文章信息
export const articleEditShow = id => {
    return request({
        method: 'GET',
        url: 'articles/editshow?id='+id,
    })
}

export const aricleEdit = data => {
    return request({
        method: 'PUT',
        url: 'articles/update',
        data: data
    })
}