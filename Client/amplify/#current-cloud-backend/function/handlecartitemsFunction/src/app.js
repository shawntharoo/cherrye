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
  AUTH_CHERRYEA402D001_USERPOOLID
  ENV
  REGION
  STORAGE_BAKEPRODUCTS_ARN
  STORAGE_BAKEPRODUCTS_NAME
  STORAGE_CARTITEMS_ARN
  STORAGE_CARTITEMS_NAME
  STORAGE_CHERRYESTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient();

var items = [];

function id() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**********************
 * Example get method *
 **********************/

app.get('/item', function (req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

app.get('/item/*', function (req, res) {
  const query = req.query;
  var params = {
    TableName: process.env.STORAGE_BAKEPRODUCTS_NAME,
    FilterExpression: 'username = :username',
    ExpressionAttributeValues: {
      ":username": query.username
    }
  };
  docClient.scan(params, onScan);
  // Add your code here

});

function onScan(err, data) {
  if (err) {
    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    // print all the movies
    console.log("Scan succeeded.");
    data.Items.forEach(function (item) {
      items.push(item);
      console.log(item);
    });
    // continue scanning if we have more movies, because
    // scan can retrieve a maximum of 1MB of data
    if (typeof data.LastEvaluatedKey != "undefined") {
      console.log("Scanning for more...");
      params.ExclusiveStartKey = data.LastEvaluatedKey;
      docClient.scan(params, onScan);
    } else {
      res.json({ success: 'get call succeed!', data: items });
      items = [];
    }
  }
}

/****************************
* Example post method *
****************************/

app.post('/item', function (req, res) {
  var params = {
    TableName: process.env.STORAGE_CARTITEMS_NAME,
    Item: {
      cartid: id(),
      productid: req.body.productid,
      username: req.body.username,
      itemcount: req.body.itemcount
    }
  }
  docClient.put(params, function (err, data) {
    if (err) res.json({ err })
    else res.json({ success: 'post call succeed!', url: req.url, body: req.body })
  })
  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

app.post('/item/*', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

/****************************
* Example put method *
****************************/

app.put('/item', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

app.put('/item/*', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

/****************************
* Example delete method *
****************************/

app.delete('/item', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/item/*', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
