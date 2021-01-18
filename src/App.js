import React from 'react';
import { Breadcrumb } from 'antd';
import Route from './route';
import SiderMenu from './page/SiderMenu';

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    toggleCollapsed () {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render () {
        return (
            <div className="app_wrapper">
                <div className="app_header">
                    <span className="logo"/>
                </div>
                <div className={this.state.collapsed ? 'app_menu_content_footer close' : 'app_menu_content_footer'}>
                    <SiderMenu collapsed={this.state.collapsed} toggleCollapsed={this.toggleCollapsed.bind(this)}/>
                    <div className="app_content_footer">
                        <div className="app_breadcrumb">
                            <Breadcrumb>
                                <Breadcrumb.Item>首页</Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <a href="/">Table</a>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>动态Table</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="app_content">
                            <Route/>
                        </div>
                        <div className="app_footer">by white.</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
