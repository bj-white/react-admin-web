import {Button, Form, Input, Modal, Space, Popconfirm} from 'antd';
import React from 'react';
import {get, add, update, del} from '../../api/roleApi.js';
import CommonTable from '../../component/CommonTable.js';

class MenuList extends React.Component {
    formRef = React.createRef();
    constructor (props) {
        super(props);
        this.state = {
            listData: {
                count: 0,
                list: [],
            },
            searchParams: {
                name: ''
            },
            current: 1,
            pageSize: 10,
            columns: [
                {
                    title: '名称',
                    dataIndex: 'name',
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
                    title: '操作',
                    render: (text, record) => (
                        <Space>
                            <Button type="link" size="small" onClick={this.updateUI.bind(this, record)}>修改</Button>
                            <Button type="link" size="small">菜单管理</Button>
							<Popconfirm
								title="确定要删除吗？"
								onConfirm={this.del.bind(this, record)}
							>
								<Button type="link" size="small">删除</Button>
							</Popconfirm>
                        </Space>
                    ),
                },
            ],
            isModalVisible: false,
        };
    }
    get () {
        get({
            page: this.state.current,
            rows: this.state.pageSize,
            name: this.state.searchParams.name,
        }).then((response) => {
            this.setState({
                listData: response.data.data
            });
        });
    }
    componentDidMount () {
        this.get();
    }
    handleModal (flag) {
        this.setState({
            isModalVisible: flag,
        });
        if (!flag) {
            this.formRef.current.resetFields();
        }
    }
    shouldComponentUpdate (nextProps, nextState) {
        return true;
    }
    handleSubmit () {
        this.formRef.current.validateFields().then((value) => {
            if (value.id) {
                update(value).then(() => {
                    this.get();
                    this.handleModal(false);
                });
            } else {
                add(value).then(() => {
                    this.get();
                    this.handleModal(false);
                });
            }
        });
    }
    updateUI (row) {
        this.handleModal(true);
        setTimeout(() => {
            this.formRef.current.setFieldsValue(row);
        }, 0);
    }
	del (row) {
        del(row.id).then(() => {
			this.get();
		});
    }
    onChange (page, pageSize) {
        this.setState({
            current: page,
            pageSize: pageSize,
        });
        setTimeout(() => {
            this.get();
        }, 0);
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
                        dataSource={this.state.listData.list}
                        columns={this.state.columns}
                        pagination={{
                            total: this.state.listData.count,
                            current: this.state.current,
                            pageSize: this.state.pageSize,
                            onChange: this.onChange.bind(this),
                        }}
                        rowKey="id"/>
                </div>
                <Modal title="角色"
                    visible={this.state.isModalVisible}
                    onOk={this.handleSubmit.bind(this)}
                    onCancel={this.handleModal.bind(this, false)}>
                    <Form
                        labelCol={{
                            span: 4
                        }}
                        ref={this.formRef}>
                        <Form.Item name="id" hidden={true}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="名称：" name="name" rules={[{ required: true, message: '请选择' }]}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>                        
            </div>
        );
    }
}

export default MenuList;