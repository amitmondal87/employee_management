
import {
	LOGIN,
	LOGOUT,
} from '../action-types/action.types';

import { NewRegister } from './register.action';




export const login = (payload, id, onSuccess, onError) => {
	return (dispatch, getState) => {
		const newRegister = getState().newRegister.newRegister
		if (newRegister.find(({ email }) => email === payload.email) && newRegister.find(({ password }) => password === payload.password)) {
			id = newRegister.find(({ email }) => email === payload.email).id
			dispatch({
				type: LOGIN,
				payload,
				id
			})
		}
		else {
			onError && onError({ password: "Invalid user details" });
		}
	};
};

export const logout = (payload, onSuccess, onError) => {
	return (dispatch) => {
		dispatch({
			type: LOGOUT,
			payload,
		})
	}


};