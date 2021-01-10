import axios from 'axios';
import qs from 'qs';

const request = axios.create({
    baseURL: '/api',
    transformRequest: [function (data, headers) {
        return qs.stringify(data, {arrayFormat: 'brackets'});
    }],
});

export default request;