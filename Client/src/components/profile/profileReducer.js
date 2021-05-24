import { LOAD_PROFILE, SET_PROFILE } from './constants';

export function profileReducer(state = [], action) {
    switch (action.type) {
        case SET_PROFILE:
            return action.payload;
            case LOAD_PROFILE:
            return action.payload;
            case SET_PROFILE:
            return action.payload;
        default:
            return state;
    }
}

