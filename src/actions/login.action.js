
import {
	LOGIN,
	LOGOUT,
} from '../action-types/action.types';
import { toast } from "react-toastify";
import { NewRegister } from './register.action';




export const login = (payload, id, name, onSuccess, onError) => {
	return (dispatch, getState) => {
		const newRegister = getState().newRegister.newRegister
		if (newRegister.find(({ email }) => email === payload.email) && newRegister.find(({ password }) => password === payload.password)) {
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