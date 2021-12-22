import { REGISTER } from "../action-types/action.types";

const initialStates = {
    newRegister: [],

};

const newRegister = (state = initialStates, action) => {
    switch (action.type) {
        case REGISTER:

            const newUser = action.payload       
            return {
                ...state,
                newRegister: [...state.newRegister, newUser],

            };
       
        default:
            return state;
    }
};
 
export default newRegister;