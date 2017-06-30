import React, { Component } from 'react';

class TextField extends Component {
	render() {
		return (
			<div>
				<div></div>
				
				<input type="text" value={this.props.children}/>
			</div>
		);
	}
}

export default TextField;