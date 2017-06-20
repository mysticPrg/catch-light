import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './containers/App';
import reducer from './reducers';
import sagas from './sagas';
import registerServiceWorker from './registerServiceWorker';

const saga = createSagaMiddleware();
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(saga))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);

saga.run(sagas);

registerServiceWorker();
