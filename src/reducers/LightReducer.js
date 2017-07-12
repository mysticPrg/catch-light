import {
	LIGHT_CREATE,
	LIGHT_TARGET_CHANGE,
	LIGHT_REMOVE,
	LIGHT_INVOKE
} from '~/actions/ActionTypes';
import { clone } from '~/utils/common';
import LightModel from '~/models/LightModel';

const initialState = {
	lights: new Map()
};

export default function LightReducer(state = initialState, action) {

	const lights = state.lights;

	switch ( action.type ) {
		case LIGHT_CREATE: {
			let newLight = new LightModel({
				...action.light,
				target_x: action.light['target-x'],
				target_y: action.light['target-y'],
			});
			const newLights = clone(lights);
			newLights.set(newLight.id, newLight);

			return {
				...state,
				lights: newLights
			};
		}

		case LIGHT_TARGET_CHANGE: {
			if ( !lights.has(action.id) ) {
				return state;
			}
			const nextLights = clone(lights);
			const nextLight = nextLights.get(action.id);

			nextLight['target-x'] = action.x;
			nextLight['target-y'] = action.y;

			return {
				...state,
				lights: nextLights
			};
		}

		case LIGHT_REMOVE: {
			if ( !lights.has(action.id) ) {
				return state;
			}
			const nextLights = clone(lights);
			nextLights.delete(action.id);

			return {
				...state,
				lights: nextLights
			};
		}

		case LIGHT_INVOKE: {
			if ( !lights.has(action.id) ) {
				return state;
			}
			const nextLights = clone(lights);
			const nextLight = nextLights.get(action.id);

			nextLight.invoked = true;

			return {
				...state,
				lights: nextLights
			};
		}

		default:
			return state;
	}
};