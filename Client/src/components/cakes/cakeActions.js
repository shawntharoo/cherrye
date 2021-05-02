import { ADD_CAKE, DELETE_CAKE, UPDATE_CAKE, FETCH_CAKE } from './constants';
import Amplify, { API } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

export function deleteCake(cakeId) {
    return {
        type: DELETE_CAKE,
        payload: cakeId
    }
}

export function updateCake(cake) {
    return {
        type: UPDATE_CAKE,
        payload: cake
    }
}

export const fetchCake = () => (dispatch, getState) => {
    const apiData =  API.get('cherryeAPI', '/cakes');
    apiData.then(function(response){
      dispatch({
        type: FETCH_CAKE,
        payload: response.body.Items
    })  // #1
  })

    //const stateAfter = getState()
}

