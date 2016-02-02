
var http = require('http');
var path = require('path');
var url = require('url'); 
var request = require('request');
var mongo = require('mongodb').MongoClient;
var _ = require('lodash'); 
 

var express = require('express'); 
var app = express(); 
require('dotenv').load();

mongo.connect(process.env.MONGO_URI, function(err, db){
  if (err) console.log(err);
  var collection = db.collection('history'); 
  
  app.use('/client', express.static(process.cwd() + '/client')); 

  app.get('/', function(req, res){
        res.sendfile(process.cwd() + '/client/index.html'); 
    });
  
  app.get('/search/:q', function(req, res){
      
      var url = 'http://api.pixplorer.co.uk/image?word=';
      var query = req.params.q; 
      var searchUrl = url + query + '&amount=10';
      var picData; 
      
      request(searchUrl, function(err, response, body){
        if (!err || response.statusCode === 200) {
          res.send(JSON.parse(body));
        }
      });
      
      collection.insert({
        'search': query,
        'timestamp': new Date().toISOString()
      }, function(err, docs){
        if (err) console.log(err);
      });
    });
    
    app.get('/history', function(req, res){
      collection.find({})
                .limit(10)
                .toArray(function(err, docs){
                  if (err) console.log(err); 
                  res.send(docs);
                });
    });
  var port = process.env.PORT || 8080; 
  app.listen(port, function(){
    console.log('Node.js listening on port... ' + port); 
  });
  
});


