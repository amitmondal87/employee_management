import { ADD_EMPLOYEE, REMOVE_EMPLOYEE, EDIT_EMPLOYEE } from "../action-types/action.types";


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

        case EDIT_EMPLOYEE:
            const index = state.addEmployee.findIndex(user => user.email === action.payload.email); 
           // console.log(index);
            const updatedEmployee = [...state.addEmployee];
            updatedEmployee[index].name = action.payload.name;
            updatedEmployee[index].phone = action.payload.phone;
            updatedEmployee[index].address = action.payload.address;

            return {
                ...state,
                addEmployee: updatedEmployee

            };

        case REMOVE_EMPLOYEE:
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
