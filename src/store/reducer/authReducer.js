export default function authReducer (state = {
    /* username: 'zhangsan',
    age: 18,
    realname: 'white',
    role: 'admin' */
}, action) {
    if (action.type === 'SET_USER') {
        return action.user;
    }
    return state;
}
