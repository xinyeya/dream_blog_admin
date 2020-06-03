import axios from 'axios'

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
    return config;
}, function (error) {
    return Promise.reject(error);
});


request.interceptors.response.use(res => {
    return res.data.data || res.data
}, function (error) {
    return Promise.reject(error);
});

export default request