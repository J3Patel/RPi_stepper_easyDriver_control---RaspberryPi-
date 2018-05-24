  var http = require('http').createServer(handler); //require http server, and create server with function handler()
  var fs = require('fs'); //require filesystem module
  var io = require('socket.io')(http) //require socket.io module and pass the http object (server)
  var pshell = require('python-shell');

  var motor = new pshell('s1.py', { mode: 'json '});

  var lightvalue = 0;

  http.listen(8080); //listen to port 8080

  function handler (req, res) { //create server
    fs.readFile(__dirname + '/public/index.html', function(err, data) { //read file index.html in public folder
      if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
          return res.end("404 Not Found");
        } 
      res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
      res.write(data); //write data from index.html
      return res.end();
    });
  }

  io.sockets.on('connection', function (socket) {// WebSocket Connection
     //static variable for current status
    socket.on('motor', function(data) { //get light switch status from client
              // lightvalue = data 
              console.log("motor")
              console.log(data);    
              if (data == "1") {
                motor.send("F");
              } else if (data == "0") {
                motor.send("stop");
              } else if (data == "2") {
                motor.send("B");
              }
            });

    socket.on('shutdown', function(data) { //get light switch status from client     
      motor.send("shutdown");
    });
    
  });

