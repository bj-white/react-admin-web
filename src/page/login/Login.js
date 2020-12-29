import React from 'react';
import {connect} from 'react-redux';
import {debounce} from '../../util/common.js';

class Login extends React.Component {
    constructor (props) {
        super(props);
        this.handleSubmit = debounce(this.handleSubmit);
    }
    handleSubmit () {
        this.props.dispatch({type: 'SET_USER', user: {
            username: 'zhangsan',
            age: 18,
            realname: 'white',
            role: 'admin'
        }});
        this.props.history.push('/');
    }
    render () {
        return (
            <div>
                <div>username:<input/></div>
                <div>password:<input type="password"/></div>
                <div><button onClick={this.handleSubmit.bind(this)}>login</button></div>
            </div>
        );
    }
}

export default connect()(Login);