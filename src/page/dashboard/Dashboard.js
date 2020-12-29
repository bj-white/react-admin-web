import React from 'react';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
	render () {
		return (
			<div>hello world</div>
		);
  	}
}

export default connect()(Dashboard);
