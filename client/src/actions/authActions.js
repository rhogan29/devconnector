import { TEST_DISPATCH } from './types';

// Register User
export const registerUser = (userData) => {
    return {
        // Always have a type property
        type: TEST_DISPATCH,
        payload: userData
    }
}