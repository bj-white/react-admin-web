import { combineReducers } from 'redux'
import dashboardReducer from './dashboardReducer.js';
import menuReducer from './menuReducer.js';
import authReducer from './authReducer.js';

export default combineReducers({
	dashboardReducer,
	menuReducer,
	authReducer,
});
