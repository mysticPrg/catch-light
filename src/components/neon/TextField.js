import React, { Component } from 'react';

import './Neon.css';
import './TextField.css';

class TextField extends Component {
	constructor(props) {
		super(props);
		
		const style = this.props.style;
		style.width = style.width === 0 ? 0 : style.width || '300px';
	}

	render() {
		return (
			<div className="TextField" style={this.props.style}>
				<label className="TextField__label">
					{this.props.placeholder}
				</label>
				<input
					className="TextField__input"
					type="text"
					value={this.props.children}
				/>
			</div>
		);
	}
}

TextField.defaultProps = {
	placeholder: "",
	style: {},
};

export default TextField;