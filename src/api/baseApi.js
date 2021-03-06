import request from '../util/request.js';

export function get (params, flag) {
    return request({
        url: `/${flag}/getByPage.do`,
        params,
    });
}

export function add (params, flag) {
    return request({
        url: `${flag}/add.do`,
        method: 'post',
        data: params
    });
}

export function update (params, flag) {
    return request({
        url: `/${flag}/update.do`,
        method: 'post',
        data: params
    });
}

export function del (id, flag) {
    return request({
        url: `/${flag}/delete.do`,
        params: {
			id
		}
    });
}
