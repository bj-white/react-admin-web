import React from 'react';
import './CommonLoading.less';

export default class CommonLoading extends React.Component {
    render () {
        return (
            <div className="common_loading">
                <div className="item item1"/>
                <div className="item item2"/>
                <div className="item item3"/>
                <div className="item item4"/>
            </div>
        );
    }
}
