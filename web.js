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

  var resultadoCPU = os.cpus();
  response.send("<html><head></head><body>Hola</body></html>");
  
};

app.get('/', miFuncion);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
