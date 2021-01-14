import axios from 'axios';
import qs from 'qs';
import Cookie from 'js-cookie';

const request = axios.create({
    baseURL: '/api',
    transformRequest: [function (data) {
        if (data && data.qsOption) {
            var qsOption = JSON.parse(JSON.stringify(data.qsOption));
            delete data.qsOption;
            return qs.stringify(data, qsOption);
        } else {
            return qs.stringify(data);
        }
    }],
});

request.interceptors.request.use((config) => {
    config.headers.common['X-Token'] = Cookie.get('token') || '';

    return config;
});

request.interceptors.response.use((response) => {
    return response;
}, (error) => {
    /**
     * 200: success
     * 501: error 有msg
     * 502: 没有登录或登录过期
     * 504: 没有权限
     */
    var status = error.response.status;
    if (status == 502) {
        window.location.href = '/#/login';
    }
    return Promise.reject(error);
});

export default request;