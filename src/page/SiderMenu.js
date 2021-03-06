import React from 'react';
import { Menu } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import getMenuTree from '../store/action/menuAction.js';

const renderTree = (menus) => menus.map((item) => {
	if (item.children && item.children.length) {
		return (
			<Menu.SubMenu key={item.url} icon={<span className="anticon"><i className={item.icon}/></span>} title={item.name}>
				{renderTree(item.children)}
			</Menu.SubMenu>
		);
    }
    return (
        <Menu.Item key={item.url} icon={<span className="anticon"><i className={item.icon}/></span>}>
            <Link to={(item.route || item.url) + (item.query || '')}>
                {item.name}
            </Link>
        </Menu.Item>
    );
});

class SiderBar extends React.Component {
    constructor (props) {
        super(props);
        const { pathname } = props.location;
        this.state = {
            selectedKey: pathname,
            openKey: [pathname.substr(0, pathname.lastIndexOf('/'))],
        };
    }

    componentDidMount () {
        this.props.dispatch(getMenuTree());
    }

    menuClick (e) {
        this.setState({
            selectedKey: e.key,
        });
    }

    openMenu (v) {
        this.setState({
            openKey: v,
        });
    }

    /* shouldComponentUpdate (nextProps, nextState) {
        console.log(nextState.openKey);
        return true;
    } */

    render () {
        return (
            <div className="app_menu">
                <div className="app_menu_top">
                    <Menu
                        onClick={this.menuClick.bind(this)}
                        mode="inline"
                        theme="dark"
                        selectedKeys={[this.state.selectedKey]}
                        openKeys={this.state.openKey}
                        onOpenChange={this.openMenu.bind(this)}
                        inlineCollapsed={this.props.collapsed}
                    >
                        {/*
                            this.props.menus.map((item) => (
                                item.children
                                    ? renderSubMenu(item)
                                    : renderMenuItem(item)
                            ))
                        */}
						{renderTree(this.props.menus)}
                    </Menu>
                </div>
                <div className="app_menu_bottom" onClick={this.props.toggleCollapsed}>
                    <i className={this.props.collapsed ? 'icon iconfont iconzhankai1 collapsed' : 'icon iconfont iconzhankai1'}/>
                </div>
            </div>
        );
    }
}

export default withRouter(connect((state) => ({
    menus: state.menuReducer,
}))(SiderBar));
