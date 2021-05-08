import { FETCH_SE } from './constants';

export function fetchShortEats(state = [], action) {
    switch (action.type) {
        case FETCH_SE:
            return action.payload;
        default:
            return state;
    }
}


