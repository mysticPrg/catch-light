import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import LightContainer from './containers/LightContainer';
import LightModel from './models/LightModel';
import reducer from './reducers';
import { light_created } from './actions/Light';

import sagas from './sagas';
import registerServiceWorker from './registerServiceWorker';

const saga = createSagaMiddleware();
const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(saga))
);

const addLight = () => {
	let newLight = new LightModel();
	newLight.toRandomize();

	store.dispatch(light_created(newLight));
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
