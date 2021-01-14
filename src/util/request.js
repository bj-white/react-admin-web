import axios from 'axios';
import qs from 'qs';

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
    config.headers.common['X-Token'] = 'hello world';

    return config;
});

export default request;