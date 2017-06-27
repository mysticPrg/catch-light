import * as types from './ActionTypes';

export const in_progress = () => ({
	type: types.IN_PROGRESS
});

export const end_progress = () => ({
	type: types.END_PROGRESS
});

export * from './Light';