import { ADD_CAKE, UPLOAD_IMAGE } from './constants';

export function addCakes(state = [], action) {
    switch (action.type) {
        case ADD_CAKE:
            return action.payload;
        case UPLOAD_IMAGE:
            return action.payload;
        default:
            return state;
    }
}


