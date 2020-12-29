import React from 'react';
import {Table, Space, Button} from 'antd';
import {getMenuTree1} from '../../api/menuApi.js';

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
                            <Button type="link" size="small">修改</Button>
                            <Button type="link" size="small">发布</Button>
                            <Button type="link" size="small">删除</Button>
                        </Space>
                    ),
                },
            ],
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
    render () {
        return (
            <div>
                {this.state.dataList.length ? <Table
                    dataSource={this.state.dataList}
                    columns={this.state.columns}
                    size="middle"
                    bordered
                    pagination={{
                        total: 22,
                        defaultCurrent: 1,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total) => (`共${total}条`),
                        onChange: this.onChange.bind(this),
                    }}
                    rowKey="id"/> : ''}
            </div>
        );
    }
}

export default RoleList;