// 1. Import libraries
console.log("1. Import libraries");

const http = require('http');
const fs = require('fs');
const createCsvParser = require('csv-parse');

// 2. defining some variables
console.log("2. defining some variables");

const inputFile='myapp.csv';
const myData = []; 

const csvParserOptions = {delimiter: ','};

// 3. defining the function
const extractLineData = function(line){
  console.log("extractLineData");

  const travelDetails = { "Period" : line[0]
                  , "Passenger_type" : line[1]
                  , "Direction" : line[2]
                  , "Country" : line[3]
                  , "Count" : line[4]
                  };
    console.log(JSON.stringify(travelDetails));
    myData.push("Period:",travelDetails.Period, "Passenger_type:",travelDetails.Passenger_type, "Direction:",travelDetails.Direction,"Country:", travelDetails.Country, "Count:",travelDetails.Count);
};

// 4. Creating csvParser - did u open the file for doing this? File has not been opened yet
console.log("4. Creating csvParser - did u open the file for doing this? File has not been opened yet");
const csvParser = createCsvParser(csvParserOptions, function (err, data) {
  data.forEach(function(line) {
    extractLineData(line);
  });
});

console.log("5. Create ReadStream for the input file and pipe it with csvParser");
const strm = fs.createReadStream(inputFile).pipe(csvParser);

console.log("// 6. Create HTTP Request handler");
const requestHandler = function (req, resp) {
  // When there is a HTTP Request - this will get executed
  console.log("When there is a HTTP Request - this will get executed");
  resp.writeHead(200, { 'content-type': 'application/json' });
  resp.end(JSON.stringify(myData));
  strm.destroy();
};

// 7. Create HTTP Server
console.log("7. Create HTTP Server");
const server = http.createServer(requestHandler);

// 8. Server to listen at specified port
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
