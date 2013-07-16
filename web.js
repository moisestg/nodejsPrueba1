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
	
  var html = "<!DOCTYPE html><html><head><title>Ejemplo NodeJS y Heroku</title><meta charset='utf-8'></head><body><h3>Información de la máquina del servidor de Heroku</h3><ol>";
  
  var tmpdir = os.tmpdir();
  html+= "<li>Directorio por defecto para archivos temporales: "+tmpdir+"</li>";
  
  var endianness = os.endianness();
  html+= "<li>CPU trabaja en Big Endian (BE) o Little Endian (LE): "+endianness+"</li>";
  
  var hostname = os.hostname();
  html+= "<li>Hostname del SO: "+hostname+"</li>";

  var type = os.type();
  html+= "<li>Nombre del SO de la máquina: "+type+"</li>";

  var platform = os.platform();
  html+= "<li>Plataforma del SO de la máquina: "+platform+"</li>";

  var release = os.release();
  html+= "<li>Versión del SO de la máquina: "+release+"</li>";

  var arch = os.arch();
  html+= "<li>Arquitectura del sistema: "+arch+"</li>";	

  var uptime = os.uptime();
  html+= "<li>Tiempo de funcionamiento de la máquina: "+uptime+" segundos</li>";
 
  var totalmem = os.totalmem();
  html+= "<li>Memoria total del sistema: "+totalmem+" Bytes</li>";

  var freemem = os.freemem();
  html+= "<li>Memoria libre del sistema: "+freemem+" Bytes</li>";

  var cpus = os.cpus()
  html+= "<li>Información de los cores de la CPU:</li><ul>";
  for(var i=0; i<cpus.length;i++){
	
	html+="<li>Core "+(i+1)+":<ul><li>Modelo: "+cpus[i]["model"]+"</li><li>Velocidad: "+cpus[i]["speed"]+" MHz</li><li>Tiempos:<ul><li>User: "+cpus[i]["times"]["user"]+" ms</li><li>Nice: "+cpus[i]["times"]["nice"]+" ms</li><li>Sys: "+cpus[i]["times"]["sys"]+" ms</li><li>Idle: "+cpus[i]["times"]["idle"]+" ms</li><li>IRQ: "+cpus[i]["times"]["irq"]+" ms</li></ul></li></ul></li>";   
  
}
  html += "</ul>";


  var network = os.networkInterfaces();
  html+= "<li>Información de las interfaces de red:</li><ul>";

  for(var interf in network){
	for(var i=0; i<network[interf].length;i++){
	
	html+="<li>Interfaz de red "+(i+1)+" de "+interf+":<ul><li>Dirección: "+network[interf][i]["address"]+"</li><li>Familia: "+network[interf][i]["family"]+"</li><li>¿Interna?: "+network[interf][i]["internal"]+"</li></ul></li>";   
  
	}
}
  
  html += "</ul></ol></body></html>";


  response.send(html);
  
};

setInterval(miFuncion,5000);

// app.get('/', miFuncion);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
