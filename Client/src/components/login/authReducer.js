import { SIGN_IN, SIGN_UP, CODE_SEND, PASSWORD_RESET, USER_SESSION } from './constants';

export function authReducer(state = [], action) {
    switch (action.type) {
        case SIGN_IN:
            return action.payload; 
        case SIGN_UP:
            return action.payload;
        case CODE_SEND:
            return action.payload; 
        case PASSWORD_RESET:
            return action.payload;
        case USER_SESSION:{
            if(action.payload == undefined){
                return state
            }else{
                return action.payload;
            }
        }
        default:
            return state;
    }
}


