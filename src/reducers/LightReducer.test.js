import LightReducer from './LightReducer';
import {
	light_created,
	light_target_changed,
	light_removed,
	light_invoke_request,
	light_invoked
} from '../actions';
import { 
	getRandomNumber,
	getFakeKey,
	getRandomColor,
	clone
} from '../utils/common';

describe('LightReducer', () => {
	const existLight = {
		id: getFakeKey(),
		color: getRandomColor(),
		size: getRandomNumber(10, 50),
		alpha: Math.random(),
		speed: Math.random(),
		'target-x': getRandomNumber(0, 500),
		'target-y': getRandomNumber(0, 500)
	};

	const initialState = {
		lights: new Map([
			[existLight.id, existLight]
		])
	};

	it('light_created', () => {
		const light = {
			id: getFakeKey(),
			color: getRandomColor(),
			size: getRandomNumber(10, 50),
			alpha: Math.random(),
			speed: Math.random(),
			'target-x': getRandomNumber(0, 500),
			'target-y': getRandomNumber(0, 500)
		};

		const action = light_created({
			id: light.id,
			color: light.color,
			size: light.size,
			alpha: light.alpha,
			speed: light.speed,
			'target-x': light['target-x'],
			'target-y': light['target-y'],
		});

		const nextState = LightReducer(initialState, action);
		expect(nextState.lights.get(light.id)).toEqual(light);
	});

	it('light_target_changed', () => {
		const id = existLight.id;
		const x = getRandomNumber(0, 500);
		const y = getRandomNumber(0, 500);

		const action = light_target_changed(id, x, y);

		const nextState = LightReducer(initialState, action);

		expect()
	});

	it('light_removed', () => {
		
	});

	it('light_invoke_request', () => {
		
	});

	it('light_invoked', () => {
		
	});
});