import request from '../util/request.js';

export function get (params) {
    return request({
        url: '/role/getByPage.do',
        params,
    });
}

export function add (params) {
    return request({
        url: '/role/add.do',
        method: 'post',
        data: params
    });
}

export function update (params) {
    return request({
        url: '/role/update.do',
        method: 'post',
        data: params
    });
}

export function del (id) {
    return request({
        url: '/role/delete.do',
        params: {
			id: id
		}
    });
}