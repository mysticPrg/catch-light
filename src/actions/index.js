import * as types from './ActionTypes';

export const init_app = () => ({
    type: types.INIT_APP
});

export const init_app_request = () => ({
    type: types.INIT_APP_REQUEST
});

export const in_progress = () => ({
    type: types.IN_PROGRESS
});

export const end_progress = () => ({
    type: types.END_PROGRESS
});

export * from './Light';