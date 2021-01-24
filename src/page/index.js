import React from 'react';
// import Loadable from 'react-loadable';
// import CommonLoading from '../component/CommonLoading.js';

/* export default {
    Dashboard: Loadable({ loader: () => import('./dashboard/Dashboard'), loading: CommonLoading }),
    UserList: Loadable({ loader: () => import('./user/UserList'), loading: CommonLoading }),
    RoleList: Loadable({ loader: () => import('./role/RoleList'), loading: CommonLoading }),
    MenuList: Loadable({ loader: () => import('./menu/MenuList'), loading: CommonLoading }),
    PermissionList: Loadable({ loader: () => import('./permission/PermissionList'), loading: CommonLoading }),
}; */

function asyncComponent (importComponent) {
    class AsyncComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                component: null
            };
        }

        async componentDidMount () {
            const { default: component } = await importComponent();
            this.setState({
                component
            });
        }

        render () {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }
    return AsyncComponent;
}

export default {
    Dashboard: asyncComponent(() => import('./dashboard/Dashboard')),
    UserList: asyncComponent(() => import('./user/UserList')),
    RoleList: asyncComponent(() => import('./role/RoleList')),
    MenuList: asyncComponent(() => import('./menu/MenuList')),
    PermissionList: asyncComponent(() => import('./permission/PermissionList')),
};
