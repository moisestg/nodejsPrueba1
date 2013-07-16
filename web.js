#!/usr/bin/env node
var express = require('express');
var app = express(); //.createServer(express.logger());

console.log("iniciando la aplicacion");
var os = require('os');

var int=setInterval(function(){clock()},3000);

var html = "<!DOCTYPE html><html><head><title>Ejemplo NodeJS y Heroku</title><meta charset='utf-8'></head><body><h3>Información de la máquina del servidor de Heroku</h3><ol>";

var clock = function(){
	
	var tmpdir = os.tmpdir();
	html += "<li>"+tmpdir+"</li>"; 
}

html+="</ol></body></html>"





var miFuncion = function(request, response) {
  response.send(html);
  
};

app.get('/', miFuncion);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
