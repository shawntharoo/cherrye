import { SIGN_IN, SIGN_UP, CODE_SEND, PASSWORD_RESET, USER_SESSION } from './constants';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

export const signIn = (userData) => (dispatch, getState) =>  {
    const user = Auth.signIn({
        username: userData.email,
        password: userData.password
    })
    user.then(response => {
        response.authenticated = true;
        dispatch ({
            type: SIGN_IN,
            payload: response
        })  // #1
    }, (error) => { 
        dispatch({
            type: SIGN_IN,
            payload: error
        })
     }).catch((error) => {
        dispatch({
            type: SIGN_IN,
            payload: error
        })
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
    user.then(response => {
        response.authenticated = true;
        dispatch ({
            type: SIGN_UP,
            payload: response
        })  // #1
    }, (error) => { 
        dispatch({
            type: SIGN_IN,
            payload: error
        })
     }).catch((error) => {
        dispatch({
            type: SIGN_IN,
            payload: error
        })
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
        //user.authenticated = true;
        dispatch({
            type: USER_SESSION,
            payload: user
        })
    }, (error) => { 
        dispatch({
            type: USER_SESSION,
            payload: error
        })
     }).catch((error) => {
        dispatch({
            type: USER_SESSION,
            payload: error
        })
      })

}

export const signOut = () => (dispatch, getState) => {
    try {
         Auth.signOut();
         dispatch({
            type: USER_SESSION,
            payload: true
        })
    } catch (error) {
        console.log('error signing out: ', error);
        dispatch({
            type: USER_SESSION,
            payload: false
        })
    }
}



