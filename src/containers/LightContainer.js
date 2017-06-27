import React, { Component } from 'react';
import LightSpace from '../components/light/LightSpace';
import { connect } from 'react-redux';
import { light_invoke_request } from '../actions/Light';

class LightContainer extends Component {
	render() {
		const arr = Array.from(this.props.lights.values());

		return (
			<div>
				<LightSpace
					lights={arr}
					width="500"
					height="500"
					onLightClick={this.props.onLightClick}
				/>
			</div>
		);
	}
}

const stateToProps = state => ({
    lights: state.light.lights
});

const actionToProps = (dispatch, action) => ({
    onLightClick: (key) => dispatch(light_invoke_request(key))
});

export default connect(stateToProps, actionToProps)(LightContainer);
