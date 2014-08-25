//npm install connect serve-static
//with node installed just node server.js
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080);
console.log('webserver running at http://localhost:8080');
