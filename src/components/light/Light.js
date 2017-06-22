import React, { Component } from 'react';
import PropTypes from 'prop-types';

function getRandomNumber(min, max) {
	return min + Math.floor(Math.random() * (max-min));
}

function rangeCheck(props, propName) {
	const value = parseInt(props[propName]);

	if ( isNaN(value) ) {
		return new Error('Property value is not a number.');
	}

	if ( value < 0 || value > 1000 ) {
		throw new Error('Pos range is 0 to 1000.');
	}
}

class Light extends Component {
	constructor(props) {
		super(props);

		this.state = {
			x: getRandomNumber(props['x-min'], props['x-max']),
			y: getRandomNumber(props['y-min'], props['y-max'])
		};
	}

	render() {
		const style = {
			left: `${this.state.x}px`,
			top: `${this.state.y}px`
		}
		return (
			<div
				style={style}
				data-test="light"
			/>
		);
	}
}

Light.defaultProps = {
	'x-min': 0,
	'x-max': 0,
	'y-min': 0,
	'y-max': 0
};

Light.propTypes = {
	'x-min': rangeCheck,
	'x-max': rangeCheck,
	'y-min': rangeCheck,
	'y-max': rangeCheck
};

export default Light;