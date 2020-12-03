import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

class RoleList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            layout: {
                labelCol: {
                    flex: '100px',
                },
                /* wrapperCol: {
                    span: 16,
                }, */
            },
            tailLayout: {
                wrapperCol: { offset: 8, span: 16 },
            },
            initialValues: {
                username: 'hello',
                password: '123456',
                remember: true,
            }
        };
    }
    onFinish (values) {
        console.log('Success:', values);
    }
    
    onFinishFailed (errorInfo) {
        console.log('Failed:', errorInfo);
    }
    handleClick () {
        console.log(this.state.initialValues);
    }
    render () {
        return (
            <div>
                <Form
                    {...this.state.layout}
                    initialValues={this.state.initialValues}
                    colon={false}
                    /* onFinish={this.onFinish.bind(this)}
                    onFinishFailed={this.onFinishFailed.bind(this)} */>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item label=" " name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item label=" ">
                        <Button type="primary" htmlType="submit" onClick={this.handleClick.bind(this)}>Submit</Button>
                    </Form.Item>
                    </Form>
            </div>
        );
    }
}

export default RoleList;