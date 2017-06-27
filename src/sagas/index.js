import { all } from 'redux-saga/effects';

import LightSaga from './LightSaga';

export default function* rootSaga() {
    yield all([
        LightSaga()
    ]);
};