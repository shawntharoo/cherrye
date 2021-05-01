/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_BAKEPRODUCTS_ARN
	STORAGE_BAKEPRODUCTS_NAME
	STORAGE_CHERRYEBUCKET_BUCKETNAME
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
	API_CHERRYEAPI_APIID
	API_CHERRYEAPI_APINAME
	ENV
	REGION
Amplify Params - DO NOT EDIT *//*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




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

app.post('/cakes', function(req, res) {
  var params = {
    TableName: process.env.STORAGE_BAKEPRODUCTS_NAME,
    Item: {
      id: id(),
      name: req.body.name,
      type: req.body.type,
      weight: req.body.weight,
      price: req.body.price,
      notes: req.body.notes,
      ingredients: req.body.ingredients,
      availability: req.body.availability,
      image: req.body.image
    }
  }
  docClient.put(params, function(err, data) {
    if (err) res.json({ err })
    else res.json({success: 'post call succeed!', url: req.url, body: req.body})
  })
});

//Comment section start *************************************************************************************************

// /**********************
//  * Example get method *
//  **********************/

app.get('/cakes', function(req, res) {
  var params = {
    TableName: process.env.STORAGE_BAKEPRODUCTS_NAME,
  };
  docClient.scan(params, function(err, data) {
    if (err) res.json({ err })
    else res.json({success: 'get cakaes call succeed!', body: data})
  })
});

// app.get('/cakes/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'get call succeed!', url: req.url});
// });

/****************************
* Example post method *
****************************/

// app.post('/cakes', function(req, res) {
//   // Add your code here
//   res.json({success: 'post call succeed!', url: req.url, body: req.body})
// });

// app.post('/cakes/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'post call succeed!', url: req.url, body: req.body})
// });

// /****************************
// * Example put method *
// ****************************/

// app.put('/cakes', function(req, res) {
//   // Add your code here
//   res.json({success: 'put call succeed!', url: req.url, body: req.body})
// });

// app.put('/cakes/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'put call succeed!', url: req.url, body: req.body})
// });

// /****************************
// * Example delete method *
// ****************************/

// app.delete('/cakes', function(req, res) {
//   // Add your code here
//   res.json({success: 'delete call succeed!', url: req.url});
// });

// app.delete('/cakes/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'delete call succeed!', url: req.url});
// });

//Comment section end *************************************************************************************************


app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
