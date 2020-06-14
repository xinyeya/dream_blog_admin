import axios from 'axios'
// import store from '../store/index'
import {getStorage} from "./storge";
import router from '@/router'

const request = axios.create({
    baseURL: 'http://127.0.0.1:3000/admin/',
    withCredentials: true, // 允许携带cookie
    timeout: 5000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
});

axios.defaults.withCredentials = true

request.interceptors.request.use(function (config) {
    // const {user} = store.state
    let user = getStorage('token')
    // console.log(user)
    if (user) {
        config.headers.authorization = "Bearer " + user
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});


request.interceptors.response.use(res => {
    return res.data.data || res.data
}, function (error) {
    if (error.response.status === 401) {
        // 看一下有没有 user（有 user 就有 refresh_token）
        const user = getStorage('token')

        // 如果连 user 都没有，则直接跳转登录页去登录
        if (!user) {
            router.push({
                name: 'login'
            })
            return
        }
    }
    return Promise.reject(error);
});

export default request