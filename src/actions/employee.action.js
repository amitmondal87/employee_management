import { ADD_EMPLOYEE, REMOVE_EMPLOYEE, EDIT_EMPLOYEE } from "../action-types/action.types";
import { toast } from "react-toastify";

export const addEmployee = (payload, onSuccess, onError) => {
    return (dispatch, getState) => {
        const registerUser = getState().addEmployee.addEmployee
        const userExist = registerUser.some(({ email }) => email === payload.email) || registerUser.some(({ phone }) => phone === payload.phone)
        if (!userExist) {
            dispatch({
                type: ADD_EMPLOYEE,
                payload
            });
            toast.success("You have successfully Added");
            document.getElementById("addNewEmployeeForm").reset()
        }
        else if (registerUser.some(({ phone }) => phone === payload.phone)){
            toast.warn("Phone no is already exist !");
            onError && onError({ phone: "Phone no is already exist !",});
        }  
        
        else {
            toast.warn("Email Id is already exist !");
            onError && onError({ email: "Email Id is already exist ! ",
         });
        }
    };
};


export const editEmployee = (payload, onSuccess, onError) => {
    return (dispatch, getState) => {
        const editregisterUser = getState().addEmployee.addEmployee
        const userExist = editregisterUser.some(({ email }) => email === payload.email)
        if (userExist) {
            dispatch({
                type: EDIT_EMPLOYEE,
                payload
            })
            toast.success("Data successfully updated.");

        }
       
        else {
            toast.warn("You Can't change your email");
            onError && onError({ 
                email: "You Can't change your email" ,
            });
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