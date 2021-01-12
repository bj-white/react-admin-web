import request from '../util/request.js';

export function get (params) {
    return request({
        url: '/user/getByPage.do',
        params,
    });
}

export function add (params) {
    return request({
        url: '/user/add.do',
        method: 'post',
        data: params
    });
}

export function update (params) {
    return request({
        url: '/user/update.do',
        method: 'post',
        data: params
    });
}

export function del (id) {
    return request({
        url: '/user/delete.do',
        params: {
			id: id
		}
    });
}