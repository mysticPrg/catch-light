import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getRandomNumber } from '~/utils/common';
import { rangeCheck } from '~/utils/propTypeChecker';

const rangeCheck0to1000 = rangeCheck(0, 1000);

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
	'x-min': rangeCheck0to1000,
	'x-max': rangeCheck0to1000,
	'y-min': rangeCheck0to1000,
	'y-max': rangeCheck0to1000
};

export default Light;