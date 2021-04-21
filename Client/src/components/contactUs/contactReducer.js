import { CONTACT_US } from './constants';

export function contactReducer(state = [], action) {
    switch (action.type) {
        case CONTACT_US:
            return action.payload;
        default:
            return state;
    }
}

