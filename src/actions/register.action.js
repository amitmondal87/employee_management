import { REGISTER } from "../action-types/action.types";
import { toast } from "react-toastify";

export const NewRegister = (payload, onSuccess, onError) => {

    return (dispatch, getState) => {
        const newRegister = getState().newRegister.newRegister
        const userExist = newRegister.some(({ email }) => email === payload.email)
        if (!userExist) {
            dispatch({
                type: REGISTER,
                payload
            });
            toast.success("You have successfully register. Please go to login page");
            onSuccess && onSuccess({ success: `You have successfully register. Please go to login page` })
        } else {
            
            toast.warn("Email Id is already exist. Please use an another email ID ");
            onError && onError({ email: "Email Id is already exist. Please use an another email ID " });
        }
    }
}


