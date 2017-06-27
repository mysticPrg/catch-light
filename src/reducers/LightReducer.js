import {
	LIGHT_CREATED,
	LIGHT_TARGET_CHANGED,
	LIGHT_REMOVED,
	LIGHT_INVOKE_REQUEST,
	LIGHT_INVOKED
} from '../actions/ActionTypes';

const initialState = {
	lights: []
};

export default function LightReducer(state = initialState, action) {

	const lights = state.lights;

	switch ( action.type ) {
		case LIGHT_CREATED: {
			let newLight = {
				id: action.id,
				color: action.color,
				size: action.size,
				alpha: action.alpha,
				speed: action.speed,
				'target-x': action['target-x'],
				'target-y': action['target-y'],
			};
			const newLights = lights.slice(0, lights.length);
			newLights.push(newLight);

			return {
				...state,
				lights: newLights
			};
		}

		default:
			return state;
	}
};