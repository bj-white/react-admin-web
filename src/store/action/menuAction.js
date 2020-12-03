import request from '../../util/request.js';

export function getMenuTree () {
    return (dispatch) => {
        return request({
            // url: '/menu/getMenuTree',
            url: '../../route/config.json',
        }).then((response) => {
            dispatch({type: 'SET_MENU_TREE', menuTree: response.data.data});
        });
    }
}