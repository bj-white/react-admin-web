import {getMenuTree1} from '../../api/menuApi.js';

export function getMenuTree () {
    return (dispatch) => {
        return getMenuTree1().then((response) => {
            dispatch({type: 'SET_MENU_TREE', menuTree: response.data.data});
        });
    }
}