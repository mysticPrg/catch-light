import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import LightContainer from './containers/LightContainer';
import LightModel from './models/LightModel';
import reducer from './reducers';
import { light_create } from './actions/Light';
import sagas from './sagas';
import fakeSocket from './utils/fakeSocket';

import registerServiceWorker from './registerServiceWorker';

import './index.css';

const saga = createSagaMiddleware();
const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(saga))
);

const io = fakeSocket(300);
io.on('connection', socket => {
	//TODO: init client (set width/height, render, ...)

	socket.on('msg', action => {
		store.dispatch(action);
	});
});

const addLight = () => {
	let newLight = new LightModel();
	newLight.toRandomize();

	store.dispatch(light_create(newLight));
};

ReactDOM.render(
	<Provider store={store}>
		<div>
			<LightContainer/>
			<button onClick={addLight}>Add new light!</button>
		</div>
	</Provider>
	, document.getElementById('root')
);

saga.run(sagas);
registerServiceWorker();
