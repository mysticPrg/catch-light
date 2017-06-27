import fakeSocket, { Socket } from './fakeSocket';
import { LIGHT_CREATED } from '../actions/ActionTypes';

jest.useRealTimers();

describe('fakeSocket', () => {
	const wait = 300;
	const wait_margin = wait + 100;
	const io = fakeSocket(wait);

	it.concurrent('should be connect', () => {
		const connectCallback = jasmine.createSpy();
		const promise = new Promise(resolve => {
			io.on('connection', (...args) => {
				resolve(...args);
			});
		});

		promise.then((socket) => {
			expect(socket instanceof Socket).toBeTruthy();
		});

		return promise;
	});

	it.concurrent('should be send light created message', () => {
		const connectCallback = jasmine.createSpy();
		const promise = new Promise(resolve => {
			io.on('connection', (socket) => {
				socket.on('msg', (...args) => {
					resolve(...args);
				});
			});
		});

		promise.then((result) => {
			expect(result.type).toEqual(LIGHT_CREATED);
		});

		return promise;
	});
});
