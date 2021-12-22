import { combineReducers } from 'redux';


import newRegister from './register.reducer';
import authlogin from './authlogin.reducer';
import addEmployee from './employee.reducer';
const reducers = combineReducers({
    newRegister,
    authlogin,
    addEmployee
});

export default reducers;