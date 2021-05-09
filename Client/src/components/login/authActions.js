import { SIGN_IN, SIGN_UP, CODE_SEND, PASSWORD_RESET, USER_SESSION } from './constants';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

export const signIn = (userData) => (dispatch, getState) =>  {
    const user = Auth.signIn({
        username: userData.email,
        password: userData.password
    })
    user.then(function(response){
        response.authenticated = true;
        dispatch ({
            type: SIGN_IN,
            payload: response
        })  // #1
    })
}

export const signUp = (userData) => (dispatch, getState) =>  {
    const user = Auth.signUp({
        username: userData.email,
        password: userData.password,
        attributes: {
            phone_number: userData.tnumber,
            family_name: userData.lastName,          // optional
            given_name: userData.firstName, 
            address: userData.address  
            // optional - E.164 number convention
            // other custom attributes 
        }
    })
    user.then(function(response){
        response.authenticated = true;
        console.log(response)
        dispatch ({
            type: SIGN_UP,
            payload: response
        })  // #1
    })
}

export function forgotPasswordCode(credentials) {
     Auth.forgotPassword(credentials.email)
    return {
        type: CODE_SEND,
        payload: credentials
    }
}

export function newPasswordSubmit(credentials) {
     Auth.forgotPasswordSubmit(
        credentials.email,
        credentials.code,
        credentials.password
    );
    return {
        type: PASSWORD_RESET,
        payload: credentials
    }
}

export const currentUserSession = () => (dispatch, getState) => {
    Auth.currentAuthenticatedUser().then(user => {
        console.log(user)
        //user.authenticated = true;
        dispatch({
            type: USER_SESSION,
            payload: user
        })
    }, (error) => { 
        console.log("lets see whats going to happen 1"+error)
     }).catch((error) => {
        console.log("lets see whats going to happen 2"+error)
      })

}

export const signOut = () => (dispatch, getState) => {
    try {
         Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}



