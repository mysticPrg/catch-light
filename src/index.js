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

ReactDOM.render(
	<Provider store={store}>
		<LightContainer/>
	</Provider>
	, document.getElementById('root')
);

for ( let i=0 ; i<10 ; i++ ) {
	let newLight = new LightModel();
	newLight.toRandomize();

	store.dispatch(light_created(newLight));
}

saga.run(sagas);
registerServiceWorker();
