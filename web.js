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
	var cpus = os.cpus();
	var cpuString = "<cputimes>";
	for(var i=0; i<cpus.length;i++){
	
	cpuString += "<user>"+cpus[i]["times"]["user"]+"</user><nice>"+cpus[i]["times"]["nice"]+"</nice><sys>"+cpus[i]["times"]["sys"]+"</sys><idle>"+cpus[i]["times"]["idle"]+"</idle><irq>"+cpus[i]["times"]["irq"]+"</irq>";   
  
}
	cpuString += "</cputimes>";	

	var stringNew = string.replace("</medidas>","<medida><uptime>"+uptime+"</uptime><totalmem>"+totalmem+"</totalmem><freemem>"+freemem+"</freemem>"+cpuString+"</medida></medidas>");
	
	string=stringNew;
	fs.writeFileSync('prueba.xml',stringNew);
}      




var miFuncion = function(request, response) {
  

  console.log("hemos recibido algo");

  //Si quito 2º parámetro (encoding) al entrar en la web me deja descargar el xml perfect y si pongo  utf-8 no sale el texto como xml

  var cad = fs.readFileSync('prueba.xml');

  response.send(cad);
  
};

app.get('/', miFuncion);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
