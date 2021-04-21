import { CONTACT_US } from './constants';
import Amplify, { API } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);


export const addContact = (contact) => (dispatch, getState) => {
    const data = {
        body : contact
      }
    const apiData =  API.post('cherryeAPIContact', '/contact', data);
    apiData.then(function(response){
        console.log(response);
      dispatch({
        type: CONTACT_US,
        payload: response.body
    }) 
  })

}

