import {Button, Form, Input, Modal, Space, TreeSelect, Popconfirm, message} from 'antd';
import React from 'react';
import {connect} from 'react-redux';
import {add, update, del} from '../../api/menuApi.js';
import CommonTable from '../../component/CommonTable.js';
import {getMenuTree} from '../../store/action/menuAction.js';

const renderTree = (data) => data.map((item) => {
    if (item.children) {
        return (
            <TreeSelect.TreeNode value={item.id} title={item.name} key={item.id}>
                {renderTree(item.children)}
            </TreeSelect.TreeNode>
        );
    } else {
        return (<TreeSelect.TreeNode value={item.id} title={item.name} key={item.id}/>);
    }
});

class MenuList extends React.Component {
    formRef = React.createRef();
    constructor (props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: '名称',
                    dataIndex: 'name',
                    width: '500px'
                },
                {
                    title: 'url',
                    dataIndex: 'url',
                    width: '500px'
                },
                {
                    title: '组件',
                    dataIndex: 'component',
                    width: '500px'
                },
                {
                    title: 'icon',
                    dataIndex: 'icon',
                    width: '500px'
                },
                {
                    title: '排序',
                    dataIndex: 'sort',
                    width: '500px'
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
        };
    }
    get () {
        this.props.dispatch(getMenuTree());
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
            console.log(value);
            if (value.id == value.parent_id) {
                return;
            }
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
        console.log(row);
        if (row.children && row.children.length) {
            message.error('请先删除子菜单');
            return;
        }
        del(row.id).then(() => {
			this.get();
		});
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
                        dataSource={this.props.menus}
                        columns={this.state.columns}
                        pagination={false}
                        expandable={{defaultExpandAllRows: true}}
                        rowKey="id"/>
                </div>
                <Modal title="菜单"
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
                        <Form.Item label="父菜单：" name="parent_id" rules={[
                            { required: true, message: '请选择' },
                            {validator: (_, value) => {
                                let id = this.formRef.current.getFieldsValue().id;
                                if (id && id === value) {
                                    return Promise.reject('子父菜单不能相同');
                                }
                                return Promise.resolve();
                            }}]}>
                            <TreeSelect
                                allowClear
                                treeDefaultExpandAll>
                                {renderTree([{id: 0, name: '一级菜单', children: this.props.menus}])}
                            </TreeSelect>
                        </Form.Item>
                        <Form.Item label="url：" name="url" rules={[{ required: true, message: '请选择' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="组件：" name="component" rules={[{ required: true, message: '请选择' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="icon：" name="icon" rules={[{ required: true, message: '请选择' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="排序：" name="sort" rules={[{ required: true, message: '请选择' }]}>
                            <Input />
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

export default connect((state) => ({
    menus: state.menuReducer,
}))(MenuList);