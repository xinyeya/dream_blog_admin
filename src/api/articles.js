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