import React from 'react';
import {connect} from 'react-redux';
import {debounce} from '../../util/common.js';
import {login} from '../../api/userApi.js';

class Login extends React.Component {
    constructor (props) {
        super(props);
        this.handleSubmit = debounce(this.handleSubmit);
        this.state = {
            usercode: '',
            password: ''
        };
    }
    handleSubmit () {
        /* this.props.dispatch({type: 'SET_USER', user: {
            username: 'zhangsan',
            age: 18,
            realname: 'white',
            role: 'admin'
        }});
        this.props.history.push('/'); */
        login({
            usercode: this.state.usercode,
            password: this.state.password,
        }).then((response) => {
            console.log(response);
        });
    }
    usercodeChange (e) {
        this.setState({
            usercode: e.target.value,
        });
    }
    passwordChange (e) {
        this.setState({
            password: e.target.value,
        });
    }
    render () {
        return (
            <div>
                <div>username:<input value={this.state.usercode} onChange={this.usercodeChange.bind(this)}/></div>
                <div>password:<input type="password" value={this.state.password} onChange={this.passwordChange.bind(this)}/></div>
                <div><button onClick={this.handleSubmit.bind(this)}>login</button></div>
            </div>
        );
    }
}

export default connect()(Login);