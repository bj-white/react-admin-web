import {get} from '../../api/menuApi.js';

export function getMenuTree () {
    return (dispatch) => {
        return get().then((response) => {
            console.log(response.data.data);
            dispatch({type: 'SET_MENU_TREE', menuTree: response.data.data});
        });
    }
}