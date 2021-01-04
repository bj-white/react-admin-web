import {Button, Form, Input, Modal, Space, Popconfirm, Tree} from 'antd';
import React from 'react';
import {connect} from 'react-redux';
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
                            <Button type="link" size="small" onClick={this.menuModel.bind(this, true)}>菜单管理</Button>
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
            menuVisible: true,
            treeData: [
                {
                  title: 'parent 1',
                  key: '0-0',
                  children: [
                    {
                      title: 'parent 1-0',
                      key: '0-0-0',
                      children: [
                        {
                          title: 'leaf',
                          key: '0-0-0-0',
                        },
                        {
                          title: 'leaf',
                          key: '0-0-0-1',
                        },
                      ],
                    },
                    {
                      title: 'parent 1-1',
                      key: '0-0-1',
                      children: [
                          { title: 'sss', key: '0-0-1-0' }],
                    },
                  ],
                },
              ]
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
    handleChange (e) {
        this.setState({
            searchParams: {
                name: e.target.value,
            }
        });
    }
    menuModel (flag) {
        this.setState({
            menuVisible: flag,
        });
    }
    render () {
        return (
            <div className="admin_table">
                <div className="table_search">
                    <div className="search_item">
                        <div className="item_l">名称：</div>
                        <div className="item_r"><Input value={this.state.searchParams.name} onChange={this.handleChange.bind(this)} placeholder="请输入名称"/></div>
                    </div>
                    <div className="search_item">
                        <div className="item_l"></div>
                        <div className="item_r btn">
                            <Button type="primary" onClick={this.get.bind(this)}>查询</Button>
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
                <Modal title="菜单"
                    visible={this.state.menuVisible}
                    onOk={this.handleSubmit.bind(this)}
                    onCancel={this.menuModel.bind(this, false)}>
                    <Tree
                        treeData={this.props.menus}
                        checkable={true}
                        defaultExpandAll={true}
                        checkStrictly={true}
                    />
                </Modal>                        
            </div>
        );
    }
}

export default connect((state) => ({
    menus: state.menuReducer,
}))(MenuList);