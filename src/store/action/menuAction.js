import { get } from '../../api/menuApi.js';

export default function getMenuTree () {
    return (dispatch) => get().then((response) => {
        console.log(response.data.data);
        dispatch({ type: 'SET_MENU_TREE', menuTree: response.data.data });
    });
}
