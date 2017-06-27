import { all, call, takeEvery, put } from 'redux-saga/effects';
import * as types from '../actions/ActionTypes';
import * as action from '../actions';

function* invokeRequest() {
	yield put(action.in_progress());

	yield put(action.light_invoked());

	yield put(action.end_progress());
}

function* handleInvokeRequest() {
	yield takeEvery(types.LIGHT_INVOKE_REQUEST, invokeRequest);
}

export default function* LightSaga() {
	yield all([
		handleInvokeRequest()
	]);
};