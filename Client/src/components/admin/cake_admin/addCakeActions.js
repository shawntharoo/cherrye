import { ADD_CAKE, DELETE_CAKE, UPDATE_CAKE, UPLOAD_IMAGE } from './constants';
import Amplify, { API } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import S3 from "react-aws-s3";
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

export function uploadItemImage(file){
    /***** s3 bucket upload code */
    const config = {
      bucketName: "cherryebucket194627-dev",
      region: "us-west-2",
      accessKeyId: "AKIA3INV6YLLN6BHWW7E",
      secretAccessKey: "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"
  }
  const ReactS3Client = new S3(config);
  const upload_data = ReactS3Client.uploadFile(file, file.filename);
  return {
    type: UPLOAD_IMAGE,
    payload: upload_data
  }
}

export function addCake(cake) {
  const data = {
    body : cake
  }
  const apiData = API.post('cherryeAPI', '/cakes', data);
  return {
    type: ADD_CAKE,
    payload: apiData
  }

}