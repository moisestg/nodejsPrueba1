#!/usr/bin/env node
var express = require('express');
var app = express(); //.createServer(express.logger());
var fs = require('fs');

var os = require('os');

	var d = new Date();

	var uptime = os.uptime();
	var totalmem = os.totalmem();
	var freemem = os.freemem();
	var cpus = os.cpus();
	var cpuString = "<cputimes>";
//XML


var cpuString2 = "<cputimes>";
	
	for(var i=0; i<cpus.length;i++){
	
	cpuString2 += "<user>"+cpus[i]["times"]["user"]+"</user><nice>"+cpus[i]["times"]["nice"]+"</nice><sys>"+cpus[i]["times"]["sys"]+"</sys><idle>"+cpus[i]["times"]["idle"]+"</idle><irq>"+cpus[i]["times"]["irq"]+"</irq>";   
  
}
cpuString2 += "</cputimes>";
var string = "<?xml version=\"1.0\" standalone=\"yes\"?><medidas><medida><time>"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+"</time><uptime>"+uptime+"</uptime><totalmem>"+totalmem+"</totalmem><freemem>"+freemem+"</freemem>"+cpuString2+"</medida></medidas>";
//JSON
var antjson="{\"medidas\":[{\"Freememory\":"+freemem+",\"TotalMemory\":"+totalmem+",\"uptime\":"+uptime+",\"cputimes\":{";

for(var i=0;i<cpus.length;i++){
if(i===cpus.length-1){
antjson+="\"user\":"+cpus[i]["times"]["user"]+",\"nice\":"+cpus[i]["times"]["nice"]+",\"sys\":"+cpus[i]["times"]["sys"]+",\"idle\":"+cpus[i]["times"]["idle"]+",\"irq\":"+cpus[i]["times"]["irq"];
}else{   
antjson+="\"user\":"+cpus[i]["times"]["user"]+",\"nice\":"+cpus[i]["times"]["nice"]+",\"sys\":"+cpus[i]["times"]["sys"]+",\"idle\":"+cpus[i]["times"]["idle"]+",\"irq\":"+cpus[i]["times"]["irq"]+",";
}
};
antjson+="}}]}"
var json="";
console.log("iniciando la aplicacion");

var int=setInterval(function(){json_xml_var()},1000);
function json_xml_var(){
	var uptime2 = os.uptime();
	var totalmem2 = os.totalmem();
	var freemem2 = os.freemem();
	var cpus2 = os.cpus();
	var d = new Date();


 int_network2=os.networkInterfaces();
   json+=",{\"freemem2ory\":"+freemem2+",\"totalmem2ory\":"+totalmem2+",\"uptime2\":"+uptime2+",\"cputimes\":{";
 
   for(var i=0;i<cpus2.length;i++){
if(i===cpus2.length-1){   
json+="\"user\":"+cpus2[i]["times"]["user"]+",\"nice\":"+cpus2[i]["times"]["nice"]+",\"sys\":"+cpus2[i]["times"]["sys"]+",\"idle\":"+cpus2[i]["times"]["idle"]+",\"irq\":"+cpus2[i]["times"]["irq"]+"}}";
}else{   
json+="\"user\":"+cpus2[i]["times"]["user"]+",\"nice\":"+cpus2[i]["times"]["nice"]+",\"sys\":"+cpus2[i]["times"]["sys"]+",\"idle\":"+cpus2[i]["times"]["idle"]+",\"irq\":"+cpus2[i]["times"]["irq"]+",";
}

}
	antjson=antjson.replace("]}",json+"]}");

//XML

	var cpus2tring = "<cputimes>";
	
	for(var i=0; i<cpus2.length;i++){
	
	cpus2tring += "<user>"+cpus2[i]["times"]["user"]+"</user><nice>"+cpus2[i]["times"]["nice"]+"</nice><sys>"+cpus2[i]["times"]["sys"]+"</sys><idle>"+cpus2[i]["times"]["idle"]+"</idle><irq>"+cpus2[i]["times"]["irq"]+"</irq>";   
  
}
	cpus2tring += "</cputimes>";	

	var stringNew = string.replace("</medidas>","<medida><time>"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+"</time><uptime>"+uptime2+"</uptime><totalmem>"+totalmem2+"</totalmem><freemem>"+freemem2+"</freemem>"+cpus2tring+"</medida></medidas>");
	
	string=stringNew;
	fs.writeFileSync('medidas.xml',stringNew);
        fs.writeFileSync('informacion.json',antjson);
};

var mi_funcion= function(request, response){
  var fs = require('fs');
  
  console.log("hemos recibido algo");
  
  var data1 = fs.readFileSync('informacion.json', 'UTF-8');
  response.set('Content-Type', 'application/json');
  response.send(data1); 
 

  //response.attachment('informacion.json');
 

 
 
};

var mi_funcion2 = function(request, response) {
  

  console.log("hemos recibido algo");

  //Si quito 2º parámetro (encoding) al entrar en la web me deja descargar el xml perfect y si pongo  utf-8 no sale el texto como xml. Había que usar response.set()!!!!

  var data = fs.readFileSync('medidas.xml','UTF-8');
  response.set('Content-Type', 'text/xml');
  response.send(data); 
  

  //response.attachment('medidas.xml');
  
};

app.get('/xml', mi_funcion2);
app.get('/json', mi_funcion);


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

