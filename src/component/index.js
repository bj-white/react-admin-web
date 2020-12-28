import React from 'react';

/* import Loadable from 'react-loadable';
const Loading = () => <div></div>;
export default {
    Dashboard: Loadable({loader: () => import('./dashboard/Dashboard'), loading: Loading}),
    UserList: Loadable({loader: () => import('./user/UserList'), loading: Loading}),
    RoleList: Loadable({loader: () => import('./role/RoleList'), loading: Loading}),
}; */

function asyncComponent (importComponent) {
    class AsyncComponent extends React.Component {
        constructor(props) {
            super(props);
        
            this.state = {
                component: null
            };
        }
    
        async componentDidMount() {
            const { default: component } = await importComponent();
        
            this.setState({
                component: component
            });
        }
    
        render() {
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
    Login: asyncComponent(() => import('./login/Login')),
};