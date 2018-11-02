import { TEST_DISPATCH } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case TEST_DISPATCH:
            return {
                ...state,
                // below fills the "user" object above, 
                //with the payload from the actions payload
                user: action.payload
            }

        default:
            return state;
    }
}