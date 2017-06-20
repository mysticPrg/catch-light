import { all, call, takeLatest, put } from 'redux-saga/effects';
import * as types from '../actions/ActionTypes';
import * as action from '../actions';

import FakeServer from '../utils/fakeServer';

function* initApp() {
    yield put(action.in_progress());
    
    const result = yield call(FakeServer.init_request);
    if ( result ) {
        yield put(action.init_app());
    }
    
    yield put(action.end_progress());
}

function* handleInitAppReq() {
    yield takeLatest(types.INIT_APP_REQUEST, initApp);
}

export default function* rootSaga() {
    yield all([
        handleInitAppReq()
    ]);
}