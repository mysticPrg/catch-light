import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Light from './Light';

class LightSpace extends Component {
	constructor(props) {
		super(props);

		this.onLightClick = this.onLightClick.bind(this);
	}

	onLightClick(key) {
		this.props.onLightClick(key);
	}
	
	render() {
		const style = {
			width: `${this.props.width}px`,
			height: `${this.props.height}px`
		};

		const lights = this.props.lights.map((data) => {
			return (
				<Light
					key={data.id}
					id={data.id}
					color={data.color}
					size={data.size}
					alpha={data.alpha}
					target-x={data['target-x']}
					target-y={data['target-y']}
					x-max={this.props.width}
					y-max={this.props.height}
					data-test="light"
					onClick={this.onLightClick}
				/>
			);
		});

		return (
			<div
				className="LightSpace"
				data-test="space"
				style={style}
			>
				{lights}
			</div>
		);
	}
}

LightSpace.defaultProps = {
	width: 100,
	height: 100,
	lights: [],
	onLightClick: () => {}
};

// LightSpace.propTypes = {
// 	count: PropTypes.number
// };

export default LightSpace;