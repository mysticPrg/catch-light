import { initApp } from './index';
import { in_progress, init_app, end_progress } from '../actions';
import { put, call } from 'redux-saga/effects';
import FakeServer from '../utils/fakeServer';

describe.skip('initApp saga', () => {
	it('can be initiating between in_progress and end_progress', () => {
		const iter = initApp();

		expect(iter.next().value).toEqual(put(in_progress()));
		expect(iter.next().value).toEqual(call(FakeServer.init_request));

		const check = FakeServer.init_request();

		expect(iter.next(check).value).toEqual(put(init_app()));
		expect(iter.next().value).toEqual(put(end_progress()));

		expect(iter.next().done).toBeTruthy();
	});
});