import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FlyLight extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const lights = [];
        for ( let c=0 ; c<this.props.count ; c++ ) {
            lights.push(<div className="light" data-test="light"/>);
        }
        
        return (
            <div className="FlyLight">
                {lights}
            </div>
        );
    }
}

FlyLight.defaultProps = {
    count: 0
};

FlyLight.propTypes = {
    count: PropTypes.number
};

export default FlyLight;