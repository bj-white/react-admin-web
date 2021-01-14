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

// repeat id=8&menus=3&menus=4
// brackets menus[]: 3
// comma menus: 3,4
// indices menus[0]: 3
// default menus[0]: 3
export function addMenuRole (params) {
    return request({
        url: '/role/addMenuRole.do',
        method: 'post',
        data: params
    });
}