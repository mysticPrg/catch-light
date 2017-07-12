import {
	LIGHT_CREATE,
	LIGHT_TARGET_CHANGE,
	LIGHT_REMOVE,
	LIGHT_INVOKE,
	LIGHT_REQUEST_INVOKE
} from './ActionTypes';

export const light_create = (light) => ({
	type: LIGHT_CREATE,
	light: {
		...light,
		invoked: false
	}
});

export const light_target_change = (id, x, y) => ({
	type: LIGHT_TARGET_CHANGE,
	id: id,
	x: x,
	y: y
});

export const light_remove = (id) => ({
	type: LIGHT_REMOVE,
	id: id
});

export const light_invoke = (id) => ({
	type: LIGHT_INVOKE,
	id: id
});

export const light_request_invoke = (id) => ({
	type: LIGHT_REQUEST_INVOKE,
	id: id
});
