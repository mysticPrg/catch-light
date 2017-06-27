import {
	LIGHT_CREATED,
	LIGHT_TARGET_CHANGED,
	LIGHT_REMOVED,
	LIGHT_INVOKE_REQUEST,
	LIGHT_INVOKED
} from './ActionTypes';

export const light_created = (light) => ({
	type: LIGHT_CREATED,
	light: {
		...light,
		invoked: false
	}
});

export const light_target_changed = (id, x, y) => ({
	type: LIGHT_TARGET_CHANGED,
	id: id,
	x: x,
	y: y
});

export const light_removed = (id) => ({
	type: LIGHT_REMOVED,
	id: id
});

export const light_invoke_request = (id) => ({
	type: LIGHT_INVOKE_REQUEST,
	id: id
});

export const light_invoked = (id) => ({
	type: LIGHT_INVOKED,
	id: id
});