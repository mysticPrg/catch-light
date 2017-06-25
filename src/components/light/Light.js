import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getRandomNumber } from '~/utils/common';
import { combineChecker, rangeCheck, compareWithOtherProps } from '~/utils/propTypeChecker';

const rangeCheck0to1000 = rangeCheck(0, 1000);
const compareWithMax = (min, max) => {
	if ( min >= max ) {
		return new Error('Min is greater than max.');
	}
};
const compareCheckerForXmin = combineChecker(rangeCheck0to1000, compareWithOtherProps('x-max', compareWithMax));
const compareCheckerForYmin = combineChecker(rangeCheck0to1000, compareWithOtherProps('y-max', compareWithMax));

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
	'x-max': 1,
	'y-min': 0,
	'y-max': 1
};

Light.propTypes = {
	'x-min': compareCheckerForXmin,
	'x-max': rangeCheck0to1000,
	'y-min': compareCheckerForYmin,
	'y-max': rangeCheck0to1000
};

export default Light;