import React from 'react';
import {getMenuTree1} from '../../api/menuApi.js';

class RoleList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            dataList: []
        };
    }
    componentDidMount () {
        getMenuTree1().then((response) => {
            this.setState({
                dataList: response.data.data,
            });
        });
    }
    render () {
        return (
            <div>hell</div>
        );
    }
}

export default RoleList;