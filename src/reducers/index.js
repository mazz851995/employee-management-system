import { combineReducers } from 'redux';
import employeeReducer from './employeeReducer';
import leaveReducer from './leaveReducer';

const rootReducer = combineReducers({
    employeeReducer, leaveReducer
});

export default rootReducer