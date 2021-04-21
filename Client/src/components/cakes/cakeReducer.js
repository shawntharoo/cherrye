import { FETCH_CAKE } from './constants';

export function fetchCakes(state = [], action) {
    switch (action.type) {
        case FETCH_CAKE:
            return action.payload;
        default:
            return state;
    }
}


