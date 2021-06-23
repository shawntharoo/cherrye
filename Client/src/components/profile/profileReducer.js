import { LOAD_PROFILE, SET_PROFILE, UPDATE_PROFILE } from './constants';

export function profileReducer(state = [], action) {
    switch (action.type) {
        case SET_PROFILE:
            return action.payload;
        case LOAD_PROFILE:
            if(action.payload == undefined){
                return state
            }else{
                return action.payload;
            }
        case UPDATE_PROFILE:
            return action.payload;
        default:
            return state;
    }
}

