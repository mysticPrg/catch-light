import React, { Component } from 'react';

import './Neon.css';
import './TextField.css';

/*
	ToDo 
	0. Create and extends Neon component (for common props like color)
	1. use mainColor, subColor,
	2. use rem (for flexible UI)
*/

class TextField extends Component {
	constructor(props) {
		super(props);

		let value = '';
		if ( props.children ) {
			value = props.children;
		}

		this.state = {
			value,
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
		this.props.onFocus(this);
	}

	onBlur() {
		this.setState({
			focus: false
		});
		this.props.onBlur(this);
	}

	onChange(e) {
		const value = e.target.value;
		this.setState({ value });
		this.props.onChange(value);
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
					value={this.state.value}
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
	onFocus: () => {},
	onBlur: () => {},
	onChange: () => {}
};

export default TextField;