#!/usr/bin/env node
var express = require('express');
var app = express(); //.createServer(express.logger());

console.log("iniciando la aplicacion");
var os = require('os');
var fs = require('fs');

//var int  =setInterval(function(){xmlDinamico()},3000);

fs.appendFileSync('prueba.xml',"<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><autor><nombre>Moisés</nombre></autor>");

//var xmlDinamico = function(){
	
//}      
  



var miFuncion = function(request, response) {
  

  console.log("hemos recibido algo");
  var cad = fs.readFileSync('prueba.xml','utf8')

  response.send(cad);
  
};

app.get('/', miFuncion);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
