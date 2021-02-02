import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookie from 'js-cookie';
import AllComponents from '../page';

class CRouter extends React.Component {
    requireAuth (roles, component) {
        const { auth } = this.props;
        if (!roles.includes(auth.role)) {
            return <Redirect to="/404"/>;
        }
        return component;
    }

    requireLogin (component) {
        /* const {auth} = this.props;
        if (!auth.role) {
            return <Redirect to={'/login'} />;
        }
        return roles ? this.requireAuth (roles, component) : component; */
        const token = Cookie.get('token');
        if (!token) {
            return <Redirect to="/login" />;
        }
        return component;
    }

    render () {
        const { routesConfig } = this.props;
        return (
            <Switch>
                {Object.keys(routesConfig).map((key) => routesConfig[key].map((r) => {
                    const route = (p) => {
                        const Component = AllComponents[p.component];
                        return (
                            <Route
                                key={p.url}
                                exact
                                path={p.url}
                                render={() => this.requireLogin(<Component/>)}
                            />
                        );
                    };
                    return r.component ? route(r) : r.children.map((i) => route(i));
                }))}
            </Switch>
        );
    }
}

export default connect((state) => ({
    auth: state.authReducer,
    routesConfig: {
        menus: state.menuReducer,
        others: [],
    },
}))(CRouter);
