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

export default request;