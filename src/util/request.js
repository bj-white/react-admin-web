import axios from 'axios';
import qs from 'qs';
import Cookie from 'js-cookie';

console.log(process.env.NODE_ENV);

const request = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? '/api' : '',
    transformRequest: [function (data) {
        if (data && data.qsOption) {
            const qsOption = JSON.parse(JSON.stringify(data.qsOption));
            delete data.qsOption;
            return qs.stringify(data, qsOption);
        }
        return qs.stringify(data);
    }],
});

request.interceptors.request.use((config) => {
    config.headers.common['X-Token'] = Cookie.get('token') || '';

    return config;
});

request.interceptors.response.use((response) => response, (error) => {
    /**
     * 200: success
     * 501: error 有msg
     * 502: 没有登录或登录过期
     * 504: 没有权限
     */
    const { status } = error.response;
    if (status === 502) {
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

export default request;
