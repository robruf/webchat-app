//Requirements
var express = require("express");
var socket = require("socket.io");

// App setup

var app = express();

var server = app.listen(process.env.PORT || 3000, function(){
    console.log("Server is now running");
});

// Looks for static pages in "public" folder
app.use(express.static("public"));

//Initialize socket on server
var io = socket(server);

//Listens for connections and creates a socket for each one
io.on("connection", function(socket) {
    console.log("New connection made from " + socket.id);

    //Emits message to all sockets when received
    socket.on("chatMessage", function(data) {
        io.sockets.emit("chatMessage", data);
    })

    socket.on("typing", function(data) {
        socket.broadcast.emit("typing", data);
    });
});

