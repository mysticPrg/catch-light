import { all, takeEvery, put } from 'redux-saga/effects';
import * as types from '~/actions/ActionTypes';
import * as actions from '~/actions';

function* invokeRequest(action) {
	yield put(actions.in_progress());

	yield put(actions.light_invoked(action.id));
	yield put(actions.light_removed(action.id));

	yield put(actions.end_progress());
}

function* handleInvokeRequest() {
	yield takeEvery(types.LIGHT_INVOKE_REQUEST, invokeRequest);
}

export default function* LightSaga() {
	yield all([
		handleInvokeRequest()
	]);
};