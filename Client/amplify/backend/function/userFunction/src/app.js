/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	API_CHERRYEAPI_APIID
	API_CHERRYEAPI_APINAME
	AUTH_CHERRYE5EAAE9EA_USERPOOLID
	ENV
	FUNCTION_CHERRYE5EAAE9EACUSTOMMESSAGE_NAME
	REGION
	STORAGE_CHERRYEBUCKET_BUCKETNAME
	STORAGE_USERS_ARN
	STORAGE_USERS_NAME
Amplify Params - DO NOT EDIT */

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient();

function id () {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
/**********************
 * Example get method *
 **********************/

app.get('/users', function(req, res) {
  var params = {
    TableName: process.env.STORAGE_USERS_NAME,
  };
  docClient.scan(params, function(err, data) {
    if (err) res.json({ err })
    else res.json({success: 'get cakaes call succeed!', body: data})
  })
});

app.get('/users/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/users', function(req, res) {
  var params = {
    TableName: process.env.STORAGE_USERS_NAME,
    Item: {
      userId: id(),
      givenName: req.body.givenName,
      familyName: req.body.familyName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      email: req.body.email
    }
  }
  docClient.put(params, function(err, data) {
    if (err) res.json({ err })
    else res.json({success: 'post call succeed!', url: req.url, body: data})
  })
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

// app.post('/users/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'post call succeed!', url: req.url, body: req.body})
// });

/****************************
* Example put method *
****************************/

app.put('/users', function(req, res) {
  var params = {
    TableName: process.env.STORAGE_USERS_NAME,
    Item: {
      givenName: req.body.givenName,
      familyName: req.body.familyName,
      address: req.body.address
    }
  }
  docClient.update(params, function(err, data) {
    if (err) res.json({ err })
    else res.json({success: 'put call succeed!', url: req.url, body: data})
  })
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/users/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/users', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/users/*', function(req, res) {
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
