import { FETCH_CART } from './constants';

export function cartReducer(state = [], action) {
    switch (action.type) {
        case FETCH_CART:
            return action.payload;
        default:
            return state;
    }
}

