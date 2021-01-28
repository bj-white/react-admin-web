import request from '../util/request.js';

export function get () {
    return request({
        // url: '../../route/config.json',
        url: '/menu/getMenuTree.do',
    });
}

export function add (params) {
    return request({
        url: '/menu/add.do',
        method: 'post',
        data: params
    });
}

export function update (params) {
    return request({
        url: '/menu/update.do',
        method: 'post',
        data: params
    });
}

export function del (id) {
    return request({
        url: '/menu/delete.do',
        params: {
			id
		}
    });
}

export function getMenu () {
    return request({
        url: '/menu/getMenuTreeByUser.do'
    });
}
