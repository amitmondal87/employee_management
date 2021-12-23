
import {
	LOGIN,
	LOGOUT,
} from '../action-types/action.types';
import { toast } from "react-toastify";
import { NewRegister } from './register.action';
var bcrypt = require('bcryptjs');


export const login = (payload, id, name, onSuccess, onError) => {
	return (dispatch, getState) => {
		const newRegister = getState().newRegister.newRegister
		
		const newRegisterPassword = newRegister.find(user => user.email === payload.email).password
		const comparePassword = bcrypt.compareSync(payload.password, newRegisterPassword);

		if (newRegister && newRegister.find(({ email }) => email === payload.email) && comparePassword) {
			id = newRegister.find(({ email }) => email === payload.email).id
			name = newRegister.find(({ email }) => email === payload.email).name
			dispatch({
				type: LOGIN,
				payload,
				id,
				name
			});
			toast.success("You have successfully Signing in");
		}
		else {
			toast.warn("Invalid user details");
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