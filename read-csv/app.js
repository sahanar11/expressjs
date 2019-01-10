var express = require('express');
var app = express();
var fs = require('fs'),
    path = require('path'),    
    filePath = path.join(__dirname, 'myapp.csv');

app.get('/', function (req, res) {
  fs.readFile('myapp.csv',  function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
});
  
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
