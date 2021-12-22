import { ADD_EMPLOYEE, REMOVE_EMPLOYEE } from "../action-types/action.types";


export const addEmployee = (payload, onSuccess, onError) => {
    return (dispatch, getState) => {
        const registerUser = getState().addEmployee.addEmployee
        const userExist = registerUser.some(({ email }) => email == payload.email)
        if (!userExist) {
            dispatch({
                type: ADD_EMPLOYEE,
                payload
            })
        }
        else {
            onError && onError({ email: "Email Id is already exist. Please use an another email ID " });
        }
    };
};

export const removeEmployee = (userEmail) => {
    return (dispatch) => {
        dispatch({
            type: REMOVE_EMPLOYEE,
            payload: {
                email: userEmail
            }
        });
    }
}