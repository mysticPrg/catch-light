import {
	LIGHT_CREATED,
	LIGHT_TARGET_CHANGED,
	LIGHT_REMOVED,
	LIGHT_INVOKE_REQUEST,
	LIGHT_INVOKED
} from './ActionTypes';

export const light_created = (light) => ({
	type: LIGHT_CREATED,
	id: light.id,
	color: light.color,
	size: light.size,
	alpha: light.alpha,
	speed: light.speed,
	'target-x': light['target-x'],
	'target-y': light['target-y'],
});

export const light_target_changed = (id, x, y) => ({
	type: LIGHT_TARGET_CHANGED,
	id: id,
	'target-x': x,
	'target-y': y
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