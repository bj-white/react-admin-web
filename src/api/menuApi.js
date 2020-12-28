import request from '../util/request.js';

export function getMenuTree1 () {
    return request({
        //url: '../../route/config.json',
        url: '/menu/getMenuTree.do',
    });
}