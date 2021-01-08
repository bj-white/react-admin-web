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

export function getMenuIdByRole (id) {
    return request({
        url: '/role/getMenuIdByRole.do',
        params: {
			id: id
		}
    });
}

export function setMenuIdByRole (params) {
    return request({
        url: '/role/setMenuIdByRole.do',
        method: 'post',
        data: {
            id: params.id,
            menus: params.menus,
		}
    });
}