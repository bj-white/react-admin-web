import React from 'react';
import {
    Button, Space, Popconfirm, Modal, Form, Input, Select
} from 'antd';
import CommonTable from '../../component/CommonTable.js';
import {
    get, add, update, del
} from '../../api/baseApi.js';

export default class UserList extends React.Component {
    constructor (props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            listData: {
                count: 0,
                list: [],
            },
            current: 1,
            pageSize: 10,
            columns: [
                {
                    title: '用户名',
                    dataIndex: 'usercode',
                },
                {
                    title: '姓名',
                    dataIndex: 'username',
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
                },
                {
                    title: '操作',
                    render: (text, record) => (
                        <Space>
                            <Button type="link" size="small" onClick={this.updateUI.bind(this, record)}>修改</Button>
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
            roleList: null
        };
    }

    componentDidMount () {
        this.get();
    }

    async handleModal (flag) {
        this.setState({
            isModalVisible: flag,
        });
        if (!flag) {
            this.formRef.current.resetFields();
        } else {
            await this.getRoleList();
        }
    }

    handleSubmit () {
        this.formRef.current.validateFields().then((value) => {
            value.roles = [];
            value.rids.forEach((id) => {
                value.roles.push({
                    id,
                });
            });
            value.qsOption = {
                arrayFormat: 'indices',
                allowDots: true
            };
            if (value.id) {
                update(value, 'user').then(() => {
                    this.get();
                    this.handleModal(false);
                });
                /* $.ajax({
                    url: '/api/user/update.do',
                    type: 'post',
                    data: value,
                    success: function () {

                    }
                }); */
            } else {
                add(value, 'user').then(() => {
                    this.get();
                    this.handleModal(false);
                });
            }
        });
    }

    onChange (page, pageSize) {
        this.setState({
            current: page,
            pageSize,
        });
        setTimeout(() => {
            this.get();
        }, 0);
    }

    getRoleList () {
        if (!this.state.roleList) {
            get({
                page: this.state.current,
                rows: this.state.pageSize,
            }, 'role').then((response) => {
                this.setState({
                    roleList: response.data.data.list
                });
            });
        }
    }

    get () {
        get({
            page: this.state.current,
            rows: this.state.pageSize,
        }, 'user').then((response) => {
            this.setState({
                listData: response.data.data
            });
        });
    }

    del (row) {
        del(row.id, 'user').then(() => {
			this.get();
		});
    }

    updateUI (row) {
        this.handleModal(true);
        const arr = [];
        row.roles.forEach((item) => {
            arr.push(item.id);
        });
        row.rids = arr;
        setTimeout(() => {
            this.formRef.current.setFieldsValue(row);
        }, 0);
    }

    render () {
        return (
            <div className="admin_table">
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
                        rowKey="id"
                    />
                </div>
                <Modal
                    title="用户"
                    visible={this.state.isModalVisible}
                    onOk={this.handleSubmit.bind(this)}
                    onCancel={this.handleModal.bind(this, false)}
                >
                    <Form
                        labelCol={{
                            span: 4
                        }}
                        initialValues={{ password: '', password1: '', rids: [] }}
                        ref={this.formRef}
                    >
                        <Form.Item name="id" hidden>
                            <Input />
                        </Form.Item>
                        <Form.Item label="用户名：" name="usercode" rules={[{ required: true, message: '请选择' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="姓名：" name="username" rules={[{ required: true, message: '请选择' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="密码："
                            name="password"
                            type="password"
                            rules={[
                                {
                                    validator: (_, value) => {
                                        const obj = this.formRef.current.getFieldsValue();
                                        if (!obj.id) {
                                            if (!value) {
                                                return Promise.reject(new Error('密码不能为空'));
                                            }
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="确认密码："
                            name="password1"
                            type="password"
                            rules={[
                                {
                                    validator: (_, value) => {
                                        const obj = this.formRef.current.getFieldsValue();
                                        if (!obj.id) {
                                            if (!value) {
                                                return Promise.reject(new Error('密码不能为空'));
                                            }
                                        }
                                        // eslint-disable-next-line
                                        if (obj.password != value) {
                                            return Promise.reject(new Error('密码不一致'));
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item label="角色：" name="rids" rules={[{ required: true, message: '请选择' }]}>
                            <Select mode="multiple" allowClear>
                                {
                                    this.state.roleList && this.state.roleList.map((role) => <Select.Option value={role.id} key={role.id}>{role.name}</Select.Option>)
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="状态：" name="state" rules={[{ required: true, message: '请选择' }]}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}
