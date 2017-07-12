import { all, takeEvery, put } from 'redux-saga/effects';
import * as types from '~/actions/ActionTypes';
import * as actions from '~/actions';

function* doRequestInvoke(action) {
	yield put(actions.in_progress());

	yield put(actions.light_invoke(action.id));
	yield put(actions.light_remove(action.id));

	yield put(actions.end_progress());
}

function* handleInvokeRequest() {
	yield takeEvery(types.LIGHT_REQUEST_INVOKE, doRequestInvoke);
}

export default function* LightSaga() {
	yield all([
		handleInvokeRequest()
	]);
};