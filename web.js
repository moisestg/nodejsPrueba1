#!/usr/bin/env node

//Recupero las librerías a utilizar y me genero las variables que necesitaré

var express = require('express');
var app = express();
var fs = require('fs');
var os = require('os');

//Recupero la fecha y le doy el formato adecuado

var d = new Date();
var h = d.getHours();
var m = d.getMinutes();
var s = d.getSeconds();

if(h<10){
  h= "0"+h;
}

if(m<10){
  m="0"+m;
}

if(s<10){
  s="0"+s;
}

var uptime = os.uptime();
var totalmem = os.totalmem();
var freemem = os.freemem();
var cpus = os.cpus();
var cpuString = "<cputimes>";

//La generación de datos en JSON requiere que la primera medida se haga fuera de la función que se ejecuta repetidamente con setInterval. Como queremos que los datos en XML y en JSON sean exactamente los mismos, aunque originalmente no era necesario, la primera medida del XML también a hacemos aparte


//Primera medida XML

var cpuString2 = "<cputimes>";

for(var i=0; i<cpus.length;i++){

cpuString2 += "<user>"+cpus[i]["times"]["user"]+"</user><nice>"+cpus[i]["times"]["nice"]+"</nice><sys>"+cpus[i]["times"]["sys"]+"</sys><idle>"+cpus[i]["times"]["idle"]+"</idle><irq>"+cpus[i]["times"]["irq"]+"</irq>";
  
}

cpuString2 += "</cputimes>";

var string = "<?xml version=\"1.0\" standalone=\"yes\"?><medidas><medida><time>"+h+":"+m+":"+s+"</time><uptime>"+uptime+"</uptime><totalmem>"+totalmem+"</totalmem><freemem>"+freemem+"</freemem>"+cpuString2+"</medida></medidas>";

//Primera medida JSON

var antjson="{\"medidas\":[{\"time\":\""+h+":"+m+":"+s+"\",\"freememory\":"+freemem+",\"totalmemory\":"+totalmem+",\"uptime\":"+uptime+",\"cputimes\":{";

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

//Definimos una función que se encargará de ir generando nuevas medidas cada cierto periodo de tiempo y añadirlas correctamente al archivo XML o JSON respectivamente

var int=setInterval(function(){json_xml_var()},3000);
function json_xml_var(){
var uptime2 = os.uptime();
var totalmem2 = os.totalmem();
var freemem2 = os.freemem();
var cpus2 = os.cpus();
var d = new Date();
var h = d.getHours();
var m = d.getMinutes();
var s = d.getSeconds();

if(h<10){
h= "0"+h;
}

if(m<10){
m="0"+m;
}

if(s<10){
s="0"+s;
}
//JSON

 int_network2=os.networkInterfaces();
   json+=",{\"time\":\""+h+":"+m+":"+s+"\",\"freememory\":"+freemem2+",\"totalmemory\":"+totalmem2+",\"uptime\":"+uptime2+",\"cputimes\":{";
 
for(var i=0;i<cpus2.length;i++){
if(i===cpus2.length-1){
json+="\"user\":"+cpus2[i]["times"]["user"]+",\"nice\":"+cpus2[i]["times"]["nice"]+",\"sys\":"+cpus2[i]["times"]["sys"]+",\"idle\":"+cpus2[i]["times"]["idle"]+",\"irq\":"+cpus2[i]["times"]["irq"]+"}}";
}else{
json+="\"user\":"+cpus2[i]["times"]["user"]+",\"nice\":"+cpus2[i]["times"]["nice"]+",\"sys\":"+cpus2[i]["times"]["sys"]+",\"idle\":"+cpus2[i]["times"]["idle"]+",\"irq\":"+cpus2[i]["times"]["irq"]+",";
}
}

var newjson=antjson.replace("]}",json+"]}");

//XML

var cpus2tring = "<cputimes>";

for(var i=0; i<cpus2.length;i++){

cpus2tring += "<user>"+cpus2[i]["times"]["user"]+"</user><nice>"+cpus2[i]["times"]["nice"]+"</nice><sys>"+cpus2[i]["times"]["sys"]+"</sys><idle>"+cpus2[i]["times"]["idle"]+"</idle><irq>"+cpus2[i]["times"]["irq"]+"</irq>";
  
}
cpus2tring += "</cputimes>";	

var stringNew = string.replace("</medidas>","<medida><time>"+h+":"+m+":"+s+"</time><uptime>"+uptime2+"</uptime><totalmem>"+totalmem2+"</totalmem><freemem>"+freemem2+"</freemem>"+cpus2tring+"</medida></medidas>");

string=stringNew;

//Escribimos los datos en un fichero

fs.writeFileSync('medidas.xml',stringNew);
fs.writeFileSync('informacion.json',newjson);
};

//A continuación, tenemos mi_funcion (para enviar los datos en JSON) y mi_funcion2 (para enviar los datos en XML)

var mi_funcion= function(request, response){
  
  
  console.log("hemos recibido algo");
  
  var data1 = fs.readFileSync('informacion.json', 'UTF-8');

//Si pasamos parámetros en la URL los recuperamos y podemos filtrar los datos que recibe el usuario final

//Con el parámetro filtro, nos muestra de todas las medidas, un dato en concreto

if(request.query.filtro===undefined){
response.set('Content-Type', 'application/json');
   response.send(data1);
}else{
var jsonparsed = JSON.parse(data1);	
var arrayFiltrados = [];
var filtro = request.query.filtro;
for(var i=0;i<jsonparsed['medidas'].length;i++){
var stringObj = jsonparsed['medidas'][i][filtro];	
arrayFiltrados.push(stringObj);	
}
response.set('Content-Type', 'application/json');
   response.send(arrayFiltrados);
}

//Con los parámetros desde y hasta, seleccionamos unas medidas dentro de una ventana de tiempo determinada

if(request.query.desde===undefined || request.query.hasta===undefined){
response.set('Content-Type', 'application/json');
   response.send(data1);
}else{

  var jsonparsed = JSON.parse(data1);
  var arraySeleccionados = [];
  var desde = request.query.desde;
  var hasta = request.query.hasta;
for(var i=0; i<jsonparsed['medidas'].length;i++){
var tiempoString = jsonparsed['medidas'][i]['time'].substring(0,2)+jsonparsed['medidas'][i]['time'].substring(3,5)+jsonparsed['medidas'][i]['time'].substring(6,8);

if(tiempoString>desde && tiempoString<hasta){
arraySeleccionados.push(jsonparsed['medidas'][i]);
}
}	

//Intentamos detectar errores al hacer búsquedas incorrectas, aunque esto habría que depurarlo bastante más

  if(arraySeleccionados.length===0){
response.send("No se han encontrado coincidencias para tu búsqueda. // Formato de hora: 08:10:05 --> 081005");
}

  response.set('Content-Type', 'application/json');
  response.send(arraySeleccionados);
 

  //response.attachment('informacion.json');
 
}
 
 
};

//Con XML falta implementar el tratamiento de los datos (libxmljs) para poder filtrarlos al igual que JSON

var mi_funcion2 = function(request, response) {
  

  console.log("hemos recibido algo");

  
  var data = fs.readFileSync('medidas.xml','UTF-8');
  response.set('Content-Type', 'text/xml');
  response.send(data);
  

  //response.attachment('medidas.xml');
  
};

//En función del path nos pasa una u otra información

app.get('/xml', mi_funcion2);
app.get('/json', mi_funcion);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});


