#!/usr/bin/env node
var express = require('express');
var app = express(); //.createServer(express.logger());

console.log("iniciando la aplicacion");
var os = require('os');
var fs = require('fs');

var int  =setInterval(function(){xmlDinamico()},3000);

var string = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><medidas></medidas>"

var xmlDinamico = function(){
	var uptime = os.uptime();
	var totalmem = os.totalmem();
	var freemem = os.freemem();
	string.replace("</medidas>","<medida><uptime>"+uptime+"</uptime><totalmem>"+totalmem+"</totalmem><freemem>"+freemem+"</freemem></medida></medidas>");
}      
  



var miFuncion = function(request, response) {
  

  console.log("hemos recibido algo");
  fs.writeFileSync('prueba.xml',string);
  var cad = fs.readFileSync('prueba.xml')

  response.send(cad);
  
};

app.get('/', miFuncion);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
