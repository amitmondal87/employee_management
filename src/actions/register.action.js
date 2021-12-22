import { REGISTER } from "../action-types/action.types";


export const NewRegister = (payload, onSuccess, onError) => {

    return (dispatch, getState) => {
        const newRegister = getState().newRegister.newRegister
        const userExist = newRegister.some(({ email }) => email == payload.email)
        if (!userExist) {
            dispatch({
                type: REGISTER,
                payload
            });

        } else {
            onError && onError({ email: "Email Id is already exist. Please use an another email ID " });
        }
    }
}


