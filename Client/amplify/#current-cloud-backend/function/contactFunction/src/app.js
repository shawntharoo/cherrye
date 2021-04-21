/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	API_CHERRYEAPICONTACT_APIID
	API_CHERRYEAPICONTACT_APINAME
	API_CHERRYEAPI_APIID
	API_CHERRYEAPI_APINAME
	AUTH_CHERRYEA402D001_USERPOOLID
	ENV
	FUNCTION_CHERRYEA402D001CUSTOMMESSAGE_NAME
	FUNCTION_CHERRYEA402D001POSTCONFIRMATION_NAME
	FUNCTION_CONTACTFUNCTION_NAME
	REGION
	STORAGE_CHERRYESTORAGE_BUCKETNAME
	STORAGE_CONTACT_ARN
	STORAGE_CONTACT_NAME
Amplify Params - DO NOT EDIT */

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

function id () {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**********************
 * Example get method *
 **********************/

app.get('/contact', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/contact/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/contact', function(req, res) {
  var params = {
    TableName: process.env.STORAGE_CONTACT_NAME,
    Item: {
      contactid: id(),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      tnumber: req.body.tnumber,
      message: req.body.message
    }
  }
  docClient.put(params, function(err, data) {
    if (err) res.json({ err })
    else res.json({success: 'post call succeed!', url: req.url, body: req.body})
  })
});

app.post('/contact/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/contact', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/contact/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/contact', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/contact/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
