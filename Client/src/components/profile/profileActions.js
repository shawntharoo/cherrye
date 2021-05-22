import { LOAD_PROFILE } from './constants';
import Amplify, { API } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);


export const profile = (profile) => (dispatch, getState) => {
    const data = {
        body : profile
      }
    const apiData =  API.post('cherryeAPIContact', '/contact', data);
    apiData.then(function(response){
      dispatch({
        type: LOAD_PROFILE,
        payload: response.body
    }) 
  })

}

