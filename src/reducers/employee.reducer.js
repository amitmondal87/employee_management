import { ADD_EMPLOYEE, REMOVE_EMPLOYEE } from "../action-types/action.types";


const initialStates = {
    addEmployee: []
};

const addEmployee = (state = initialStates, action) => {
    switch (action.type) {
        case ADD_EMPLOYEE:
            const newUser = action.payload
            return {
                ...state,
                addEmployee: [...state.addEmployee, newUser]
            };
        case REMOVE_EMPLOYEE:
            // console.log(action.payload.email)
            const removeEmployee = action.payload.email
            console.log(removeEmployee)

            return {
                ...state,
                addEmployee: state.addEmployee.filter(user => user.email !== removeEmployee),
            };
        default:
            return state;
    }
};

export default addEmployee;
