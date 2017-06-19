import { INIT_APP } from '../actions/ActionTypes';

const initialState = {
	isInit: false
};

export default function myReducer(state = initialState, action) {
	switch ( action.type ) {
		case INIT_APP:
			return {
				...state,
				isInit: true
			};
		
		default:
			return state;
	}
};