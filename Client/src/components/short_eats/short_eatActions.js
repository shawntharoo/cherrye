import { DELETE_SE, UPDATE_SE, FETCH_SE } from './constants';
import Amplify, { API } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

export function deleteShorteat(shorteatId) {
    return {
        type: DELETE_SE,
        payload: shorteatId
    }
}

export function updateShroteat(shorteat) {
    return {
        type: UPDATE_SE,
        payload: shorteat
    }
}

export function fetchShorteat() {
      return {
        type: FETCH_SE,
        payload: ''
    }  // #1
}

