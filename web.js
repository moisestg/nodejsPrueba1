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

//A continuación recuperamos la info que nos proporciona la api "os" y la incorporamos a un html
	var resultadoCPU = os.cpus();
  var html = "<html><head><title>Ejemplo NodeJS y Heroku</title><meta charset='utf-8'></head><body><h3>Información de las máquinas del servidor de Heroku</h3></body></html>";
  html+= resultadoCPU;

  
  response.send(html);
  
};

app.get('/', miFuncion);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
