import { LOGIN, LOGOUT } from '../action-types/action.types';

const initialStates = {
	isloggedin: false,
	email: '',
	id: '',
	errorMsg: '',
};

const authlogin = (state = initialStates, action) => {
	switch (action.type) {
		case LOGIN:
			console.log(action.payload)
			return {
				...state,
				isloggedin: true,
				email: action.payload.email,
				id: action.id
			};
		case LOGOUT:
			return {
				state: undefined,
			};
		default:
			return state;
	}
};

export default authlogin;
