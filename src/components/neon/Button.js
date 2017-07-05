import React, { Component } from 'react';

import './Button.css';

class Button extends Component {
	render() {
		return (
			<button 
				className="Button"
				style={this.props.style}
			>
				{this.props.children}
			</button>
		);
	}
}

Button.defaultProps = {
	children: '',
	style: {}
};

export default Button;