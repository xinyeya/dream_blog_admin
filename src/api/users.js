import request from "../utils/request";

export const userdetail = () => {
    return request({
        methods: 'GET',
        url: 'users'
    })
}