import React from 'react';
import {Space, Button, Input, Modal, Form, TreeSelect} from 'antd';
import {getMenuTree1} from '../../api/menuApi.js';
import CommonTable from '../../component/CommonTable.js';

class RoleList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            dataList: [
                /* {
                    "createtime":1609119137000,"updatetime":1609119137000,"id":2,"name":"系统管理","parent_id":0,"url":"/app/system","component":"","sort":2,"icon":"icon iconfont iconshenhe","createby":1,"state":1,
                    "children":[
                        {
                            "createtime":1609119137000,"updatetime":1609119137000,"id":3,"name":"用户管理","parent_id":2,"url":"/app/system/user","component":"UserList","sort":1,"icon":"icon iconfont iconfenlei","createby":1,"state":1,
                        },
                    ]
                } */
            ],
            columns: [
                {
                    title: '名称',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'url',
                    dataIndex: 'url',
                },
                {
                    title: '组件',
                    dataIndex: 'component',
                },
                {
                    title: 'icon',
                    dataIndex: 'icon',
                },
                {
                    title: '排序',
                    dataIndex: 'sort',
                },
                {
                    title: '创建者',
                    dataIndex: 'createby',
                },
                {
                    title: '创建时间',
                    dataIndex: 'createtime',
                },
                {
                    title: '更新时间',
                    dataIndex: 'updatetime',
                },
                {
                    title: '状态',
                    dataIndex: 'state',
                    render: state => (<span>{state == 1 ? '开启' : '关闭'}</span>)
                },
                {
                    title: '操作',
                    render: () => (
                        <Space>
                            <Button type="link" size="small">新建</Button>
                            <Button type="link" size="small">发布</Button>
                            <Button type="link" size="small">删除</Button>
                        </Space>
                    ),
                },
            ],
            isModalVisible: true,
        };
    }
    getMenuTree () {
        getMenuTree1().then((response) => {
            this.setState({
                dataList: response.data.data
            });
        });
    }
    componentDidMount () {
        this.getMenuTree();
    }
    onChange (page, pageSize) {
        console.log(page);
        console.log(pageSize);
    }
    handleModal (flag) {
        this.setState({
            isModalVisible: flag,
        });
    }
    shouldComponentUpdate (nextProps, nextState) {
        if (nextState.isModalVisible != this.state.isModalVisible) {
        }
        return true;
    }
    render () {
        return (
            <div className="admin_table">
                <div className="table_search">
                    <div className="search_item">
                        <div className="item_l">名称：</div>
                        <div className="item_r"><Input placeholder="请输入名称"/></div>
                    </div>
                    <div className="search_item">
                        <div className="item_l"></div>
                        <div className="item_r btn">
                            <Button type="primary">查询</Button>
                            <Button type="primary">重置</Button>
                        </div>
                    </div>
                </div>
                <div className="table_wrapper">
                    <div className="table_header">
                        <ul>
                            <li>
                                <Button type="primary" onClick={this.handleModal.bind(this, true)}>新建</Button>
                            </li>
                        </ul>
                    </div>
                    <CommonTable
                        dataSource={this.state.dataList}
                        columns={this.state.columns}
                        pagination={{
                            total: 22,
                            defaultCurrent: 1,
                            onChange: this.onChange.bind(this),
                        }}
                        expandable={{defaultExpandAllRows: true}}
                        rowKey="id"/>
                </div>
                <Modal title="菜单"
                    visible={this.state.isModalVisible}
                    onOk={this.handleModal.bind(this, false)}
                    onCancel={this.handleModal.bind(this, false)}>
                    <Form
                        labelCol={{
                            span: 4
                        }}>
                        <Form.Item label="名称：" name="name" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="父菜单：" name="parent_id" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <TreeSelect
                                value={1}
                                treeData={this.state.dataList}
                                treeDataSimpleMode={{
                                    title: "name",
                                    pId: "parent_id",
                                }}
                                treeDefaultExpandAll/>
                        </Form.Item>
                        <Form.Item label="url：" name="url" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="组件：" name="component" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="icon：" name="icon" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="排序：" name="sort" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="状态：" name="state" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>                        
            </div>
        );
    }
}

export default RoleList;