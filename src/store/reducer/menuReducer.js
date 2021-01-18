export default function menuReducer (state = [], action) {
    if (action.type === 'SET_MENU_TREE') {
        return action.menuTree;
    }
    return state;
}
