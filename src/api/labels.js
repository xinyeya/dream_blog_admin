import request from "../utils/request";

// 查询所有标签
export const labelsList = () => {
    return request({
        method: 'GET',
        url: 'labels'
    })
}

// 添加标签
export const labelsAdd = title => {
    console.log(title)
    return request({
        method: 'POST',
        url: 'labels/insert',
        data: {title}
    })
}

// 删除标签
export const labelDel = id => {
    return request({
        method: 'DELETE',
        url: 'labels/del',
        data: {id}
    })
}