import request from "../utils/request";

export const loginCheck = data => {
    return request({
        method: 'POST',
        url: 'login',
        data: data
    })
}