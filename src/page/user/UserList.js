import React from 'react';
import {Form, Input, Button, Select} from 'antd';

export default class UserList extends React.Component {
    render () {
        return (
            <div>
                <div>
                    <Form
                        layout="inline"
                        initialValues={{ layout: "inline" }}>
                        <Form.Item label="用户名：">
                            <Input/>
                        </Form.Item>
                        <Form.Item label="状态：">
                            <Select style={{width: '177px'}}>
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">Submit</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}