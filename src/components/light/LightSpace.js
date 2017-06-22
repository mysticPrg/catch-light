import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LightSpace extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		const lights = [];
		for ( let c=0 ; c<this.props.count ; c++ ) {
			lights.push(<div key={c.toString()} className="light" data-test="light"/>);
		}
		
		return (
			<div className="LightSpace">
				{lights}
			</div>
		);
	}
}

LightSpace.defaultProps = {
	count: 0
};

LightSpace.propTypes = {
	count: PropTypes.number
};

export default LightSpace;