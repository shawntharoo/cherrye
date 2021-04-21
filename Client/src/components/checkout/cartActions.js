import { ADD_ITEM, DELETE_ITEM, UPDATE_CART, FETCH_CART } from './constants';
import Amplify, { API } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

export function deleteCartItem(cartId) {
    return {
        type: DELETE_ITEM,
        payload: cartId
    }
}

export function updateCartItem(item) {
    return {
        type: UPDATE_CART,
        payload: item
    }
}

export const fetchCartItems = (username) => (dispatch, getState) => {
    const apiData =  API.get('cherryeAPICart', '/item', {
        'queryStringParameters': {
          'username': username
        }
      });
    apiData.then(function(response){
        console.log(response);
      dispatch({
        type: FETCH_CART,
        payload: response.body.Items
    }) 
  })

}

