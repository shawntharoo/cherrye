import { LOAD_PROFILE, SET_PROFILE, UPDATE_PROFILE } from './constants';
import Amplify, { API } from 'aws-amplify';

export const setProfile = (profile) => (dispatch, getState) => {
    const data = {
        body : profile
      }
    const apiData =  API.post('cherryeAPIUsers', '/users', data);
    console.log(data)
    apiData.then(function(response){
      console.log(response)
      dispatch({
        type: UPDATE_PROFILE,
        payload: response.body
    }) 
  })
}

export const updateProfile = (profile) => (dispatch, getState) => {
  const data = {
      body : profile
    }
  const apiData =  API.put('cherryeAPIUsers', '/users', data);
  apiData.then(function(response){
    dispatch({
      type: SET_PROFILE,
      payload: response.body
  }) 
})
}

export const loadProfile = (userEmail) => (dispatch, getState) => {
  const myInit = { 
    queryStringParameters: { 
        email: userEmail,
    },
};
  const apiData =  API.get('cherryeAPIUsers', '/users', myInit);
  apiData.then(function(response){
    dispatch({
      type: LOAD_PROFILE,
      payload: response.body
  }) 
})
}

