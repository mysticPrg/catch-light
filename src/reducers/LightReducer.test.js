import LightReducer from './LightReducer';
import LightModel from '../models/LightModel';
import {
	light_created,
	light_target_changed,
	light_removed,
	light_invoked
} from '../actions';
import { 
	getRandomNumber
} from '../utils/common';

describe('LightReducer', () => {
	let existLight = null;
	let initialState = null;

	beforeAll(() => {
		existLight = new LightModel();
		existLight.toRandomize();

		initialState = {
			lights: new Map([
				[existLight.id, existLight]
			])
		};
	});

	it('light_created', () => {
		const light = new LightModel();
		light.toRandomize();

		const action = light_created(light);

		const nextState = LightReducer(initialState, action);
		expect(nextState.lights.get(light.id)).toEqual(light);
	});

	it('light_target_changed', () => {
		const id = existLight.id;
		const x = getRandomNumber(0, 500);
		const y = getRandomNumber(0, 500);

		const action = light_target_changed(id, x, y);

		const nextState = LightReducer(initialState, action);
		const changedLight = nextState.lights.get(id);

		expect(changedLight['target-x']).toEqual(x);
		expect(changedLight['target-y']).toEqual(y);
	});

	it('light_removed', () => {
		const id = existLight.id;

		const action = light_removed(id);
		const nextState = LightReducer(initialState, action);

		expect(nextState.lights.has(id)).toBeFalsy();
	});

	it('light_invoked', () => {
		const id = existLight.id;

		const action = light_invoked(id);
		const nextState = LightReducer(initialState, action);
		const changedLight = nextState.lights.get(id);

		expect(changedLight.invoked).toBeTruthy();
	});
});