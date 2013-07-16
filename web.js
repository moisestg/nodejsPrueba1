#!/usr/bin/env node
var express = require('express');
var app = express(); //.createServer(express.logger());

console.log("iniciando la aplicacion");
var os = require('os');
var fs = require('fs');

var int=setInterval(function(){clock()},3000);
fs.writeFile('prueba.html',"");

var clock = function(){
  var pagina = "<html><head></head><body>hoola pío</body></html>";	
  fs.appendFile('prueba.html',pagina);	
     
}
  







var miFuncion = function(request, response) {

  console.log("hemos recibido algo");
  var cad = fs.readFile('prueba.html','utf8')

  response.send(cad);
  
};

app.get('/', miFuncion);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
