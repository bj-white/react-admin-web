import React from 'react';
import {
    message,
    Form,
    Input,
    Button
} from 'antd';
import { connect } from 'react-redux';
import Cookie from 'js-cookie';
import { debounce } from '../../util/common.js';
import { login } from '../../api/userApi.js';
import './login.less';

class Login extends React.Component {
    constructor (props) {
        super(props);
        this.handleSubmit = debounce(this.handleSubmit);
        this.formRef = React.createRef();
    }

    handleSubmit () {
        console.log('start');
        this.formRef.current.validateFields().then((value) => {
            console.log(value);
            login(value).then((response) => {
                console.log(response);
                if (response.data.status === 1) {
                    Cookie.set('token', response.data.data);
                    this.props.history.push('/');
                } else {
                    message.error(response.data.msg);
                }
            });
        });
    }

    render () {
        return (
            <div className="login_wrapper">
                <div className="login_model">
                    <Form ref={this.formRef}>
                        <Form.Item
                            label=""
                            name="usercode"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label=""
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>登 录</Button>
                        </Form.Item>
                    </Form>
                    {/* <div>username:<input value={this.state.usercode} onChange={this.usercodeChange.bind(this)}/></div>
                    <div>password:<input type="password" value={this.state.password} onChange={this.passwordChange.bind(this)}/></div>
                    <div><button onClick={this.handleSubmit.bind(this)}>login</button></div> */}
                </div>
            </div>
        );
    }
}

export default connect()(Login);
