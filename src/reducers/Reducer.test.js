import myReducer from './index';
import { init_app } from '../actions';

describe('myReducer', () => {
	const initialState = {
		isInit: false
	};

	it('can be initiating', () => {
		// given
		const action = init_app();

		// when
		const result = myReducer(initialState, action);

		// then
		expect(result).toEqual({
			...initialState,
			isInit: true
		});
	});

	it('ignore unknown action', () => {
		const action = {
			type: 'UNKNOWN'
		};

		const result = myReducer(initialState, action);

		expect(result).toEqual(initialState);
	});
});