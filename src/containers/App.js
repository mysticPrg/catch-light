import React, { Component } from 'react';
import { connect } from 'react-redux';

import Hello from '../components/Hello';

class App extends Component {
    render() {
        return (
            <div>
                <Hello/>
                {this.props.isInit ? 'init!' : 'not init...'}
            </div>
        );
    }
}

const stateToProps = state => ({
    isInit: state.isInit
});

export default connect(stateToProps, null)(App);