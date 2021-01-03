import {get} from '../../api/menuApi.js';

export function getMenuTree () {
    return (dispatch) => {
        return get().then((response) => {
            dispatch({type: 'SET_MENU_TREE', menuTree: response.data.data});
        });
    }
}