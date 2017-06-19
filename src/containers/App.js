import React, { Component } from 'react';
import { connect } from 'react-redux';

import { init_app } from '../actions';
import Hello from '../components/Hello';

class App extends Component {
    render() {
        return (
            <div>
                <Hello onClick={this.props.onClick}/>
                {this.props.isInit ? 'init!' : 'not init...'}
            </div>
        );
    }
}

const stateToProps = state => ({
    isInit: state.isInit
});

const actionToProps = (dispatch, action) => ({
    onClick: () => dispatch(init_app())
});

export default connect(stateToProps, actionToProps)(App);