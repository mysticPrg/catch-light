import { combineReducers } from 'redux';
import LightReducer from './LightReducer';

export default combineReducers({
	light: LightReducer
});