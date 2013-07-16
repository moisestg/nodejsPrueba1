#!/usr/bin/env node
var express = require('express');
var app = express(); //.createServer(express.logger());

console.log("iniciando la aplicacion");
var os = require('os');

//var int  =setInterval(function(){xmlDinamico()},3000);

fs.appendFileSync('prueba.xml',"<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><usuarios><usuario><apellido>Antúnez</apellido><login>ana</login><nombre>Ana</nombre><pais><capital>Washington D.C.</capital><iso>USA</iso><moneda>Dolar</moneda><nombre>Estados Unidos de América</nombre></pais><password>a</password></usuario><usuario><apellido>Domínguez</apellido><login>david</login><nombre>David</nombre><pais><capital>Beijing</capital><iso>CHN</iso><moneda>Yuan chino</moneda><nombre>China</nombre></pais><password>d</password></usuario><usuario><apellido>Jiménez</apellido><login>juan</login><nombre>Juan</nombre><pais><capital>Londres</capital><iso>GBR</iso><moneda>Libra esterlina</moneda><nombre>Reino Unido</nombre></pais><password>j</password></usuario><usuario><apellido>Martínez</apellido><login>marta</login><nombre>Marta</nombre><pais><capital>Madrid</capital><iso>ES</iso><moneda>Euro</moneda><nombre>España</nombre></pais><password>m</password></usuario><usuario><apellido>Torres</apellido><login>moi</login><nombre>Moisés</nombre></usuario><usuario><apellido>Pérez</apellido><login>pedro</login><nombre>Pedro</nombre><pais><capital>Madrid</capital><iso>ES</iso><moneda>Euro</moneda><nombre>España</nombre></pais><password>p</password></usuario></usuarios>");

//var xmlDinamico = function(){
	
//}      
  



var miFuncion = function(request, response) {
  var fs = require('fs');

  console.log("hemos recibido algo");
  var cad = fs.readFileSync('prueba.xml','utf8')

  response.send(cad);
  
};

app.get('/', miFuncion);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
