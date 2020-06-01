import axios from 'axios'

const request = axios.create({
    baseURL: 'http://127.0.0.1:3000/admin/',
    timeout: 5000 // 请求超时时间
});

// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
request.interceptors.response.use(res => {
    // Do something with response data
    return res.data.data || res.data
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default request