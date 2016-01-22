
var http = require('http');
var path = require('path');
var url = require('url');   

var express = require('express'); 
var app = express(); 



var port = process.env.PORT || 8080; 
app.listen(port, function(){
  console.log('Node.js listening on port... ' + port); 
});
