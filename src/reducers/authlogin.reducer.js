import { LOGIN, LOGOUT } from '../action-types/action.types';

const initialStates = {
	isloggedin: false,
	email: '',
	id: '',
	name: '',
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
				id: action.id,
				name: action.name
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
