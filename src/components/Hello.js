import React, { Component } from 'react';

class Hello extends Component {
	constructor(props) {
		super(props);
		
		this.onClick = this.onClick.bind(this);
	}
	
	render() {
		return (
			<div>
				<p>Hello Catch-Light!</p>
				<button onClick={this.onClick}>click me!</button>
			</div>
		);
	}
	
	onClick() {
		this.props.onClick();
	}
}

export default Hello;
