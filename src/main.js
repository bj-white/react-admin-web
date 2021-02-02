import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { ConfigProvider } from 'antd';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './App.js';
import todoApp from './store/reducer/index.js';
import Login from './page/login/Login.js';
import NotFound from './component/NotFound.js';

import './style/index.less';

const store = createStore(
    todoApp,
    applyMiddleware(thunkMiddleware),
);

ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider locale={zh_CN}>
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/app/dashboard/index" push />} />
                    <Route path="/app">
                        <App/>
                    </Route>
                    <Route path="/login" component={Login} />
                    <Route path="/404" component={NotFound} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
);
