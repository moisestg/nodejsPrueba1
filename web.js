#!/usr/bin/env node
var express = require('express');
var app = express(); //.createServer(express.logger());

console.log("iniciando la aplicacion");
var os = require('os');
console.log(os.tmpdir());
var miFuncion = function(request, response) {
  var fs = require('fs');

  console.log("hemos recibido algo");
//  var cad = fs.readFileSync('index.html','utf8');
  response.send("hola mundo");
};

app.get('/', miFuncion);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
