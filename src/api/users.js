import request from "../utils/request";

export const userdetail = () => {
    return request({
        method: 'GET',
        url: 'users'
    })
}

export const useredit = data => {
    return request({
        method: 'post',
        url: 'users/update',
        header : {
            'content-type' : 'application/x-www-form-urlencoded'
        },
        data: data
    })
}