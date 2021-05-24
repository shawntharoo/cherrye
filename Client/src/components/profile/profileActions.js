import { LOAD_PROFILE, SET_PROFILE } from './constants';
import Amplify, { API } from 'aws-amplify';

export const updateProfile = (profile) => (dispatch, getState) => {
    const data = {
        body : profile
      }
    const apiData =  API.post('cherryeAPIUsers', '/users', data);
    apiData.then(function(response){
      dispatch({
        type: SET_PROFILE,
        payload: response.body
    }) 
  })
}

export const loadProfile = (userId) => (dispatch, getState) => {
  const data = {
      body : userId
    }
  const apiData =  API.get('cherryeAPIUsers', '/users', data);
  apiData.then(function(response){
    dispatch({
      type: LOAD_PROFILE,
      payload: response.body
  }) 
})
}

