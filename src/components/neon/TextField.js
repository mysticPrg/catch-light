import React, { Component } from 'react';

class TextField extends Component {
	render() {
		return (
			<div>
				<input
					type="text"
					value={this.props.children}
					placeholder={this.props.placeholder}
				/>
			</div>
		);
	}
}

TextField.defaultProps = {
	placeholder: ""
};

export default TextField;