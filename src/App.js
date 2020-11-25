import React from 'react';
import Route from './route';
import SiderMenu from './component/SiderMenu';

import './style/app.scss';
export default class App extends React.Component {
    state = {
        collapsed: false,
    };

    toggleCollapsed () {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render () {
        return (
            <div className="app_wrapper">
                <div className="app_header">
                    <span className="logo"></span>
                </div>
                <div className={this.state.collapsed ? 'app_menu_content_footer close' : 'app_menu_content_footer'}>
                    <SiderMenu collapsed={this.state.collapsed} toggleCollapsed={this.toggleCollapsed.bind(this)}></SiderMenu>
                    <div className="app_content_footer">
                        <div className="app_content">
                            <Route/>
                        </div>
                        <div className="app_footer">this is footers.</div>
                    </div>
                </div>
            </div>
        );
    }
}