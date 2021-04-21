import { combineReducers } from 'redux'
import {fetchCakes} from '../components/cakes/cakeReducer';
import {addCakes} from '../components/admin/cake_admin/addCakeReducer';
import {authReducer} from '../components/login/authReducer';
import { cartReducer } from '../components/checkout/cartReducer';
import { contactReducer } from '../components/contactUs/contactReducer';

const rootReducer = combineReducers({
        cakes: fetchCakes,
        addItems: addCakes,
        authentication: authReducer,
        cart: cartReducer,
        contact: contactReducer
})

export default rootReducer;