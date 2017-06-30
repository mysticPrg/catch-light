import React, { Component } from 'react';

import './Neon.css';
import './TextField.css';

class TextField extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			focus: false
		};
		
		const style = this.props.style;
		style.width = style.width === 0 ? 0 : style.width || '300px';

		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onFocus() {
		this.setState({
			focus: true
		});
	}

	onBlur() {
		this.setState({
			focus: false
		});
	}

	onChange(e) {
		const value = e.target.value;
		this.setState({
			value: e.target.value
		});
	}

	render() {
		return (
			<div className="TextField" style={this.props.style}>
				<label
					className={`TextField__label ${this.state.value ? 'TextField__label-hide' : ''}`}
				>
					{this.props.placeholder}
				</label>
				<input
					className={`TextField__input ${this.state.focus ? 'TextField__input-focus' : ''}`}
					type="text"
					value={this.props.children}
					onFocus={this.onFocus}
					onBlur={this.onBlur}
					onChange={this.onChange}
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