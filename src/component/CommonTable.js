import React from 'react';
import {Table} from 'antd';

const renderTable = (props) => (
    <Table
        key={Math.random()}
        {...props}
        bordered
        pagination={props.pagination ? {
            ...props.pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => (`共${total}条`),
        } : false}
        size="middle"/>
);

export default class CommonTable extends React.Component {
    render () {
        return (
            <div>
                {this.props.dataSource.length ? renderTable(this.props) : renderTable(this.props)}
            </div>
        );
    }
}