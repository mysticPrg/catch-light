import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import { getRandomNumber } from '~/utils/common';
// import { combineChecker, rangeCheck, compareWithOtherProps } from '~/utils/propTypeChecker';
import { getRandomNumber } from '../../utils/common';
import { combineChecker, rangeCheck, compareWithOtherProps } from '../../utils/propTypeChecker';

const rangeCheck0to1000 = rangeCheck(0, 1000);
let count = 0;
const compareWithMax = (min, max, component) => {
	if ( min > max ) {
		return new Error(`${component}: Min(${min}) is greater than max(${max}).`);
	}
};
const compareCheckerForXmin = combineChecker(rangeCheck0to1000, compareWithOtherProps('x-max', compareWithMax));
const compareCheckerForYmin = combineChecker(rangeCheck0to1000, compareWithOtherProps('y-max', compareWithMax));

class Light extends Component {
	constructor(props) {
		super(props);

		this.state = {
			x: getRandomNumber(props['x-min'], props['x-max']),
			y: getRandomNumber(props['y-min'], props['y-max']),
			alpha: 0
		};

		this.onClick = this.onClick.bind(this);
		this.alphaAddFactor = 1.0 / (this.props.fps - 0.01);
		this.speed = 0.15 * this.props.speed;
	}

	componentDidMount() {
		this.intervalKey = setInterval(() => {
			this.animate();
			this.props.onAnimate();
		}, 1000/this.props.fps);
	}

	componentWillUnmount() {
		clearInterval(this.intervalKey);
	}
	
	animate() {
		const x = this.state.x;
		const y = this.state.y;
		const next = {
			alpha: this.state.alpha + this.alphaAddFactor,
			x: x + this.speed * (this.props['target-x'] - x),
			y: y + this.speed * (this.props['target-y'] - y)
		};

		if ( next.alpha > this.props.alpha ) {
			next.alpha = this.props.alpha;
		}
		
		this.setState({
			alpha: next.alpha,
			x: parseFloat(next.x.toFixed(3)),
			y: parseFloat(next.y.toFixed(3))
		});
	}

	onClick() {
		this.props.onClick(this.props.id);
	}

	render() {
		this.speed = 0.15 * this.props.speed;
		const style = {
			position: 'absolute',
			left: `${this.state.x}px`,
			top: `${this.state.y}px`,
			backgroundColor: this.props.color,
			width: `${this.props.size}px`,
			height: `${this.props.size}px`,
			opacity: this.state.alpha,
			borderRadius: '50%',
			cursor: 'pointer'
		};

		return (
			<div
				style={style}
				data-test="light"
				onClick={this.onClick}
			/>
		);
	}
}

Light.defaultProps = {
	'x-min': 0,
	'x-max': 1,
	'y-min': 0,
	'y-max': 1,

	color: '#FFFFFF',
	size: 10,
	alpha: 1.0,
	fps: 30,
	speed: 1.0,
	
	'target-x': 0,
	'target-y': 0,
	
	onAnimate: () => {},
	onClick: () => {},

	id: undefined
};

Light.propTypes = {
	'x-min': compareCheckerForXmin,
	'x-max': rangeCheck0to1000,
	'y-min': compareCheckerForYmin,
	'y-max': rangeCheck0to1000
};

export default Light;