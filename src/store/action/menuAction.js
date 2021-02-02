import { getMenu } from '../../api/menuApi.js';

export default function getMenuTree () {
    return (dispatch) => getMenu().then((response) => {
        dispatch({ type: 'SET_MENU_TREE', menuTree: response.data.data || [] });
    });
}
