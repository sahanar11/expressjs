const fs = require('fs');
const createCsvParser = require('csv-parse');
const http = require('http');

const inputFile='myapp.csv';
const myData = []; 


const csvParserOptions = {delimiter: ','};

const extractLineData = function(line){
  const travelDetails = { "Period" : line[0]
                  , "Passenger_type" : line[1]
                  , "Direction" : line[2]
                  , "Country" : line[3]
                  , "Count" : line[4]
                  };
    console.log(JSON.stringify(travelDetails));
    myData.push("Period:",travelDetails.Period, "Passenger_type:",travelDetails.Passenger_type, "Direction:",travelDetails.Direction,"Country:", travelDetails.Country, "Count:",travelDetails.Count);
};

const csvParser = createCsvParser(csvParserOptions, function (err, data) {
  data.forEach(function(line) {
    extractLineData(line);
  });       
});
fs.createReadStream(inputFile).pipe(csvParser);

const server = http.createServer(function (req, resp) {
  resp.writeHead(200, { 'content-type': 'application/json' });
  resp.end(JSON.stringify(myData));
});
server.listen(8080);

// """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
// var csv = require('csv');
// var obj = csv();


// function MyCSV(Period, Passenger_type,Direction,Country,Count) {
//   this.Period = Period;
//   this.Passenger_type = Passenger_type;
//   this.Direction = Direction;
//   this.Country = Country;
//   this.Count = Count;
// }; 

// var MyData = []; 
// console.log("before giving path");
// // obj.from.path('/Users/nbm/Documents/express/read-csv/mydata.csv').to.array(function (data) {
// //       for (var index = 0; index < data.length; index++) {
// //           MyData.push(new MyCSV(data[index][0], data[index][1], data[index][2], data[index][3], data[index][4]));
// //       }
// //       console.log(MyData); 
    
// // });
     
      // var server = http.createServer(function (req, resp) {
      //     resp.writeHead(200, { 'content-type': 'application/json' });
      //     resp.end(JSON.stringify(MyData));
      // });

      // server.listen(8080);

// var fs = require('fs'),
//     path = require('path'),    
//     filePath = path.join(__dirname, 'myapp.csv');

// app.get('/', function (req, res) {
//   fs.readFile('myapp.csv',  function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     res.end();
// });
  
// });
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });
